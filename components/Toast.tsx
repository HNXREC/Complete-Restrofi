
import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from './ui/Icons';

export const Toast: React.FC = () => {
  const { toast } = useRestaurant();

  if (!toast.visible) return null;

  return (
    <div className="fixed z-[100] 
                    top-24 left-4 max-w-[85%] w-auto
                    md:top-auto md:bottom-12 md:left-1/2 md:-translate-x-1/2 md:max-w-sm
                    pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto bg-stone-900/95 backdrop-blur-xl text-white px-5 py-4 rounded-xl md:rounded-full shadow-2xl flex items-center justify-start gap-4 border border-gold-500/30 ring-1 ring-white/10 animate-fade-in-up">
        <div className="flex items-center gap-3 w-full">
            <div className="bg-gold-500 rounded-full p-1 text-stone-900 shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <Icons.Check className="w-3 h-3 md:w-4 md:h-4 stroke-[3]" />
            </div>
            <p className="font-medium text-sm tracking-wide text-gold-50 leading-tight pb-0.5 flex-1 text-left">{toast.message}</p>
        </div>
      </div>
    </div>
  );
};
