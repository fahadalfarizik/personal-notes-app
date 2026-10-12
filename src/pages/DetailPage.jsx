import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteDetail from '../components/NoteDetail'; // Sesuaikan jika namamu NoteDetail atau NoteItem
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  async function onDeleteHandler() {
    await deleteNote(id);
    navigate('/');
  }

  async function onArchiveHandler() {
    if (note.archived) {
      await unarchiveNote(id);
      navigate('/archives');
    } else {
      await archiveNote(id);
      navigate('/');
    }
  }

  if (loading) {
    return <section><p>{locale === 'id' ? 'Memuat detail catatan...' : 'Loading note details...'}</p></section>;
  }

  if (!note) {
    return <section><p>{locale === 'id' ? 'Catatan tidak ditemukan!' : 'Note not found!'}</p></section>;
  }

  return (
    <section className="detail-page">
      <NoteDetail 
        {...note} 
        onDelete={onDeleteHandler} 
        onArchive={onArchiveHandler} 
      />
    </section>
  );
}

export default DetailPage;