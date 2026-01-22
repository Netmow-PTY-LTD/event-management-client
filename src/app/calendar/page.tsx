'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    parseISO,
    isValid
} from 'date-fns';

interface Event {
    id: string;
    name: string;
    date: string | null;
    type: string;
    status: string;
}

export default function CalendarPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Defaults to now (2026 in this env)
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'month' | 'week' | 'day'>('month');

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?callbackUrl=/calendar');
        } else if (status === 'authenticated') {
            fetch('/api/events')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setEvents(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [status, router]);

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const goToToday = () => setCurrentMonth(new Date());

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const getEventsForDay = (date: Date) => {
        return events.filter(e => {
            if (!e.date) return false;
            // Handle potentially invalid dates safely
            const evtDate = new Date(e.date);
            return isValid(evtDate) && isSameDay(evtDate, date);
        });
    };

    const getEventColor = (type: string) => {
        const t = (type || 'OTHER').toUpperCase();
        if (t.includes('WEDDING')) return 'bg-purple-100 text-purple-700 border-purple-200';
        if (t.includes('CORPORATE')) return 'bg-blue-100 text-blue-700 border-blue-200';
        if (t.includes('BIRTHDAY')) return 'bg-pink-100 text-pink-700 border-pink-200';
        return 'bg-gray-100 text-gray-700 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <div className="flex-grow flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
                        <p className="text-gray-500 mt-1">Manage your schedule and bookings</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                            <button
                                onClick={() => setView('month')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'month' ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setView('week')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'week' ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setView('day')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'day' ? 'bg-purple-50 text-purple-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Day
                            </button>
                        </div>

                        <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 px-2">
                            <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="px-4 font-bold text-gray-800 min-w-[160px] text-center select-none">
                                {format(currentMonth, 'MMMM yyyy')}
                            </span>
                            <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <Link
                            href="/dream-canvas"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">New Event</span>
                        </Link>
                    </div>
                </div>

                {/* Calendar Grid - Month View */}
                {view === 'month' && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex-grow flex flex-col">
                        {/* Days Header */}
                        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                            {days.map(day => (
                                <div key={day} className="py-4 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 flex-grow auto-rows-fr h-[800px] lg:h-auto">
                            {calendarDays.map((date, i) => {
                                const dayEvents = getEventsForDay(date);
                                const isCurrentMonth = isSameMonth(date, currentMonth);
                                const isTodayDate = isSameDay(date, new Date());

                                return (
                                    <div
                                        key={i}
                                        className={`min-h-[140px] p-2 border-b border-r border-gray-100 transition hover:bg-gray-50 relative group ${!isCurrentMonth ? 'bg-gray-50/50' : 'bg-white'
                                            }`}
                                    >
                                        {/* Date Number */}
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`
                                                flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold
                                                ${isTodayDate
                                                    ? 'bg-purple-600 text-white shadow-md'
                                                    : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                                                }
                                            `}>
                                                {format(date, 'd')}
                                            </span>
                                        </div>

                                        {/* Events List */}
                                        <div className="space-y-1.5 overflow-hidden max-h-[100px]">
                                            {dayEvents.map(event => (
                                                <Link
                                                    href={`/dream-canvas?id=${event.id}`}
                                                    key={event.id}
                                                    className={`w-full text-left px-2 py-1.5 rounded-md border text-xs font-semibold truncate transition hover:shadow-md flex items-center gap-1.5 ${getEventColor(event.type)}`}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full ${(event.type || '').includes('WEDDING') ? 'bg-purple-500' :
                                                        (event.type || '').includes('CORPORATE') ? 'bg-blue-500' : 'bg-gray-500'
                                                        }`} />
                                                    <span className="truncate">{event.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {view !== 'month' && (
                    <div className="flex-grow flex items-center justify-center bg-white rounded-2xl shadow-xl border border-gray-200 p-20">
                        <div className="text-center">
                            <CalendarIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">Coming Soon</h3>
                            <p className="text-gray-500">Week and Day views are under development.</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
