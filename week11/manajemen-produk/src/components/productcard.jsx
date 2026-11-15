export default function ProductCard({ product, onEdit, onDelete }) {
  const formatRupiah = (angka) => `Rp${angka.toLocaleString("id-ID")}`;

  return (
    <div className="product-card">
      <span className="card-id">ID: {product.id}</span>
      <h3 className="card-title">{product.name}</h3>
      <p className="card-price">{formatRupiah(product.price)}</p>

      <div className="card-actions">
        <button type="button" className="btn-outline-blue" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button type="button" className="btn-outline-red" onClick={() => onDelete(product)}>
          Hapus
        </button>
      </div>
    </div>
  );
}
