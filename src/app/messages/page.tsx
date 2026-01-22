'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Search, Paperclip, Send, ArrowLeft, MoreVertical, Phone, Video, Image as ImageIcon, Smile, Loader2 } from 'lucide-react';

interface Message {
    id: number;
    sender: 'me' | 'them';
    text: string;
    time: string;
}

interface Chat {
    id: number;
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    lastMessage: string;
    lastTime: string;
    unread: number;
    messages: Message[];
}

export default function MessagesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeChat, setActiveChat] = useState<number>(1);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auth Protection
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/messages');
        }
    }, [status, router]);

    // Mock Chats
    const [chats, setChats] = useState<Chat[]>([
        {
            id: 1,
            name: 'Sarah & Mike',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
            status: 'online',
            lastMessage: 'Yes, absolutely! We just got the shipment...',
            lastTime: '10:30 AM',
            unread: 2,
            messages: [
                { id: 1, sender: 'them', text: 'Hi! Are we still on track for the floral arrangements?', time: '10:15 AM' },
                { id: 2, sender: 'me', text: 'Yes, absolutely! We just got the shipment of orchids in today. They look beautiful!', time: '10:20 AM' },
                { id: 3, sender: 'them', text: 'That is wonderful news! Can you send a photo?', time: '10:22 AM' },
            ]
        },
        {
            id: 2,
            name: 'Tech Corp Events',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
            status: 'offline',
            lastMessage: 'Let us know about the menu options.',
            lastTime: 'Yesterday',
            unread: 0,
            messages: [
                { id: 1, sender: 'me', text: 'Here represent the new menu options for the gala.', time: 'Yesterday' }
            ]
        },
        {
            id: 3,
            name: 'Emily Rose',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            status: 'online',
            lastMessage: 'Thank you so much!',
            lastTime: 'Mon',
            unread: 0,
            messages: []
        }
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeChat, chats]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            sender: 'me',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedChats = chats.map(chat => {
            if (chat.id === activeChat) {
                return {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastMessage: inputText,
                    lastTime: 'Just now'
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setInputText('');
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const currentChat = chats.find(c => c.id === activeChat);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:h-[calc(100vh-80px)] overflow-hidden flex flex-col">
                <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                    <Link href="/dashboard" className="p-2 hover:bg-gray-200 rounded-full transition md:hidden">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-grow h-full max-h-[800px]">
                    {/* Sidebar List */}
                    <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-gray-50/50">
                        <div className="p-4 border-b border-gray-200 bg-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-purple-500 transition"
                                />
                                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setActiveChat(chat.id)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer transition hover:bg-purple-50 ${activeChat === chat.id ? 'bg-purple-50 border-l-4 border-l-purple-600' : 'bg-white border-l-4 border-l-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                                            {chat.status === 'online' && (
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                            )}
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className={`text-sm font-bold truncate ${activeChat === chat.id ? 'text-purple-900' : 'text-gray-900'}`}>
                                                    {chat.name}
                                                </h3>
                                                <span className="text-xs text-gray-500">{chat.lastTime}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className={`text-sm truncate ${chat.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                                                    {chat.lastMessage}
                                                </p>
                                                {chat.unread > 0 && (
                                                    <span className="ml-2 w-5 h-5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                        {chat.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="hidden md:flex flex-col flex-1 bg-white relative">
                        {/* Chat Header */}
                        {currentChat && (
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm z-10">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src={currentChat.avatar} alt={currentChat.name} className="w-10 h-10 rounded-full object-cover" />
                                        {currentChat.status === 'online' && (
                                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{currentChat.name}</h3>
                                        <p className="text-xs text-green-600 font-medium">
                                            {currentChat.status === 'online' ? 'Active Now' : 'Offline'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-purple-600">
                                    <button className="p-2 hover:bg-purple-50 rounded-full transition"><Phone className="w-5 h-5" /></button>
                                    <button className="p-2 hover:bg-purple-50 rounded-full transition"><Video className="w-5 h-5" /></button>
                                    <button className="p-2 hover:bg-purple-50 rounded-full transition"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>
                        )}

                        {/* Messages */}
                        <div className="flex-grow p-6 overflow-y-auto bg-gray-50 space-y-6">
                            {currentChat?.messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-1' : 'order-2'}`}>
                                        <div className={`p-4 rounded-2xl shadow-sm text-sm ${msg.sender === 'me'
                                            ? 'bg-purple-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className={`text-xs mt-1 text-gray-400 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-gray-50 p-2 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-purple-100 transition shadow-sm">
                                <button type="button" className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-white transition">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button type="button" className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-white transition">
                                    <ImageIcon className="w-5 h-5" />
                                </button>

                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-grow px-3 py-2 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
                                />

                                <button type="button" className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-white transition">
                                    <Smile className="w-5 h-5" />
                                </button>

                                <button
                                    type="submit"
                                    disabled={!inputText.trim()}
                                    className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
