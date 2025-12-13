import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from '../components/ui/Icons';

export const PrivacyPolicy: React.FC = () => {
    const { setViewMode } = useRestaurant();

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            {/* Header */}
            <header className="bg-stone-900 border-b border-stone-800 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setViewMode('LANDING')}
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/20">
                        <span className="text-stone-900 font-bold text-lg">R</span>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-wide">RESTROFI</h1>
                </div>
                <button
                    onClick={() => setViewMode('LANDING')}
                    className="text-stone-400 hover:text-white transition flex items-center gap-2 text-sm font-medium"
                >
                    <Icons.Left className="w-4 h-4" />
                    Back to Home
                </button>
            </header>

            {/* Content */}
            <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
                <h1 className="text-4xl font-bold text-stone-900 mb-8 font-serif">Privacy Policy</h1>
                <p className="text-stone-500 mb-8 italic">Last Updated: December 2025</p>

                <div className="space-y-8 text-stone-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            At Restrofi, we collect information to provide you with a seamless restaurant management and dining experience.
                            This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> When you sign up, we collect your name, email address, phone number, and restaurant details.</li>
                            <li><strong>Order Data:</strong> We process order details including menu items, table numbers, and timestamps to facilitate service.</li>
                            <li><strong>Usage Data:</strong> We collect data on how you interact with our platform to improve performance and user experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">2. How We Use Your Information</h2>
                        <p>We use the collected data for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>To provide, operate, and maintain our SaaS platform.</li>
                            <li>To process transactions and manage orders efficiently.</li>
                            <li>To improve, personalize, and expand our services.</li>
                            <li>To communicate with you regarding updates, security alerts, and support.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data. All sensitive information is encrypted
                            and stored securely using Supabase's secure infrastructure. However, no method of transmission over the
                            Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Third-Party Services</h2>
                        <p>
                            We may share relevant data with trusted third-party service providers (e.g., payment processors, analytics providers)
                            strictly for the purpose of operational necessity. We do not sell your personal data to advertisers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                            <br />
                            <a href="mailto:contact@restrofi.in" className="text-gold-600 hover:underline">contact@restrofi.in</a>
                        </p>
                    </section>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="bg-stone-900 py-8 text-center text-stone-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Restrofi. All rights reserved.</p>
            </footer>
        </div>
    );
};
