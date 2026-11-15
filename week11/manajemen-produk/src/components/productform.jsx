import { useState } from "react";

export default function ProductFormModal({ mode, initialData, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [name, setName] = useState(isEdit ? initialData.name : "");
  const [price, setPrice] = useState(isEdit ? String(initialData.price) : "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPrice = Number(price);

    if (!name.trim()) {
      setError("Nama produk tidak boleh kosong.");
      return;
    }
    if (!price || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError("Harga harus lebih dari 0.");
      return;
    }

    onSave({
      id: isEdit ? initialData.id : null,
      name: name.trim(),
      price: numericPrice,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{isEdit ? "Edit Produk" : "Tambah Produk"}</h2>
            <p className="modal-subtitle">{isEdit ? "Perbarui informasi produk yang dipilih." : "Masukkan informasi produk baru."}</p>
          </div>
          <button type="button" className="btn-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {isEdit && <p className="modal-id-info">ID: {initialData.id}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Nama Produk</label>
            <input
              id="productName"
              type="text"
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="productPrice">Harga (Rp)</label>
            <input
              id="productPrice"
              type="number"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
            />
            <span className={`form-hint ${error ? "text-error" : ""}`}>{error || "Harga harus lebih dari 0."}</span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
