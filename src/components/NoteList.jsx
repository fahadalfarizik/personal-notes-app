import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import LocaleContext from '../contexts/LocaleContext';

function NoteList({ notes, onDelete, onArchive }) {
  const { locale } = useContext(LocaleContext); // Memanggil context bahasa

  if (notes.length === 0) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty-message">
          {locale === 'id' ? 'Tidak ada catatan' : 'No notes'}
        </p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          id={note.id} 
          onDelete={onDelete} 
          onArchive={onArchive} 
          {...note} 
        />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;