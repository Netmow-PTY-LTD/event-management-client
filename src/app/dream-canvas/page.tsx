'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, ArrowRight, ArrowLeft, Check, Loader2, Save } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useSession } from 'next-auth/react'

type EventType = 'WEDDING' | 'CORPORATE' | 'BIRTHDAY' | 'BABY_SHOWER' | 'REUNION' | 'PARTY'
type EventStyle = 'CLASSIC_ELEGANCE' | 'MODERN_CHIC' | 'RUSTIC_CHARM'
type VenuePreference = 'INDOOR' | 'OUTDOOR' | 'BOTH'

interface EventData {
    type: EventType | null
    name: string
    date: string
    guestCount: number
    location: string
    venuePreference: VenuePreference
    style: EventStyle | null
    services: string[]
    budgetMin: number
    budgetMax: number
}

export default function DreamCanvasPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const [step, setStep] = useState(1)
    const [eventId, setEventId] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [eventData, setEventData] = useState<EventData>({
        type: null,
        name: '',
        date: '',
        guestCount: 100,
        location: '',
        venuePreference: 'BOTH',
        style: null,
        services: [],
        budgetMin: 5000,
        budgetMax: 20000,
    })

    const totalSteps = 5

    const eventTypes = [
        { value: 'WEDDING', label: 'Wedding', emoji: '💒', color: 'from-purple-500 to-pink-500' },
        { value: 'CORPORATE', label: 'Corporate', emoji: '🏢', color: 'from-blue-500 to-purple-500' },
        { value: 'BIRTHDAY', label: 'Birthday', emoji: '🎂', color: 'from-pink-500 to-red-500' },
        { value: 'BABY_SHOWER', label: 'Baby Shower', emoji: '👶', color: 'from-blue-400 to-pink-400' },
        { value: 'REUNION', label: 'Reunion', emoji: '👨‍👩‍👧‍👦', color: 'from-green-500 to-blue-500' },
        { value: 'PARTY', label: 'Party', emoji: '🎉', color: 'from-yellow-500 to-pink-500' },
    ]

    const styles = [
        { value: 'CLASSIC_ELEGANCE', label: 'Classic Elegance', color: 'from-amber-600 to-yellow-500' },
        { value: 'MODERN_CHIC', label: 'Modern Chic', color: 'from-gray-700 to-gray-500' },
        { value: 'RUSTIC_CHARM', label: 'Rustic Charm', color: 'from-amber-700 to-orange-600' },
    ]

    const services = [
        { value: 'venue', label: 'Venue', emoji: '🏛️' },
        { value: 'photographer', label: 'Photographer', emoji: '📸' },
        { value: 'catering', label: 'Catering', emoji: '🍽️' },
        { value: 'flowers', label: 'Flowers', emoji: '💐' },
        { value: 'music', label: 'Music', emoji: '🎵' },
        { value: 'cake', label: 'Cake', emoji: '🎂' },
    ]

    const saveProgress = async () => {
        if (!session) return; // Skip saving if not logged in (or handle guest saving later)

        setSaving(true);
        try {
            const url = eventId ? `/api/events/${eventId}` : '/api/events';
            const method = eventId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.id && !eventId) {
                    setEventId(data.id);
                }
            }
        } catch (error) {
            console.error("Failed to save progress", error);
        } finally {
            setSaving(false);
        }
    }

    const isStepValid = () => {
        setError(null);
        switch (step) {
            case 1:
                if (!eventData.type) {
                    setError("Please select an event type to continue.");
                    return false;
                }
                return true;
            case 2:
                if (!eventData.name.trim()) {
                    setError("Please enter a name for your event.");
                    return false;
                }
                if (!eventData.date) {
                    setError("Please select a date for your event.");
                    return false;
                }
                if (!eventData.location.trim()) {
                    setError("Please specify a location.");
                    return false;
                }
                return true;
            case 3:
                if (!eventData.style) {
                    setError("Please select a style that reflects your vision.");
                    return false;
                }
                return true;
            case 4:
                if (eventData.services.length === 0) {
                    setError("Please select at least one service you'll need.");
                    return false;
                }
                return true;
            default:
                return true;
        }
    }

    const handleNext = async () => {
        if (!isStepValid()) return;

        await saveProgress();
        if (step < totalSteps) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        setError(null);
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = async () => {
        if (!isStepValid()) return;
        await saveProgress();
        router.push('/dashboard')
    }

    const toggleService = (service: string) => {
        setEventData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
            {/* Header */}
            <Header />

            {/* Progress Section */}
            <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-16 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-purple-600" fill="currentColor" />
                            <span>Dream Canvas</span>
                            {saving && <span className="text-xs text-purple-500 animate-pulse ml-2 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Saving...</span>}
                        </h1>
                        <div className="text-sm text-gray-600 font-medium">
                            Step {step} of {totalSteps}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 animate-shake">
                        <div className="p-1 bg-red-100 rounded-full">
                            <Check className="w-4 h-4 rotate-45" />
                        </div>
                        <p className="font-bold text-sm">{error}</p>
                    </div>
                )}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Step 1: Event Type */}
                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    What are you celebrating?
                                </h2>
                                <p className="text-gray-600">Choose the type of event you're planning</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {eventTypes.map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => setEventData({ ...eventData, type: type.value as EventType })}
                                        className={`p-8 rounded-2xl border-2 transition transform hover:scale-105 ${eventData.type === type.value
                                            ? 'border-purple-500 bg-gradient-to-br ' + type.color + ' text-white shadow-lg'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <div className="text-5xl mb-3">{type.emoji}</div>
                                        <div className="font-bold text-lg">{type.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Event Details */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Tell us about your event
                                </h2>
                                <p className="text-gray-600">Provide some basic details</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                                    <input
                                        type="text"
                                        value={eventData.name}
                                        onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                                        placeholder="e.g., Sarah & John's Wedding"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                                    <input
                                        type="date"
                                        value={eventData.date}
                                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Guests: {eventData.guestCount}
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="500"
                                        step="10"
                                        value={eventData.guestCount}
                                        onChange={(e) => setEventData({ ...eventData, guestCount: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location / City</label>
                                    <input
                                        type="text"
                                        value={eventData.location}
                                        onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                                        placeholder="e.g., New York, NY"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Venue Preference</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {(['INDOOR', 'OUTDOOR', 'BOTH'] as VenuePreference[]).map((pref) => (
                                            <button
                                                key={pref}
                                                onClick={() => setEventData({ ...eventData, venuePreference: pref })}
                                                className={`py-3 rounded-xl border-2 transition ${eventData.venuePreference === pref
                                                    ? 'border-purple-500 bg-purple-50 text-purple-700 font-bold'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                {pref.charAt(0) + pref.slice(1).toLowerCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Style Selection */}
                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Design your perfect event
                                </h2>
                                <p className="text-gray-600">Choose a style that reflects your vision</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {styles.map((style) => (
                                    <button
                                        key={style.value}
                                        onClick={() => setEventData({ ...eventData, style: style.value as EventStyle })}
                                        className={`p-8 rounded-2xl border-2 transition transform hover:scale-105 ${eventData.style === style.value
                                            ? 'border-purple-500 bg-gradient-to-br ' + style.color + ' text-white shadow-lg'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <div className="h-32 bg-white/20 rounded-xl mb-4"></div>
                                        <div className="font-bold text-lg">{style.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Services */}
                    {step === 4 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    What do you need?
                                </h2>
                                <p className="text-gray-600">Select the services you'll need for your event</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {services.map((service) => (
                                    <button
                                        key={service.value}
                                        onClick={() => toggleService(service.value)}
                                        className={`p-6 rounded-2xl border-2 transition transform hover:scale-105 ${eventData.services.includes(service.value)
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <div className="text-4xl mb-2">{service.emoji}</div>
                                        <div className="font-bold">{service.label}</div>
                                        {eventData.services.includes(service.value) && (
                                            <Check className="w-6 h-6 text-purple-600 mx-auto mt-2" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Budget Range: ${eventData.budgetMin.toLocaleString()} - ${eventData.budgetMax.toLocaleString()}
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="1000"
                                        max="100000"
                                        step="1000"
                                        value={eventData.budgetMax}
                                        onChange={(e) => setEventData({ ...eventData, budgetMax: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Summary */}
                    {step === 5 && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Your Dream Event
                                </h2>
                                <p className="text-gray-600">Review your event details</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-600">Event Type</div>
                                        <div className="font-bold text-lg">{eventData.type}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Date</div>
                                        <div className="font-bold text-lg">{eventData.date || 'TBD'}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Guests</div>
                                        <div className="font-bold text-lg">{eventData.guestCount}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">Location</div>
                                        <div className="font-bold text-lg">{eventData.location || 'TBD'}</div>
                                    </div>
                                </div>

                                <div className="border-t border-purple-200 pt-4">
                                    <div className="text-sm text-gray-600 mb-2">Budget Range</div>
                                    <div className="text-2xl font-bold text-purple-600">
                                        ${eventData.budgetMin.toLocaleString()} - ${eventData.budgetMax.toLocaleString()}
                                    </div>
                                </div>

                                <div className="border-t border-purple-200 pt-4">
                                    <div className="text-sm text-gray-600 mb-2">Services Needed</div>
                                    <div className="flex flex-wrap gap-2">
                                        {eventData.services.map((service) => (
                                            <span key={service} className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="animate-spin" /> : 'Get Vendor Suggestions'}
                            </button>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={handleBack}
                            disabled={step === 1 || saving}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition ${step === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>

                        {step < totalSteps && (
                            <button
                                onClick={handleNext}
                                disabled={saving}
                                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span>{saving ? 'Saving...' : 'Next'}</span>
                                {!saving && <ArrowRight className="w-5 h-5" />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
