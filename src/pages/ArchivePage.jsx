import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  async function fetchArchivedNotes() {
    setLoading(true);
    const { data } = await getArchivedNotes();
    setNotes(data || []);
    setLoading(false);
  }

  async function onDeleteHandler(id) {
    await deleteNote(id);
    fetchArchivedNotes();
  }

  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
    fetchArchivedNotes();
  }

  function onKeywordChangeHandler(keyword) {
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archives-page">
      <h2>{locale === 'id' ? 'Catatan Terarsip' : 'Archived Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      
      {loading ? (
        <p className="notes-list__empty-message">{locale === 'id' ? 'Memuat catatan...' : 'Loading notes...'}</p>
      ) : (
        <NoteList 
          notes={filteredNotes} 
          onDelete={onDeleteHandler} 
          onArchive={onUnarchiveHandler} 
        />
      )}
    </section>
  );
}

export default ArchivePage;