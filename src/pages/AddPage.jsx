import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanBodyText = body.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, '').trim();

    if (!cleanTitle || !cleanBodyText) {
      alert(locale === 'id' ? 'Judul dan isi catatan wajib diisi!' : 'Title and body must be filled!');
      return;
    }

    // Mengirim data ke RESTful API
    const { error } = await addNote({ title, body });
    if (!error) {
      navigate('/'); // Kembali ke Home jika sukses menyimpan
    }
  }

  return (
    <section className="add-new-page">
      <form onSubmit={onSubmitHandler}>
        <div className="add-new-page__input">
          <input
            type="text"
            className="add-new-page__input__title"
            placeholder={locale === 'id' ? 'Judul catatan' : 'Note title'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            className="add-new-page__input__body"
            data-placeholder={locale === 'id' ? 'Mulai mengetik catatanmu di sini...' : 'Start typing your note here...'}
            contentEditable
            onInput={(e) => setBody(e.target.innerHTML)}
          />
        </div>
        <div className="add-new-page__action">
          <button className="action" type="submit" title={locale === 'id' ? 'Simpan' : 'Save'}>
            ✔️
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddPage;