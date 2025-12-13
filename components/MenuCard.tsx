
import React from 'react';
import { MenuItem } from '../types';
import { Icons } from './ui/Icons';
import { useRestaurant } from '../context/RestaurantContext';

export const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const { addToCart } = useRestaurant();
  const isAvailable = item.inStock !== false;

  return (
    <div className={`group bg-white rounded-sm overflow-hidden transition-all duration-700 border flex flex-col h-full relative ${isAvailable ? 'border-gold-300 md:border-stone-100 md:hover:shadow-premium-hover md:hover:border-gold-300' : 'border-stone-100 opacity-80'}`}>
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`absolute inset-0 z-10 transition-colors ${isAvailable ? 'bg-stone-900/10 md:group-hover:bg-transparent' : 'bg-stone-200/50 grayscale'}`}></div>
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-1000 ${isAvailable ? 'md:group-hover:scale-110' : 'grayscale'}`}
        />

        {/* Out of Stock Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 z-30 flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-stone-900 font-display text-xl md:text-2xl font-bold tracking-widest uppercase border-4 border-stone-900 px-6 py-2 transform -rotate-12 bg-white/90 shadow-2xl">
              Sold Out
            </span>
          </div>
        )}

        {item.isPopular && isAvailable && (
          <div className="absolute top-0 left-0 z-20 bg-stone-900 text-gold-400 text-[10px] font-bold tracking-[0.2em] px-4 py-2 uppercase shadow-lg">
            Royal Choice
          </div>
        )}

        {/* Indian Veg Symbol */}
        <div className="absolute top-4 right-4 z-20 bg-white p-1 shadow-sm border border-green-600 rounded-[2px] w-5 h-5 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
        </div>

        {isAvailable && (
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-stone-900/80 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-end justify-center pb-6">
            <button
              onClick={(e) => { e.stopPropagation(); addToCart(item); }}
              className="bg-gold-500 text-stone-900 md:hover:bg-white md:hover:text-stone-900 px-6 py-2 uppercase text-xs font-bold tracking-widest shadow-lg transition-all transform translate-y-4 md:group-hover:translate-y-0"
            >
              Add to Feast
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1 relative bg-white">
        <div className="flex justify-between items-start mb-3">
          <h3 className={`font-display text-2xl font-medium transition-colors leading-tight w-3/4 ${isAvailable ? 'text-stone-900 md:group-hover:text-gold-600' : 'text-stone-400'}`}>
            {item.name}
          </h3>
          <span className={`font-serif text-xl border-b pb-1 ${isAvailable ? 'text-stone-900 border-gold-300' : 'text-stone-400 border-stone-200'}`}>
            ₹{item.price}
          </span>
        </div>

        <div className={`w-8 h-px mb-4 ${isAvailable ? 'bg-gold-200' : 'bg-stone-200'}`}></div>

        <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 font-serif">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {item.dietary?.map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-widest text-stone-400 border border-stone-200 px-1.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          {/* Mobile Add Button - Visible only on mobile where hover doesn't exist */}
          {isAvailable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
              className="md:hidden w-10 h-10 bg-stone-900 text-gold-400 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              aria-label="Add to cart"
            >
              <Icons.Plus className="w-5 h-5" />
            </button>
          )}

          {!isAvailable && (
            <span className="text-[10px] uppercase font-bold text-red-800 bg-red-50 px-2 py-1 tracking-wider rounded-sm">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
