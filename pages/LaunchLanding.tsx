import React, { useState, useEffect } from 'react';
import { Icons } from '../components/ui/Icons';
import { useRestaurant } from '../context/RestaurantContext';

export const LaunchLanding: React.FC = () => {
  const { setViewMode, user, openAuthModal, handleLogout, isAdmin, profile } = useRestaurant();
  const [pendingLaunch, setPendingLaunch] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    // 1. New User Launch Flow (Priority)
    if (user && pendingLaunch) {
      setPendingLaunch(false);

      // Check if they are actually an existing admin (e.g. logged in via Launch flow)
      if (isAdmin) {
        setViewMode('APP');
      } else {
        setViewMode('ONBOARDING');
      }
      return;
    }

    // 2. Existing Admin Login Flow
    // If user logs in normally (not via Launch button) and is an Admin, go to Dashboard
    if (user && isAdmin && !pendingLaunch) {
      setViewMode('APP');
    }
  }, [user, pendingLaunch, setViewMode, isAdmin, profile]);

  // Safety Timeout for Loading
  useEffect(() => {
    if (user && !profile) {
      const timer = setTimeout(() => setShowReset(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowReset(false);
    }
  }, [user, profile]);

  // Loading State
  if (user && !profile) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
        {showReset && (
          <div className="animate-fade-in text-center">
            <p className="text-stone-500 mb-2">Taking longer than expected?</p>
            <button
              onClick={() => handleLogout()}
              className="text-sm font-bold text-red-500 hover:text-red-700 underline"
            >
              Force Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }


  const handleLaunchClick = () => {
    if (user) {
      setViewMode('ONBOARDING');
    } else {
      setPendingLaunch(true);
      openAuthModal('SIGNUP');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans overflow-hidden relative flex flex-col">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop"
          alt="Luxury Dining Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-200/20 via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gold-500 rounded-sm flex items-center justify-center rotate-45">
            <div className="-rotate-45 font-display font-bold text-xl text-stone-900">R</div>
          </div>
          <span className="font-display text-2xl font-bold tracking-widest uppercase">RestroFi</span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-stone-600 hidden md:block">Hello, {user.email?.split('@')[0]}</span>
              <button
                onClick={() => handleLogout()}
                className="px-4 py-2 border border-stone-200 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('LOGIN')}
              className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-12 md:pt-24 text-center flex-grow">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gold-200 shadow-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">The Future of Dining</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-stone-900 leading-[1.1] mb-8 animate-fade-in-up delay-100">
          Craft Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-700 to-gold-500 animate-shine bg-[length:200%_auto]">Golden Standard</span>
        </h1>

        <p className="font-serif text-lg md:text-2xl text-stone-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
          Transform your restaurant into a digital masterpiece. Seamless QR ordering, premium aesthetics, and live kitchen management—launched in seconds.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
          <button
            onClick={handleLaunchClick}
            className="group relative z-50 px-10 py-5 bg-stone-900 text-gold-50 rounded-full font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Launch Restaurant <Icons.Right className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button className="px-8 py-5 text-stone-900 font-bold uppercase tracking-widest hover:text-gold-600 transition-colors flex items-center gap-2">
            <Icons.PlayCircle className="w-5 h-5" /> Watch Demo
          </button>
        </div>

        {/* Pricing Card */}
        <div className="mt-12 animate-fade-in-up delay-400">
          <div className="inline-block relative group cursor-default">
            <div className="absolute inset-0 bg-gold-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-glass hover:shadow-premium hover:border-gold-200 transition-all duration-300">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-600 mb-1">Limited Time Launch Offer</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-3xl text-stone-900">₹1499</span>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wide">/ month onwards</span>
                </div>
                <div className="h-px w-12 bg-stone-200 my-2"></div>
                <p className="text-xs text-stone-600 font-medium flex items-center gap-2">
                  <Icons.Check className="w-3 h-3 text-green-500" /> 14 Days Free Trial
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span className="opacity-70">No payment needed now</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="mt-24 pt-12 pb-24 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in-up delay-500">
          {[
            { icon: Icons.Utensils, title: "Digital Menu", desc: "Beautiful, responsive food showcase." },
            { icon: Icons.Qr, title: "QR Ordering", desc: "Contactless table service." },
            { icon: Icons.BarChart, title: "Live Analytics", desc: "Real-time kitchen insights." }
          ].map((f, i) => (
            <div key={i} className="flex gap-4 items-start p-6 rounded-2xl hover:bg-white hover:shadow-premium transition-all duration-300 border border-transparent hover:border-gold-100">
              <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-stone-900">{f.title}</h3>
                <p className="text-sm text-stone-500 font-serif italic mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Premium Minimal Footer */}
      <footer className="relative z-10 bg-stone-950 text-stone-400 py-8 border-t-4 border-gold-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold-500/50 rounded-sm flex items-center justify-center rotate-45">
              <span className="font-display font-bold text-gold-500 -rotate-45">R</span>
            </div>
            <div>
              <p className="font-display font-bold text-white tracking-widest uppercase text-sm">RestroFi</p>
              <p className="text-[10px] text-stone-600 uppercase tracking-widest">© 2025 All Rights Reserved</p>
            </div>
          </div>

          <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500">
            <button onClick={() => setViewMode('PRIVACY')} className="hover:text-gold-400 transition-colors">Privacy</button>
            <button onClick={() => setViewMode('TERMS')} className="hover:text-gold-400 transition-colors">Terms</button>
            <button onClick={() => setViewMode('CONTACT')} className="hover:text-gold-400 transition-colors">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};