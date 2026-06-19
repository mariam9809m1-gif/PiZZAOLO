/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, MapPin, KeyRound, AlertCircle } from 'lucide-react';
import { User as AuthUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (token: string, user: AuthUser) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign up and Sign-In States
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
    const payload = mode === 'register' 
      ? credentials 
      : { email: credentials.email, password: credentials.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server authorization failed');
      }

      onAuthSuccess(data.token, data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Server offline, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />
      
      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md p-6 lg:p-8 border border-gray-100 z-10 text-left">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 cursor-pointer transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Banner */}
        <div className="text-center mb-6">
          <span className="text-[10px] tracking-widest font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full font-bold">
            🔒 SECURED JWT ACCESS
          </span>
          <h3 className="text-2xl font-display font-black text-slate-900 mt-2">
            {mode === 'login' ? 'Sign In to Pizzaiolo' : 'Create Customer Profile'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Access secure checkout, historical order progress tracking, and coupon alerts.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-900 p-3 rounded-xl flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-display font-bold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-4 h-4" /></span>
                <input 
                  type="text" 
                  required
                  className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  value={credentials.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-display font-bold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-4 h-4" /></span>
              <input 
                type="email" 
                required
                className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-1 focus:ring-amber-500 focus:outline-none"
                value={credentials.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="pizza_lover@auth.it"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-display font-bold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-4 h-4" /></span>
              <input 
                type="password" 
                required
                className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-1 focus:ring-amber-500 focus:outline-none"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="text-xs font-display font-bold text-gray-700 block mb-1">Primary Phone</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Phone className="w-4 h-4" /></span>
                  <input 
                    type="tel" 
                    className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    value={credentials.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 555-0199"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-display font-bold text-gray-700 block mb-1">Delivery Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><MapPin className="w-4 h-4" /></span>
                  <input 
                    type="text" 
                    className="bg-slate-50 border border-gray-200 text-xs rounded-xl px-9 py-2.5 w-full focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    value={credentials.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Vico Tre Re 14, Naples"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-display text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer mt-6 transition-all"
          >
            {loading ? (
              <span className="animate-spin text-sm">✦</span>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>{mode === 'login' ? 'Secure Authentication' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center mt-5 text-xs text-gray-500">
          {mode === 'login' ? (
            <span>
              New guest client?{' '}
              <button 
                onClick={() => setMode('register')} 
                className="text-amber-800 font-bold hover:underline cursor-pointer"
              >
                Register a new profile
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button 
                onClick={() => setMode('login')} 
                className="text-amber-800 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
