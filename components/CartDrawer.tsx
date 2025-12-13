
import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from './ui/Icons';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, placeOrder, tableNumber, isPlacingOrder } = useRestaurant();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.05; // 5% GST for restaurants
  const finalTotal = total + tax;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAFAF9] z-50 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col border-l border-white/20">

        {/* Receipt Header */}
        <div className="p-8 border-b border-stone-200 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"></div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-stone-900">Your Selection</h2>
              <p className="text-gold-600 text-sm tracking-widest uppercase mt-1">
                {tableNumber ? `Table ${tableNumber} • Service` : 'Fine Dining'}
              </p>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-stone-900 transition-colors p-2 hover:bg-stone-100 rounded-full">
              <Icons.Close className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <Icons.Bag className="w-8 h-8 opacity-40" />
              </div>
              <p className="font-display text-xl text-stone-500">Your cart is empty.</p>
              <p className="text-sm max-w-xs text-center mt-2 opacity-60">Discover our culinary masterpieces and add them to your order.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-5 items-start bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-bold text-lg text-stone-900 leading-tight w-2/3">{item.name}</h4>
                    <p className="font-serif font-bold text-stone-900">₹{(item.price * item.quantity).toFixed(0)}</p>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 italic line-clamp-1">{item.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 bg-stone-50 rounded-full px-1 border border-stone-200">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-stone-400 hover:text-stone-900 transition">
                        <Icons.Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center text-stone-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-stone-400 hover:text-stone-900 transition">
                        <Icons.Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-300 hover:text-red-500 underline decoration-red-200 transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Total */}
        <div className="p-8 bg-white border-t border-stone-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-stone-500 text-sm">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-500 text-sm">
              <span>GST (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-stone-100 my-2"></div>
            <div className="flex justify-between items-end">
              <span className="font-display text-xl text-stone-900">Total</span>
              <span className="font-serif text-4xl font-bold text-stone-900 text-gold-gradient">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={cart.length === 0 || isPlacingOrder}
            className="w-full bg-stone-900 text-gold-400 py-5 rounded-xl font-bold tracking-widest uppercase hover:bg-black hover:text-gold-300 transition-all shadow-lg hover:shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 group"
          >
            {isPlacingOrder ? (
              <>
                <div className="w-5 h-5 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>Confirm Order <Icons.Right className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
