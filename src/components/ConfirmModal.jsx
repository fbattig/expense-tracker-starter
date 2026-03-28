function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal
