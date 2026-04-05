import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import Doctors from './pages/Doctors';
import Recovery from './pages/Recovery';
import About from './pages/About';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import { Stethoscope, Activity, HeartPulse, Info, Moon, LogOut } from 'lucide-react';

const NavLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
        isActive ? 'bg-teal-500/10 text-teal-400 font-medium shadow-[0_0_10px_rgba(0,212,200,0.1)]' : 'text-gray-400 hover:text-gray-200 hover:bg-navy-800'
      }`}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none bg-navy-900/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Moon className="text-teal-400" size={24} />
              </div>
              <span className="font-serif text-2xl tracking-wide text-white group-hover:text-teal-400 transition-colors">SleepSense</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/checker" icon={Activity}>Symptom Checker</NavLink>
              <NavLink to="/doctors" icon={Stethoscope}>Find Doctors</NavLink>
              <NavLink to="/recovery" icon={HeartPulse}>My Recovery</NavLink>
              <NavLink to="/about" icon={Info}>About</NavLink>
            </nav>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checker" element={<SymptomChecker />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="border-t border-navy-700/50 py-8 text-center text-gray-500 mt-auto">
          <p className="text-sm">Disclaimer: SleepSense AI is not a substitute for professional medical advice.</p>
        </footer>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
