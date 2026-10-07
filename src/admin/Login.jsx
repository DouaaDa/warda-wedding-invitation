import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      setLoading(false);
      return;
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-sm border border-gold/20">
        <h2 className="font-serif text-3xl text-secondary mb-8 text-center italic">Connexion Admin</h2>
        
        {error && (
          <div className="bg-red-50 text-red-800 p-4 mb-6 rounded-sm text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-secondary/20 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-pearl/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-secondary/20 rounded-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-pearl/30"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-gold py-4 uppercase tracking-[0.2em] text-sm hover:bg-tertiary transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
