import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Import API Utility
import { getUserLogged, putAccessToken } from './utils/network-data';

// Import Contexts
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';

// Import Pages
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Import Components
import Navigation from './components/Navigation';

function App() {
  // 1. Inisialisasi State (Autentikasi, Loading, Bahasa, dan Tema)
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // 2. Memuat data profil user saat aplikasi pertama kali diakses
  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false); // Matikan loading setelah selesai
    }
    fetchUser();
  }, []);

  // 3. Menerapkan atribut data-theme pada elemen root (HTML) setiap kali state tema berubah
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 4. Fungsi Toggle Context
  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  // 5. Fungsi Handler Autentikasi[cite: 17]
  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  // 6. Tampilan Loading (Mencegah Glitch UI saat fetch data)[cite: 17]
  if (initializing) {
    return null; 
  }

  // 7. Jika pengguna BELUM terautentikasi (Hanya bisa akses Login & Register)[cite: 17]
  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  {locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}
                </Link>
              </h1>
              <Navigation />
            </header>
            <main>
              <Routes>
                {/* Rute wildcard '/*' akan menangkap URL apa pun dan mengarahkannya ke Halaman Login[cite: 17] */}
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  // 8. Jika pengguna SUDAH terautentikasi (Akses penuh ke fitur catatan)[cite: 17]
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/" style={{ textDecoration: 'none' }}>
                {locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}
              </Link>
            </h1>
            <Navigation logout={onLogout} name={authedUser.name} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/notes/:id" element={<DetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;