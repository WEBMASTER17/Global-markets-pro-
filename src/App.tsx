import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import CryptoPage from './pages/CryptoPage';
import ForexPage from './pages/ForexPage';
import CommoditiesPage from './pages/CommoditiesPage';
import DiamondPage from './pages/DiamondPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { X, Mail, Lock, Eye, EyeOff, User, ArrowRight, Chrome } from 'lucide-react';

function WelcomeBanner() {
  const { countryDetected, currency, t } = useApp();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (countryDetected && !sessionStorage.getItem('gm_welcomed')) {
      setShow(true);
      sessionStorage.setItem('gm_welcomed', '1');
      const timer = setTimeout(() => setShow(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [countryDetected]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-[60] glass-card rounded-2xl p-5 border border-brand-500/30 shadow-2xl shadow-brand-500/20 slide-in max-w-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-2xl shrink-0">
          🌍
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{t('welcomeMessage')}</p>
          <p className="text-lg font-bold text-brand-400 mt-0.5">{currency} ({countryDetected})</p>
        </div>
      </div>
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-3 text-gray-600 hover:text-white text-lg transition w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10"
      >
        ×
      </button>
    </div>
  );
}

/* ===== LOGIN / SIGN UP MODAL ===== */
function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && password !== confirmPass) {
      alert('Passwords do not match!');
      return;
    }
    alert(
      `${mode === 'login' ? '🔑 Logging in' : '🎉 Creating account'} with:\n` +
      `Email: ${email}\n\n` +
      `Backend integration coming soon!`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden fade-in">
        {/* Gradient top bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 pt-7">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500/20 to-purple-500/20 flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-brand-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {mode === 'login' ? t('login') : t('signUp')}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'login' ? 'Access your Diamond AI dashboard' : 'Start your AI trading journey'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-800 border border-white/5 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'login' ? 'bg-brand-600/20 text-brand-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t('login')}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${mode === 'signup' ? 'bg-brand-600/20 text-brand-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t('signUp')}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block font-medium">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-800 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-gray-500 font-medium">{t('password')}</label>
                {mode === 'login' && (
                  <button type="button" className="text-xs text-brand-400 hover:text-brand-300 transition">
                    {t('forgotPassword')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-800 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block font-medium">{t('confirmPassword')}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-800 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition"
                  >
                    {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-purple-500 hover:from-brand-400 hover:to-purple-400 text-white text-sm font-bold text-center shadow-lg shadow-brand-500/20 transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {mode === 'login' ? t('login') : t('createAccount')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-gray-600">{t('orContinueWith')}</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-800 border border-white/5 hover:border-white/15 text-sm text-gray-300 hover:text-white transition cursor-pointer"
            >
              <Chrome className="w-4 h-4" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-800 border border-white/5 hover:border-white/15 text-sm text-gray-300 hover:text-white transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.04-.56-.04-.95 0-1.15.572-2.27 1.206-2.98.94-1.07 2.11-1.66 3.022-1.66.1.05.2.11.3.18.13.22.206.5.206.82zm5.635 16.93c0 .07-.007.14-.02.21-1.27 3.56-5.18 7.43-6.51 7.43-.4 0-1.01-.17-1.63-.37-.72-.24-1.53-.5-2.54-.5s-1.75.26-2.42.49c-.65.21-1.22.4-1.72.4C5.86 26 2 21.78 2 21.78c-.52-.87-.9-1.87-1.17-2.94-.37-1.47-.57-3.01-.57-4.56 0-4.07 2.39-6.41 4.71-6.41 1.1 0 2.02.37 2.78.67.63.25 1.15.46 1.62.46.42 0 .9-.2 1.45-.44.84-.37 1.88-.83 3.16-.83 2.83 0 5.04 1.77 5.99 4.34-.1.06-3.38 1.72-3.38 5.34 0 4.19 3.41 5.67 3.58 5.72z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Switch mode */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              {mode === 'login' ? t('noAccount') : t('haveAccount')}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-brand-400 hover:text-brand-300 font-medium transition"
              >
                {mode === 'login' ? t('signUp') : t('login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loginOpen, setLoginOpen] = useState(false);

  const setPage = (p: string) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard setPage={setPage} />;
      case 'crypto': return <CryptoPage />;
      case 'forex': return <ForexPage />;
      case 'commodities': return <CommoditiesPage />;
      case 'diamond': return <DiamondPage />;
      case 'terms': return <TermsPage />;
      case 'privacy': return <PrivacyPage />;
      default: return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 text-gray-200 animated-gradient-bg">
      <WelcomeBanner />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <Header currentPage={currentPage} setPage={setPage} onOpenLogin={() => setLoginOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
                    }
