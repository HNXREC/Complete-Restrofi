
import React, { useState, useEffect, useRef } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Icons } from './ui/Icons';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({ isOpen, onClose }) => {
  const { handleLogin } = useRestaurant();
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setPin(['', '', '', '']);
      setError(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError(false);

    // Auto-advance
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit on fill
    if (index === 3 && value) {
      const fullPin = newPin.join('');
      if (!handleLogin(fullPin)) {
        setError(true);
        setPin(['', '', '', '']);
        setTimeout(() => {
             inputRefs.current[0]?.focus();
        }, 300);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-stone-200">
        <div className="p-8 text-center">
            <div className="w-16 h-16 bg-stone-900 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Icons.Chef className="w-8 h-8" />
            </div>
            
            <h2 className="font-display font-bold text-2xl text-stone-900 mb-2">Staff Access</h2>
            <p className="text-stone-500 text-sm mb-8">Enter your 4-digit security PIN</p>

            <div className="flex gap-3 justify-center mb-8">
                {pin.map((digit, idx) => (
                    <input
                        key={idx}
                        ref={(el) => { inputRefs.current[idx] = el; }}
                        type="password"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-stone-50 focus:bg-white transition-all outline-none ${
                            error 
                            ? 'border-red-300 text-red-500 bg-red-50 animate-shake' 
                            : 'border-stone-200 focus:border-gold-500 text-stone-900'
                        }`}
                    />
                ))}
            </div>

            <button 
                onClick={onClose}
                className="text-sm font-bold text-stone-400 hover:text-stone-600 tracking-widest uppercase transition-colors"
            >
                Cancel
            </button>
        </div>
        <div className="bg-stone-50 p-4 border-t border-stone-100 text-center">
            <p className="text-[10px] text-stone-400 font-mono">DEFAULT PIN: 1234</p>
        </div>
      </div>
    </div>
  );
};
