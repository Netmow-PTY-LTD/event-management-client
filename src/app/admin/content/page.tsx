'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Filter, FileText, HelpCircle, BookOpen, AlertCircle, Edit, Trash, X, Save, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminContentManagementPage() {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/admin/content');
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch content');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const formData = new FormData(e.currentTarget);

        try {
            const res = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.get('title'),
                    content: formData.get('content'),
                    category: formData.get('category'),
                    status: formData.get('status'),
                }),
            });

            if (res.ok) {
                setIsCreateModalOpen(false);
                fetchContent();
            }
        } catch (error) {
            console.error('Failed to create content');
        } finally {
            setIsSaving(false);
        }
    };

    const stats = [
        { label: 'Blog Articles', count: items.filter(i => i.category === 'BLOG').length, icon: BookOpen, color: 'text-blue-600' },
        { label: 'Help Topics', count: items.filter(i => i.category === 'HELP').length, icon: HelpCircle, color: 'text-purple-600' },
        { label: 'Platform FAQs', count: items.filter(i => i.category === 'FAQ').length, icon: HelpCircle, color: 'text-green-600' },
        { label: 'Legal Docs', count: items.filter(i => i.category === 'LEGAL').length, icon: AlertCircle, color: 'text-red-600' },
    ];

    return (
        <div className="space-y-6">
            {/* Create Content Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCreateModalOpen(false)}></div>
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <div className="p-2 bg-purple-600 text-white rounded-xl shadow-lg">
                                    <Plus className="w-5 h-5" />
                                </div>
                                Create New Content
                            </h2>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 transition">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Article Title</label>
                                    <input name="title" required type="text" placeholder="e.g. 10 Tips for the Perfect Wedding" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white outline-none font-bold text-gray-700 transition" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                                        <select name="category" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white outline-none font-bold text-gray-700 transition appearance-none">
                                            <option value="BLOG">Blog Post</option>
                                            <option value="FAQ">FAQ</option>
                                            <option value="HELP">Help Center</option>
                                            <option value="LEGAL">Legal Document</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Publish Status</label>
                                        <select name="status" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white outline-none font-bold text-gray-700 transition appearance-none">
                                            <option value="DRAFT">Save as Draft</option>
                                            <option value="PUBLISHED">Publish Now</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Content Body (Markdown Supported)</label>
                                    <textarea name="content" required placeholder="Write your content here..." className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white outline-none font-bold text-gray-700 transition h-48 resize-none"></textarea>
                                </div>
                            </div>
                            <button type="submit" disabled={isSaving} className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 shadow-xl shadow-purple-200 transition transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2">
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Create & Sync Article</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Content Management</h1>
                    <p className="text-gray-500 mt-1">Manage the platform knowledge base and editorial engine.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition transform active:scale-95 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> New Content
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((cat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-purple-50 flex items-center justify-between hover:shadow-md transition group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition ${cat.color}`}>
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 text-sm">{cat.label}</h4>
                                <p className="text-xs text-gray-400 font-bold">{cat.count} Dynamic Items</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-grow max-w-sm">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search knowledge base..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-200 font-bold text-sm" />
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {isLoading ? (
                        <div className="p-12 text-center text-gray-400 animate-pulse">Loading platform content...</div>
                    ) : items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 text-lg leading-tight">{item.title}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-xs font-bold uppercase tracking-wider text-gray-400 underline-offset-4 decoration-purple-200">
                                            <span>Author: {item.author || 'System'}</span>
                                            <span>•</span>
                                            <span className="text-purple-600">{item.category}</span>
                                            <span>•</span>
                                            <span className={`flex items-center gap-2 ${item.status === 'PUBLISHED' ? 'text-green-600' : 'text-orange-500'}`}>
                                                <div className={`w-2 h-2 rounded-full ${item.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right mr-6">
                                        <p className="text-[10px] font-black text-gray-300 uppercase letter tracking-tighter">Last Modified</p>
                                        <p className="text-xs font-bold text-gray-600">{format(new Date(item.updatedAt), 'MMM dd, yyyy')}</p>
                                    </div>
                                    <button className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition">
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-400 font-bold">No content articles found in the database.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
