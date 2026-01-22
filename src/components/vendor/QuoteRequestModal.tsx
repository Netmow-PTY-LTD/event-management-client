'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
    X,
    Calendar,
    DollarSign,
    MessageSquare,
    CheckCircle2,
    Loader2,
    ArrowRight,
    Search
} from 'lucide-react';

interface Event {
    id: string;
    name: string;
    type: string;
    date: string | null;
}

interface QuoteRequestModalProps {
    vendorId: string;
    vendorName: string;
    vendorCategory: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteRequestModal({
    vendorId,
    vendorName,
    vendorCategory,
    isOpen,
    onClose
}: QuoteRequestModalProps) {
    const { data: session } = useSession();
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [budgetMin, setBudgetMin] = useState('1000');
    const [budgetMax, setBudgetMax] = useState('5000');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && session) {
            fetch('/api/events')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setEvents(data);
                        if (data.length > 0) setSelectedEventId(data[0].id);
                    }
                });
        }
    }, [isOpen, session]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/rfps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId: selectedEventId,
                    leadType: vendorCategory,
                    budgetMin,
                    budgetMax,
                    additionalNotes: notes,
                })
            });

            if (!res.ok) throw new Error('Failed to submit quote request');

            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 2500);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden border border-white/20">
                {isSuccess ? (
                    <div className="p-16 text-center space-y-6 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Request Sent!</h2>
                        <p className="text-gray-500 text-lg max-w-sm mx-auto">
                            Your proposal for <span className="text-purple-600 font-bold">{vendorName}</span> has been submitted successfully.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 p-10 text-white relative">
                            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
                                <X className="w-6 h-6" />
                            </button>
                            <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2 block">Premium RFP System</span>
                            <h2 className="text-4xl font-black tracking-tighter mb-2">Request Custom Quote</h2>
                            <p className="text-purple-100 font-medium">Get exclusive pricing from <span className="font-black text-white">{vendorName}</span></p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8 bg-gray-50/50">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                                    {error}
                                </div>
                            )}

                            {/* Select Event */}
                            <div className="space-y-3">
                                <label className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-purple-600" /> Which Event is this for?
                                </label>
                                {events.length > 0 ? (
                                    <div className="relative group">
                                        <select
                                            value={selectedEventId}
                                            onChange={(e) => setSelectedEventId(e.target.value)}
                                            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 appearance-none font-bold text-gray-700 transition cursor-pointer"
                                        >
                                            {events.map(event => (
                                                <option key={event.id} value={event.id}>
                                                    {event.name} ({event.type})
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-purple-600 transition">
                                            <ArrowRight className="w-5 h-5 rotate-90" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6 bg-white border-2 border-dashed border-gray-200 rounded-2xl text-center">
                                        <p className="text-gray-500 text-sm font-bold mb-4">No events found in your planner</p>
                                        <button
                                            type="button"
                                            onClick={() => window.location.href = '/dream-canvas'}
                                            className="px-6 py-2 bg-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-100"
                                        >
                                            Launch Dream Canvas
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Budget Range */}
                            <div className="space-y-3">
                                <label className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-pink-600" /> What is your budget for this service?
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={budgetMin}
                                            onChange={(e) => setBudgetMin(e.target.value)}
                                            className="w-full pl-10 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-100 font-bold text-gray-700 transition"
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={budgetMax}
                                            onChange={(e) => setBudgetMax(e.target.value)}
                                            className="w-full pl-10 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-100 font-bold text-gray-700 transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-3">
                                <label className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-blue-600" /> Additional Requirements
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell the vendor about your vision, specific dates, or special requests..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 font-medium text-gray-700 transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || events.length === 0}
                                className="w-full py-5 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-purple-200 hover:shadow-purple-300 transition transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Processing Proposal...
                                    </>
                                ) : (
                                    <>
                                        Submit Request <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
