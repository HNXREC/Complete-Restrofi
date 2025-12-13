import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from '../components/ui/Icons';

export const TermsOfService: React.FC = () => {
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
                <h1 className="text-4xl font-bold text-stone-900 mb-8 font-serif">Terms of Service</h1>
                <p className="text-stone-500 mb-8 italic">Last Updated: December 2025</p>

                <div className="space-y-8 text-stone-700 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Restrofi platform, you agree to be bound by these Terms of Service.
                            If you disagree with any part of the terms, you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Use of Service</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You must provide accurate and complete information when creating an account.</li>
                            <li>You are responsible for maintaining the security of your account and password.</li>
                            <li>You may not use the service for any illegal or unauthorized purpose.</li>
                            <li>Restrofi reserves the right to terminate accounts that violate these terms.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Subscription and Payments</h2>
                        <p>
                            Restrofi offers subscription-based access. By subscribing, you agree to pay the fees associated
                            with your chosen plan. Prices are subject to change with notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Intellectual Property</h2>
                        <p>
                            The service and its original content, features, and functionality are and will remain the exclusive
                            property of Restrofi and its licensors.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Limitation of Liability</h2>
                        <p>
                            In no event shall Restrofi, nor its directors, employees, partners, agents, suppliers, or affiliates,
                            be liable for any indirect, incidental, special, consequential or punitive damages, including without
                            limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. We will try to provide at least
                            30 days' notice prior to any new terms taking effect.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-stone-900 mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at:
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
