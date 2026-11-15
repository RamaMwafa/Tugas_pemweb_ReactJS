import { useState } from "react";
import ProductCard from "./components/productcard";
import ProductFormModal from "./components/productform";
import DeleteModal from "./components/delete";
import "./App.css";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Pulpen", price: 5000 },
  { id: 2, name: "Buku Tulis", price: 12000 },
  { id: 3, name: "Spidol", price: 8000 },
  { id: 4, name: "Penggaris", price: 6000 },
  { id: 5, name: "Penghapus", price: 3000 },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSaveProduct = (formData) => {
    if (formData.id === null) {
      const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts([...products, { ...formData, id: nextId }]);
    } else {
      setProducts(products.map((item) => (item.id === formData.id ? formData : item)));
    }
    setActiveModal(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((item) => item.id !== id));
    setActiveModal(null);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="header">
          <div>
            <h1>Manajemen Produk</h1>
            <p>Kelola daftar produk dan harga dalam satu tempat.</p>
          </div>
          <button type="button" className="btn-primary" onClick={() => setActiveModal({ type: "add" })}>
            + Tambah Produk
          </button>
        </header>

        <div className="toolbar">
          <div className="search-box">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Cari nama produk..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <span className="total-count">{products.length} produk</span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onEdit={(item) => setActiveModal({ type: "edit", product: item })} onDelete={(item) => setActiveModal({ type: "delete", product: item })} />
            ))}
          </div>
        ) : (
          <div className="empty-state">Tidak ada produk yang cocok dengan pencarian "{searchQuery}".</div>
        )}

        <footer className="footer-info">
          Menampilkan {filteredProducts.length} dari {products.length} produk
        </footer>
      </div>

      {(activeModal?.type === "add" || activeModal?.type === "edit") && <ProductFormModal mode={activeModal.type} initialData={activeModal.product} onClose={() => setActiveModal(null)} onSave={handleSaveProduct} />}

      {activeModal?.type === "delete" && <DeleteModal product={activeModal.product} onClose={() => setActiveModal(null)} onConfirm={handleDeleteProduct} />}
    </div>
  );
}
