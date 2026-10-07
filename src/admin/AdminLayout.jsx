import { useEffect, useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-primary text-gold">Chargement...</div>;
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-pearl text-secondary font-sans">
      <nav className="bg-primary text-gold px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="font-serif text-2xl italic tracking-widest">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="text-sm uppercase tracking-widest hover:text-white transition-colors"
        >
          Déconnexion
        </button>
      </nav>
      <main className="p-6 md:p-12">
        <Outlet />
      </main>
    </div>
  );
}
