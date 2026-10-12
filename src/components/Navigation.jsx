import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Impor Ikon dari react-icons
import { FiLogOut } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';

// Impor Context
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';

function Navigation({ logout, name }) {
  // Mengonsumsi Context menggunakan Hooks
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navigation">
      <ul>
        {/* Menu "Arsip" hanya muncul jika pengguna sudah login (props logout tersedia) */}
        {logout && (
          <li>
            <Link to="/archives">{locale === 'id' ? 'Terarsip' : 'Archived'}</Link>
          </li>
        )}

        {/* Tombol Toggle Global: Tetap muncul sebelum dan sesudah login */}
        <li>
          <button onClick={toggleLocale} className="toggle-locale" title="Ubah Bahasa">
            <MdGTranslate />
          </button>
        </li>
        <li>
          <button onClick={toggleTheme} className="toggle-theme" title="Ubah Tema">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </li>

        {/* Tombol Logout HANYA muncul jika pengguna sudah login */}
        {logout && (
          <li>
            <button onClick={logout} className="button-logout" title="Logout">
              <FiLogOut /> {name}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

// Props validation[cite: 17]
Navigation.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default Navigation;