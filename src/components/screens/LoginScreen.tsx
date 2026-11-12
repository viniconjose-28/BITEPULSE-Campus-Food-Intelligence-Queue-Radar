import React from 'react';
import { Mail, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react';
import { localDb } from '../../data/localDatabase';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = React.useState('student@bitepulse.com');
  const [password, setPassword] = React.useState('student123');
  const [isRegisterMode, setIsRegisterMode] = React.useState(false);
  const [name, setName] = React.useState('Vini');
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please provide email and password');
      return;
    }
    if (!email.includes('@')) {
      setError('Please provide a valid university email');
      return;
    }
    const user = localDb.getUser();
    if (isRegisterMode && name.trim()) {
      user.studentName = name.trim();
    }
    user.studentEmail = email.trim();
    localDb.updateUser(user);
    localDb.setLoggedIn(true);
    onLoginSuccess();
  };

  const fillDemoCreds = () => {
    setEmail('student@bitepulse.com');
    setPassword('student123');
    setError(null);
  };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col justify-between p-6 select-none overflow-y-auto">
      {/* Header */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14]"></span>
          <span className="text-xs font-black text-[#39FF14] tracking-wider uppercase font-['Cabinet_Grotesk']">
            BitePulse Student Portal
          </span>
        </div>
        <h1 className="text-2xl font-black text-[#FFFFFF] tracking-tight font-['Cabinet_Grotesk']">
          {isRegisterMode ? 'Create Student Account' : 'Welcome to BitePulse'}
        </h1>
        <p className="text-xs text-[#B7B7B7] mt-1">
          {isRegisterMode
            ? 'Join campus food intelligence & track queues in real-time'
            : 'Sign in to access live radar, queue alerts & Taste Passport'}
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 my-4">
        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {isRegisterMode && (
          <div>
            <label className="text-xs font-bold text-[#FFFFFF] block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vini Sharma"
                className="w-full h-11 px-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-[#FFFFFF] block mb-1">Campus Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777777]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@bitepulse.com"
              className="w-full h-11 pl-9 pr-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-[#FFFFFF] block mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777777]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 pl-9 pr-3 bg-[#111111] border border-[#222222] rounded-xl text-xs text-[#FFFFFF] placeholder:text-[#777777] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
            />
          </div>
        </div>

        {/* Demo Credentials Quick Pill */}
        <div className="bg-[#111111] border border-[#222222] rounded-xl p-2.5 flex items-center justify-between text-xs">
          <div className="text-[11px] text-[#B7B7B7]">
            <span className="font-bold text-[#FFFFFF]">Demo: </span>
            <span className="font-mono text-[#777777]">student@bitepulse.com / student123</span>
          </div>
          <button
            type="button"
            onClick={fillDemoCreds}
            className="text-[10px] font-black text-[#050505] px-2 py-0.5 rounded bg-[#39FF14] hover:bg-[#7CFF5B] transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-2xl bg-[#39FF14] text-[#050505] font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(57,255,20,0.35)] active:scale-[0.98] transition-transform hover:bg-[#7CFF5B] mt-2"
        >
          <LogIn className="w-4 h-4 stroke-[3]" />
          <span>{isRegisterMode ? 'Create Student Profile' : 'Sign In to Campus'}</span>
        </button>
      </form>

      {/* Footer Toggle */}
      <div className="flex flex-col items-center gap-3 pb-2 text-center">
        <button
          type="button"
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setError(null);
          }}
          className="text-xs font-semibold text-[#B7B7B7] hover:text-[#39FF14] min-h-[44px] flex items-center transition-colors"
        >
          {isRegisterMode ? 'Already registered? Sign In' : "Don't have an account? Sign Up"}
        </button>

        <div className="flex items-center gap-1.5 text-[10px] text-[#777777]">
          <Sparkles className="w-3 h-3 text-[#39FF14]" />
          <span>Local-First Offline Demo · Local Database Active</span>
        </div>
      </div>
    </div>
  );
};
