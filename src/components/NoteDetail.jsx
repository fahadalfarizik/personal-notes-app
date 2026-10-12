import React from 'react';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils/index';
import { BiArchiveIn, BiArchiveOut, BiTrash } from 'react-icons/bi';

function NoteDetail({ title, createdAt, body, archived, onDelete, onArchive }) {
  return (
    <>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
      <div className="detail-page__body">{body}</div>
      
      <div className="detail-page__action">
        <button 
          className="action" 
          onClick={onArchive} 
          title={archived ? "Batal Arsipkan" : "Arsipkan"}
        >
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </button>
        <button 
          className="action" 
          onClick={onDelete} 
          title="Hapus"
        >
          <BiTrash />
        </button>
      </div>
    </>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteDetail;