import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from './ui/Icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

import { AuthMode } from '../types';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { signInWithEmail, signUpWithEmail, signInWithPhone, verifyOtp, authModalMode } = useRestaurant();



    const [mode, setMode] = useState<AuthMode>(authModalMode);

    // Sync mode when it changes in context or when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setMode(authModalMode);
        }
    }, [isOpen, authModalMode]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Safety timeout to prevent infinite hanging
            const timeoutPromise = new Promise<{ error: any }>((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out check network")), 15000)
            );

            if (mode === 'LOGIN') {
                const { error } = await Promise.race([
                    signInWithEmail(email, password),
                    timeoutPromise
                ]);
                if (error) throw error;
                onClose();
            } else if (mode === 'SIGNUP') {
                const { error } = await Promise.race([
                    signUpWithEmail(email, password, { first: firstName, last: lastName }),
                    timeoutPromise
                ]);
                if (error) throw error;
                alert("Check your email for confirmation!");
                onClose();
            } else if (mode === 'PHONE') {
                if (!showOtpInput) {
                    const { error } = await Promise.race([
                        signInWithPhone(phone),
                        timeoutPromise
                    ]);
                    if (error) throw error;
                    setShowOtpInput(true);
                } else {
                    const { error } = await Promise.race([
                        verifyOtp(phone, otp),
                        timeoutPromise
                    ]);
                    if (error) throw error;
                    onClose();
                }
            }
        } catch (err: any) {
            console.error("Auth Error:", err);
            setError(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl shadow-black/50 relative">
                {/* Glassmorphism glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-stone-900/10 pointer-events-none"></div>

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-sm relative z-10">
                    <h2 className="text-xl font-display font-medium text-white drop-shadow-lg">
                        {mode === 'LOGIN' && 'Welcome Back'}
                        {mode === 'SIGNUP' && 'Create Account'}
                        {mode === 'PHONE' && 'Mobile Login'}
                    </h2>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition">
                        <Icons.X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 relative z-10">
                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => { setMode('LOGIN'); setError(null); }}
                            className={`flex-1 py-2 text-sm rounded-lg border transition ${mode === 'LOGIN' ? 'bg-white/20 text-white border-white/30 backdrop-blur-sm shadow-lg' : 'border-white/10 text-white/60 hover:text-white/80 hover:bg-white/5'}`}
                        >
                            Email Login
                        </button>
                        <button
                            onClick={() => { setMode('SIGNUP'); setError(null); }}
                            className={`flex-1 py-2 text-sm rounded-lg border transition ${mode === 'SIGNUP' ? 'bg-white/20 text-white border-white/30 backdrop-blur-sm shadow-lg' : 'border-white/10 text-white/60 hover:text-white/80 hover:bg-white/5'}`}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => { setMode('PHONE'); setError(null); }}
                            className={`flex-1 py-2 text-sm rounded-lg border transition ${mode === 'PHONE' ? 'bg-white/20 text-white border-white/30 backdrop-blur-sm shadow-lg' : 'border-white/10 text-white/60 hover:text-white/80 hover:bg-white/5'}`}
                        >
                            Phone
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {mode === 'SIGNUP' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs text-white/70 uppercase font-medium">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={firstName} onChange={e => setFirstName(e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-white/70 uppercase font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={lastName} onChange={e => setLastName(e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition"
                                    />
                                </div>
                            </div>
                        )}

                        {(mode === 'LOGIN' || mode === 'SIGNUP') && (
                            <>
                                <div className="space-y-1">
                                    <label className="text-xs text-white/70 uppercase font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-white/70 uppercase font-medium">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password} onChange={e => setPassword(e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition"
                                    />
                                </div>
                            </>
                        )}

                        {mode === 'PHONE' && (
                            <div className="space-y-1">
                                <label className="text-xs text-white/70 uppercase font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+1234567890" // E.164 format suggestion
                                    required
                                    disabled={showOtpInput}
                                    value={phone} onChange={e => setPhone(e.target.value)}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition disabled:opacity-50"
                                />
                            </div>
                        )}

                        {mode === 'PHONE' && showOtpInput && (
                            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2">
                                <label className="text-xs text-white/70 uppercase font-medium">Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    value={otp} onChange={e => setOtp(e.target.value)}
                                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition tracking-widest text-center"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-stone-900 font-bold py-3 rounded-lg hover:from-gold-400 hover:to-gold-500 transition shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <div className="w-4 h-4 border-2 border-stone-700 border-t-stone-900 rounded-full animate-spin" />}
                            {mode === 'LOGIN' && 'Sign In'}
                            {mode === 'SIGNUP' && 'Create Account'}
                            {mode === 'PHONE' && (!showOtpInput ? 'Send Code' : 'Verify & Login')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
