import React, { useState, useMemo, useEffect } from 'react';
import { MenuCard } from '../components/MenuCard';
import { CartDrawer } from '../components/CartDrawer';
import { OrderSuccess } from '../components/OrderSuccess';
import { Toast } from '../components/Toast';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from '../components/ui/Icons';
import { ServiceType } from '../types';

interface CustomerAppProps {
  isEmbedded?: boolean;
}

export const CustomerApp: React.FC<CustomerAppProps> = ({ isEmbedded = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showServiceMenu, setShowServiceMenu] = useState(false);

  // Get menuItems and categories from context
  const { cart, setIsCartOpen, tableId, tableNumber, requestService, menuItems, currentRestaurant, categories: ctxCategories, setViewMode } = useRestaurant();

  useEffect(() => {
    const handleScroll = () => {
      // If embedded, we might need a different scroll target, but checking window.scrollY is safe-ish or we disable standard scroll effect
      if (!isEmbedded) {
        setScrolled(window.scrollY > 50);
      }
    };
    // For embedded view, we might want to attach listener to the container, but for this visual fix, sticking to simple is better.
    // If embedded, let's just make the header always solid or transparent? 
    // Actually, let's just use absolute positioning so it stays within the container.

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEmbedded]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Filter by category
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // Filter by Dietary Preferences
    if (activeFilters.length > 0) {
      items = items.filter(item => {
        if (!item.dietary) return false;
        // Item must contain ALL active filters
        return activeFilters.every(filter => item.dietary!.includes(filter));
      });
    }

    return items;
  }, [activeCategory, searchQuery, activeFilters, menuItems]);

  const categories = useMemo(() => {
    const base = [{ id: 'all', label: 'All', sub: 'Sampoorna' }];
    const dynamic = ctxCategories.map(c => ({
      id: c,
      label: c.charAt(0).toUpperCase() + c.slice(1),
      sub: 'Selection' // Generic placeholder for dynamic categories
    }));
    return [...base, ...dynamic];
  }, [ctxCategories]);

  const dietaryOptions = [
    { id: 'JAIN', label: 'Jain' },
    { id: 'VG', label: 'Vegan' },
    { id: 'GF', label: 'Gluten Free' }
  ];

  const handleServiceRequest = (type: ServiceType) => {
    requestService(type);
    setShowServiceMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] selection:bg-gold-200 selection:text-stone-900 flex flex-col relative">
      {/* Navigation */}
      <nav
        className={`${isEmbedded ? 'absolute' : 'fixed'} top-0 w-full z-40 transition-all duration-500 border-b ${scrolled
          ? 'glass-panel py-3 border-stone-200/50 shadow-sm'
          : 'bg-transparent py-6 border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 flex items-center justify-center border-2 transition-all duration-500 ${scrolled ? 'border-stone-900 text-stone-900' : 'border-gold-300 text-gold-300'
              }`}>
              <span className="font-display font-bold text-2xl tracking-tighter">
                {currentRestaurant.name.charAt(0)}
              </span>
            </div>
            <div className={`flex flex-col ${scrolled ? 'text-stone-900' : 'text-white'}`}>
              <h1 className="font-display text-2xl tracking-widest uppercase font-bold leading-none">{currentRestaurant.name}</h1>
              <button onClick={() => window.location.href = '/'} className="text-[10px] tracking-[0.3em] uppercase opacity-80 text-gold-400 md:hover:text-white transition-colors text-left">Powered by RestroFi</button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {tableNumber ? (
              <div className="relative">
                <button
                  onClick={() => setShowServiceMenu(!showServiceMenu)}
                  className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-sm border backdrop-blur-sm transition-colors ${scrolled
                    ? 'border-gold-400 bg-gold-50 text-gold-700 hover:bg-gold-100'
                    : 'border-gold-300/30 bg-black/40 text-gold-100 hover:bg-black/60'
                    }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase font-serif">Table {tableNumber}</span>
                  <Icons.List className="w-3 h-3 ml-1" />
                </button>

                {/* Service Dropdown */}
                {showServiceMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-xl overflow-hidden border border-gold-200 animate-fade-in-up origin-top-right">
                    <div className="bg-stone-900 text-gold-400 px-4 py-2 text-[10px] uppercase tracking-widest font-bold">Request Service</div>
                    <button onClick={() => handleServiceRequest('WATER')} className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-gold-50 border-b border-stone-100 flex items-center gap-2">
                      💧 Water
                    </button>
                    <button onClick={() => handleServiceRequest('SERVER')} className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-gold-50 border-b border-stone-100 flex items-center gap-2">
                      👨‍🍳 Call Server
                    </button>
                    <button onClick={() => handleServiceRequest('BILL')} className="w-full text-left px-4 py-3 text-sm text-stone-700 hover:bg-gold-50 flex items-center gap-2">
                      🧾 Request Bill
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative group transition-colors ${scrolled ? 'text-stone-800 hover:text-gold-600' : 'text-white hover:text-gold-300'}`}
            >
              <Icons.Bag className="w-6 h-6 stroke-[1.5]" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md ring-2 ring-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Restaurant Interior"
            className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_15s_ease-in-out_infinite_alternate]"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-stone-900/20 to-black/70"></div>
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
          <div className="border-b border-gold-400/50 pb-4 mb-6 animate-fade-in-up">
            <span className="text-gold-300 tracking-[0.5em] uppercase text-xs font-bold">{currentRestaurant.type}</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl animate-fade-in-up delay-100">
            {currentRestaurant.name} <br /><span className="italic font-serif text-gold-200">Welcomes You</span>
          </h2>

          {tableNumber && (
            <div className="animate-fade-in-up delay-300 flex flex-col items-center gap-2">
              <p className="text-white/80 font-serif italic text-xl">
                Namaste, Table {tableNumber}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Section */}
      <main className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 flex-grow w-full">

        <div className="bg-white p-6 rounded-t-3xl shadow-xl border-b border-stone-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative group w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icons.Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-full leading-5 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all font-serif text-sm"
              placeholder="Search for Kofta, Biryani..."
            />
          </div>

          {/* Dietary Filters */}
          <div className="flex gap-2 flex-wrap justify-center">
            {dietaryOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggleFilter(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase border transition-all ${activeFilters.includes(opt.id)
                  ? 'bg-stone-900 text-gold-400 border-stone-900'
                  : 'bg-white text-stone-500 border-stone-200 hover:border-gold-300'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-center my-8 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex gap-4 items-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex flex-col items-center transition-all duration-300 px-4 py-2 rounded-lg ${activeCategory === cat.id
                  ? 'text-stone-900'
                  : 'text-stone-400 hover:text-stone-600'
                  }`}
              >
                <span className={`font-display font-bold text-lg leading-none mb-1 border-b-2 ${activeCategory === cat.id ? 'border-gold-500' : 'border-transparent'}`}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-20">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <Icons.Utensils className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-serif italic text-xl">
              {searchQuery || activeFilters.length > 0 ? "No dishes match your preferences." : "Our chefs are preparing this section."}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilters([]); }}
              className="mt-4 text-gold-600 hover:text-gold-500 text-sm font-bold tracking-widest uppercase border-b border-gold-600 hover:border-gold-500 pb-1 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Premium Detailed Footer */}
      <footer className="bg-stone-950 text-stone-400 border-t-4 border-gold-700 relative mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-gold-500 flex items-center justify-center text-gold-500 font-display font-bold text-xl">{currentRestaurant.name.charAt(0)}</div>
              <span className="font-display text-2xl text-white tracking-widest uppercase">{currentRestaurant.name}</span>
            </div>
            <p className="font-serif italic text-stone-500 leading-relaxed">
              "Where the richness of heritage meets the precision of modern gastronomy."
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-gold-500 hover:text-gold-500 hover:bg-stone-900 transition-all">
                <Icons.Instagram className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-gold-500 hover:text-gold-500 hover:bg-stone-900 transition-all">
                <Icons.Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:border-gold-500 hover:text-gold-500 hover:bg-stone-900 transition-all">
                <Icons.Facebook className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="text-white font-display text-lg mb-6 uppercase tracking-widest border-b border-stone-800 pb-2 inline-block">Visit Us</h4>
            <ul className="space-y-4 font-light text-sm">
              <li className="flex items-start gap-3">
                <span className="text-gold-600 mt-1">⟡</span>
                <span>{currentRestaurant.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-600">✆</span>
                <span>{currentRestaurant.phone || '+91 11 2345 6789'}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold-600">✉</span>
                <span>contact@restrofi.in</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-display text-lg mb-6 uppercase tracking-widest border-b border-stone-800 pb-2 inline-block">Hours</h4>
            <ul className="space-y-4 font-light text-sm">
              <li className="flex justify-between border-b border-stone-900 pb-2">
                <span>Lunch</span>
                <span className="text-gold-400">12:00 PM - 3:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-stone-900 pb-2">
                <span>Dinner</span>
                <span className="text-gold-400">7:00 PM - 11:30 PM</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Weekend Brunch</span>
                <span className="text-gold-400">11:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-display text-lg mb-6 uppercase tracking-widest border-b border-stone-800 pb-2 inline-block">The Royal Scroll</h4>
            <p className="text-xs mb-4">Subscribe for exclusive tasting menus and private events.</p>
            <div className="flex border-b border-stone-700 pb-2 focus-within:border-gold-500 transition-colors">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent w-full outline-none text-white placeholder-stone-600 text-sm"
              />
              <button className="text-gold-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-900 bg-black">
          <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
            <p>&copy; 2025 {currentRestaurant.name}. Powered by RestroFi.</p>

          </div>
        </div>
      </footer >

      <CartDrawer />
      <OrderSuccess />
      <Toast />
    </div >
  );
};
