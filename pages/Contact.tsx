import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from '../components/ui/Icons';

export const Contact: React.FC = () => {
    const { setViewMode } = useRestaurant();

    return (
        <div className="min-h-screen bg-stone-950 flex flex-col font-sans text-stone-200">
            {/* Header - Transparent & Premium */}
            <header className="py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-900/50">
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setViewMode('LANDING')}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/30 transition-all duration-300">
                        <span className="text-stone-950 font-bold text-xl font-display">R</span>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-widest font-display">RESTROFI</h1>
                </div>
                <button
                    onClick={() => setViewMode('LANDING')}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-gold-500/50 hover:bg-gold-500/10 transition-all duration-300"
                >
                    <div className="p-1 rounded-full bg-stone-800 group-hover:bg-gold-500 text-stone-400 group-hover:text-stone-950 transition-colors">
                        <Icons.Left className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Back</span>
                </button>
            </header>

            {/* Content */}
            <main className="flex-grow container mx-auto px-6 py-20 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-stone-800/30 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-2xl w-full text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-800 shadow-2xl shadow-gold-900/10 mb-8 group overflow-hidden">
                        <div className="absolute inset-0 bg-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Icons.Mail className="w-8 h-8 text-gold-400" />
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight leading-tight">
                        Let's shape the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300">future of dining.</span>
                    </h1>

                    <p className="text-stone-400 mb-16 text-lg max-w-lg mx-auto font-light leading-relaxed">
                        Whether you're ready to launch or just expanding your horizons, our team is ready to partner with you.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {/* Email Card */}
                        <div className="group relative p-8 rounded-3xl bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-gold-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-900/10 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/5 group-hover:via-gold-500/5 transition-opacity duration-500" />

                            <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-gold-500" /> Email Us
                            </h3>
                            <a href="mailto:contact@restrofi.in" className="text-white hover:text-gold-400 transition-colors block">
                                <span className="text-2xl font-display font-medium block mb-2 break-all">contact@restrofi.in</span>
                                <span className="text-sm text-stone-500 flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Send a message <Icons.ArrowRight className="w-3 h-3" />
                                </span>
                            </a>
                        </div>

                        {/* Address Card */}
                        <div className="group relative p-8 rounded-3xl bg-stone-900/50 backdrop-blur-sm border border-stone-800 hover:border-stone-700 transition-all duration-500">
                            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-stone-500" /> Office
                            </h3>
                            <div className="text-white">
                                <span className="text-2xl font-display font-medium block mb-2">Prayagraj</span>
                                <span className="text-sm text-stone-500 block">Uttar Pradesh, India</span>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

            {/* Minimal Footer */}
            <footer className="bg-stone-950 border-t border-stone-900 py-8 text-center">
                <p className="text-stone-600 text-xs font-medium tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} Restrofi. Crafted in India.
                </p>
            </footer>
        </div>
    );
};
