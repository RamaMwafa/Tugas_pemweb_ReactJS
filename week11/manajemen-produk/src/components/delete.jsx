export default function DeleteModal({ product, onClose, onConfirm }) {
  const formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box modal-delete" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="btn-close delete-close" onClick={onClose}>
          &times;
        </button>

        <div className="delete-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <h2 className="delete-title">Hapus Produk?</h2>
        <p className="delete-subtitle">Produk yang dihapus tidak dapat dikembalikan.</p>

        <div className="delete-preview">
          <span className="card-id">ID: {product.id}</span>
          <strong>{product.name}</strong>
          <span className="card-price">{formatRupiah(product.price)}</span>
        </div>

        <div className="modal-actions modal-actions-split">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="btn-danger" onClick={() => onConfirm(product.id)}>
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}
