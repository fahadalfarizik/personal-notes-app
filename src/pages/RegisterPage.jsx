import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/network-data';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();

    // Validasi mandiri: Pastikan password dan konfirmasi password cocok
    if (password !== confirmPassword) {
      alert(locale === 'id' ? 'Password dan konfirmasi password harus sama!' : 'Password and confirm password must match!');
      return;
    }

    const { error } = await register({ name, email, password });
    
    // Jika registrasi sukses, arahkan pengguna kembali ke halaman Login ('/')
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}</h2>
      
      <form onSubmit={onSubmitHandler} className="input-register">
        <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={onNameChange} 
          required 
        />
        
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

        <label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
        <input 
          type="password" 
          id="confirmPassword" 
          value={confirmPassword} 
          onChange={onConfirmPasswordChange} 
          required 
        />
        
        <button type="submit">{locale === 'id' ? 'Register' : 'Register'}</button>
      </form>
      
      <p>
        {locale === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
        <Link to="/">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;