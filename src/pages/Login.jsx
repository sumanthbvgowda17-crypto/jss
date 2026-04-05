import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Activity, LogIn, UserPlus, Key } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [uniqueId, setUniqueId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear errors when switching modes
  useEffect(() => {
    setError('');
    setSuccess('');
    setUniqueId('');
    setUsername('');
    setPassword('');
  }, [isRegistering]);

  const validateId = (id) => {
    // Must be 8 characters, start with "smt", last 5 must be numbers
    const re = /^smt\d{5}$/i;
    return re.test(id);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!uniqueId || !username || !password) {
      setError('All fields are required.');
      return;
    }
    if (!validateId(uniqueId)) {
      setError('Invalid ID format. Must be "smt" followed by 5 numbers (e.g. smt12345).');
      return;
    }
    
    // Store in localStorage
    const users = JSON.parse(localStorage.getItem('smartBedUsers')) || {};
    if (users[username]) {
      setError('Username already exists.');
      return;
    }

    users[username] = { password, uniqueId };
    localStorage.setItem('smartBedUsers', JSON.stringify(users));
    
    setSuccess('Registration successful! Please login.');
    setIsRegistering(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('smartBedUsers')) || {};
    const userRecord = users[username];

    if (!userRecord || userRecord.password !== password) {
      setError('Invalid username or password.');
      return;
    }

    // Success
    localStorage.setItem('currentUser', username);
    if (onLoginSuccess) {
      onLoginSuccess(username);
    }
  };

  const handleForgotPassword = () => {
    setError('Please register a new account to reset access.');
    setIsRegistering(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-navy-900 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-md glass-panel p-8 relative z-10 animate-fade-in border border-navy-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
            <Activity size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-mono font-medium tracking-wide">Smart Bed Connected</span>
          </div>
          <h1 className="text-4xl text-white mb-2 font-serif tracking-wide drop-shadow-md">SmartBed Health</h1>
          <p className="text-gray-400 text-sm">Your intelligent sleep & health monitor</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-navy-900/50 p-1 rounded-xl mb-6 relative">
          <button 
            onClick={() => setIsRegistering(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${!isRegistering ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsRegistering(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isRegistering ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Register
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm animate-slide-up">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm animate-slide-up">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          
          {isRegistering && (
            <div className="relative group">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-400 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Device ID (e.g. smt12345)" 
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                className="w-full bg-navy-800/50 border border-navy-700 text-white placeholder-gray-500 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-teal-500 transition-colors focus:shadow-[0_0_15px_rgba(0,212,200,0.15)]"
              />
            </div>
          )}

          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-navy-800/50 border border-navy-700 text-white placeholder-gray-500 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-800/50 border border-navy-700 text-white placeholder-gray-500 rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-blue-500 transition-colors focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isRegistering && (
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,212,200,0.2)] flex items-center justify-center gap-2"
          >
            {isRegistering ? (
              <>
                <UserPlus size={18} /> Register Device
              </>
            ) : (
              <>
                <LogIn size={18} /> Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
