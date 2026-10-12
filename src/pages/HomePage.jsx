import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'; // Impor ikon Plus
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    setLoading(true);
    const { data } = await getActiveNotes();
    setNotes(data || []);
    setLoading(false);
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    fetchNotes(); 
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    fetchNotes(); 
  }

  function onKeywordChangeHandler(keyword) {
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="homepage">
      <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      
      {loading ? (
        <p className="notes-list__empty-message">
          {locale === 'id' ? 'Memuat catatan...' : 'Loading notes...'}
        </p>
      ) : (
        <NoteList 
          notes={filteredNotes} 
          onDelete={onDeleteHandler} 
          onArchive={onArchiveHandler} 
        />
      )}

      {/* Tombol Aksi Tambah Catatan yang diminta Reviewer */}
      <div className="homepage__action">
        <Link to="/notes/new">
          <button className="action" type="button" title={locale === 'id' ? 'Tambah' : 'Add'}>
            <FiPlus />
          </button>
        </Link>
      </div>
    </section>
  );
}

export default HomePage;