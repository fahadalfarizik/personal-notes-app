import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import { login } from '../utils/network-data';

function LoginPage({ loginSuccess }) {
  // Menggunakan Custom Hook untuk mengelola state input form
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  
  // Mengonsumsi Context untuk fitur multi-bahasa
  const { locale } = useContext(LocaleContext);

  async function onSubmitHandler(event) {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    
    // Jika tidak ada error dari API, panggil fungsi loginSuccess dari App.jsx
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}</h2>
      
      <form onSubmit={onSubmitHandler} className="input-login">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={onEmailChange} 
          required 
        />
        
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={onPasswordChange} 
          required 
        />
        
        <button type="submit">{locale === 'id' ? 'Login' : 'Login'}</button>
      </form>
      
      <p>
        {locale === 'id' ? 'Belum punya akun? ' : 'Don\'t have an account? '}
        <Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link>
      </p>
    </section>
  );
}

export default LoginPage;