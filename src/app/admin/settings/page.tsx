'use client';

import { useState, useEffect } from 'react';
import { Save, Shield, Bell, Globe, Lock, Sliders, Database, CreditCard, Mail, Trash2, Loader2, Check } from 'lucide-react';

type SettingsTab = 'General' | 'Security' | 'Notifications' | 'Vendor Config' | 'Localization' | 'System';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('General');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showApiConfig, setShowApiConfig] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [settings, setSettings] = useState<any>({
        general: { platformName: 'DCT Events', supportEmail: 'support@dctevents.com' },
        commissions: { commissionRate: 12, processingFee: 2.50, withdrawalThreshold: 100 },
        security: { twoFactorAuth: true, sessionTimeout: 30 },
        vendorConfig: { stripeSecret: '', webhookSecret: '', requirements: ['Government ID', 'Biometric Selfie', 'Tax Document (EIN/SSN)'] }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (Object.keys(data).length > 0) {
                        setSettings((prev: any) => ({ ...prev, ...data }));
                    }
                }
            } catch (error) {
                console.error('Failed to fetch settings');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (key: string, value: any) => {
        setIsSaving(true);
        try {
            await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (error) {
            console.error('Save failed');
        } finally {
            setIsSaving(false);
        }
    };

    const tabs: { name: SettingsTab; icon: any }[] = [
        { name: 'General', icon: Sliders },
        { name: 'Security', icon: Lock },
        { name: 'Notifications', icon: Bell },
        { name: 'Vendor Config', icon: Shield },
        { name: 'Localization', icon: Globe },
        { name: 'System', icon: Database },
    ];

    if (isLoading) return <div className="flex items-center justify-center h-96 text-gray-400 font-bold">Syncing platform configurations...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 relative">
            {showSuccess && (
                <div className="fixed top-20 right-8 z-[60] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
                    <Check className="w-5 h-5" />
                    <span className="font-bold">Settings Synchronized!</span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Platform Settings</h1>
                    <p className="text-gray-500 mt-1 font-medium">Global configuration for the DCT Events ecosystem.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === item.name
                                ? 'bg-white shadow-xl shadow-purple-100/50 text-purple-600 translate-x-1'
                                : 'text-gray-400 hover:bg-white/50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-purple-600' : 'text-gray-400'}`} />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-purple-50/50 border border-purple-50 transition-all">

                        {activeTab === 'General' && (
                            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg"><Sliders className="w-5 h-5 text-purple-600" /></div>
                                        General Identity
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Platform Name</label>
                                            <input
                                                type="text"
                                                value={settings.general.platformName}
                                                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, platformName: e.target.value } })}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Support Email</label>
                                            <input
                                                type="email"
                                                value={settings.general.supportEmail}
                                                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, supportEmail: e.target.value } })}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={() => handleSave('general', settings.general)} disabled={isSaving} className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition disabled:opacity-50">
                                        {isSaving ? 'Updating...' : 'Save Identity'}
                                    </button>
                                </div>

                                <div className="pt-10 border-t border-gray-100">
                                    <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg"><CreditCard className="w-5 h-5 text-green-600" /></div>
                                        Global Commissions
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Commission (%)</label>
                                            <input
                                                type="number"
                                                value={settings.commissions.commissionRate}
                                                onChange={(e) => setSettings({ ...settings, commissions: { ...settings.commissions, commissionRate: e.target.value } })}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Processing Fee ($)</label>
                                            <input
                                                type="number"
                                                value={settings.commissions.processingFee}
                                                onChange={(e) => setSettings({ ...settings, commissions: { ...settings.commissions, processingFee: e.target.value } })}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Min. Withdrawal</label>
                                            <input
                                                type="number"
                                                value={settings.commissions.withdrawalThreshold}
                                                onChange={(e) => setSettings({ ...settings, commissions: { ...settings.commissions, withdrawalThreshold: e.target.value } })}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={() => handleSave('commissions', settings.commissions)} disabled={isSaving} className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition disabled:opacity-50">
                                        Update Financials
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Security' && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-red-100 rounded-lg"><Lock className="w-5 h-5 text-red-600" /></div>
                                        Access Controls
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                            <div>
                                                <p className="font-black text-gray-900 text-lg">Two-Factor Authentication (2FA)</p>
                                                <p className="text-sm font-medium text-gray-500">Enforce 2FA for all administrative accounts.</p>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    const newVal = !settings.security.twoFactorAuth;
                                                    setSettings({ ...settings, security: { ...settings.security, twoFactorAuth: newVal } });
                                                    handleSave('security', { ...settings.security, twoFactorAuth: newVal });
                                                }}
                                                className={`w-14 h-8 rounded-full relative cursor-pointer flex items-center px-1 transition-colors ${settings.security.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform ${settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <p className="font-black text-gray-900 text-lg">Session Timeout</p>
                                                    <p className="text-sm font-medium text-gray-500">Automatically logout inactive admins.</p>
                                                </div>
                                                <span className="text-sm font-black text-purple-600 px-4 py-2 bg-purple-50 rounded-xl">{settings.security.sessionTimeout} Minutes</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="5"
                                                max="120"
                                                step="5"
                                                value={settings.security.sessionTimeout}
                                                onChange={(e) => setSettings({ ...settings, security: { ...settings.security, sessionTimeout: parseInt(e.target.value) } })}
                                                onMouseUp={() => handleSave('security', settings.security)}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Vendor Config' && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-lg"><Shield className="w-5 h-5 text-orange-600" /></div>
                                        Verification Protocols
                                    </h2>

                                    {!showApiConfig ? (
                                        <div className="p-16 border-2 border-dashed border-gray-200 rounded-[3rem] text-center bg-gray-50/50">
                                            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 ring-8 ring-purple-50/50">
                                                <Shield className="w-12 h-12 text-purple-600" />
                                            </div>
                                            <p className="text-gray-900 font-black text-3xl mb-4 tracking-tight">Stripe Identity Integration</p>
                                            <p className="text-gray-500 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
                                                Scale your vendor verification process with real-time biometric and document checks powered by Stripe.
                                            </p>
                                            <button
                                                onClick={() => setShowApiConfig(true)}
                                                className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition shadow-2xl hover:-translate-y-1 active:translate-y-0"
                                            >
                                                Configure API Gateway
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-300">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Stripe Secret Key</label>
                                                    <div className="relative">
                                                        <input
                                                            type="password"
                                                            value={settings.vendorConfig.stripeSecret}
                                                            onChange={(e) => setSettings({ ...settings, vendorConfig: { ...settings.vendorConfig, stripeSecret: e.target.value } })}
                                                            placeholder="sk_live_..."
                                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Webhook Signing Secret</label>
                                                    <input
                                                        type="password"
                                                        value={settings.vendorConfig.webhookSecret}
                                                        onChange={(e) => setSettings({ ...settings, vendorConfig: { ...settings.vendorConfig, webhookSecret: e.target.value } })}
                                                        placeholder="whsec_..."
                                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition"
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-10 bg-gradient-to-br from-purple-50 to-blue-50 rounded-[2.5rem] border border-purple-100">
                                                <h3 className="font-black text-purple-900 mb-6 uppercase text-xs tracking-widest">Verification Pipeline</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {[
                                                        'Government ID',
                                                        'Biometric Selfie',
                                                        'Proof of Address',
                                                        'Tax Document (EIN/SSN)',
                                                    ].map((req) => (
                                                        <div key={req} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm">
                                                            <span className="font-bold text-gray-700">{req}</span>
                                                            <div
                                                                onClick={() => {
                                                                    const current = settings.vendorConfig.requirements || [];
                                                                    const updated = current.includes(req)
                                                                        ? current.filter((r: string) => r !== req)
                                                                        : [...current, req];
                                                                    setSettings({ ...settings, vendorConfig: { ...settings.vendorConfig, requirements: updated } });
                                                                }}
                                                                className={`w-10 h-5 rounded-full relative cursor-pointer flex items-center px-1 transition-colors ${settings.vendorConfig.requirements?.includes(req) ? 'bg-purple-600' : 'bg-gray-200'}`}
                                                            >
                                                                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${settings.vendorConfig.requirements?.includes(req) ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    onClick={() => setShowApiConfig(false)}
                                                    className="flex-1 py-5 bg-white border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 hover:border-gray-300 transition"
                                                >
                                                    Cancel Setup
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleSave('vendorConfig', settings.vendorConfig);
                                                        setShowApiConfig(false);
                                                    }}
                                                    className="flex-1 py-5 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition shadow-xl shadow-purple-100"
                                                >
                                                    Sync Gateway
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'Notifications' && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg"><Mail className="w-5 h-5 text-blue-600" /></div>
                                        Email Pipelines
                                    </h2>
                                    <div className="space-y-4">
                                        {['Customer Welcome Series', 'Vendor Booking Alerts', 'Payment Success Receipts', 'System Health Reports'].map((pipe) => (
                                            <div key={pipe} className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition cursor-pointer">
                                                <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm shadow-green-200"></div>
                                                <p className="font-black text-gray-700 flex-1">{pipe}</p>
                                                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">Active Pipeline</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Localization' && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="p-2 bg-teal-100 rounded-lg"><Globe className="w-5 h-5 text-teal-600" /></div>
                                        Regional Settings
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Base Currency</label>
                                            <select className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition appearance-none">
                                                <option>USD ($)</option>
                                                <option>EUR (€)</option>
                                                <option>GBP (£)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Time Zone</label>
                                            <select className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-purple-500 focus:bg-white focus:outline-none font-bold text-gray-700 transition appearance-none">
                                                <option>(GMT-05:00) Eastern Time</option>
                                                <option>(GMT-08:00) Pacific Time</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'System' && (
                            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
                                <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-red-100 rounded-3xl"><Trash2 className="w-8 h-8 text-red-600" /></div>
                                        <div>
                                            <p className="font-black text-red-900 text-xl tracking-tight">System Danger Zone</p>
                                            <p className="text-sm font-medium text-red-600/70">Purge cache, logs, and temporary assets to free up resources.</p>
                                        </div>
                                    </div>
                                    <button className="px-10 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition shadow-xl shadow-red-100 transform active:scale-95">Purge Cache</button>
                                </div>
                                <div className="flex items-center justify-between p-10 bg-gray-900 rounded-[3rem] shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/10"><Database className="w-10 h-10 text-white" /></div>
                                        <div>
                                            <p className="font-black text-white text-2xl tracking-tight">Immutable Backup</p>
                                            <p className="text-sm font-medium text-gray-400">Next scheduled snapshot: Tomorrow at 04:00 AM</p>
                                        </div>
                                    </div>
                                    <button className="px-10 py-4 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition relative z-10">Launch Backup</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
