import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import Login from './admin/Login.jsx'
import Dashboard from './admin/Dashboard.jsx'
import { supabase } from './lib/supabase'
import { wedding } from './config'

// Fetch settings before rendering (only when Supabase is configured)
async function init() {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('wedding_settings').select('*').single();
      if (data && !error) {
        Object.assign(wedding, data);
      }
    } catch (err) {
      console.warn('[init] Failed to load wedding settings from Supabase, using defaults.', err);
    }
  } else {
    console.info('[init] Supabase not configured. Using local default wedding config.');
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  )
}

init();
