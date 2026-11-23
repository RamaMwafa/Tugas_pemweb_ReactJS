import { useEffect, useState } from "react";
import type { Product, ProductPayload } from "../../../data/product/model/product.model";
import { productRepository } from "../../../data/product/repository/product.repository";
import { Button } from "../../atoms/Button";
import { SearchBar } from "../../molecules/SearchBar";
import { ProductGrid } from "../../organisms/ProductGrid";
import { ProductFormModal } from "../../organisms/ProductFormModal";
import { DeleteModal } from "../../organisms/DeleteModal";

type ActiveModal =
  | { type: "add" }
  | { type: "edit"; product: Product }
  | { type: "delete"; product: Product }
  | null;

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const list = await productRepository.getProducts();
      setProducts(list);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Gagal memuat produk dari server."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async (payload: ProductPayload, id?: number) => {
    try {
      setIsSubmitting(true);
      if (id === undefined) {
        const created = await productRepository.createProduct(payload);
        setProducts((prev) => [...prev, created]);
      } else {
        const updated = await productRepository.updateProduct(id, payload);
        setProducts((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
      }
      setActiveModal(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menyimpan produk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsSubmitting(true);
      await productRepository.deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setActiveModal(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus produk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="mb-7 flex flex-col justify-between gap-4 border-b border-stone-border pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">
            Daftar Produk
          </h1>
          <p className="mt-1 text-sm text-muted">
            Kelola katalog produk yang terhubung langsung dengan backend API.
          </p>
        </div>
        <Button variant="primary" onClick={() => setActiveModal({ type: "add" })}>
          + Tambah Produk
        </Button>
      </section>

      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <span className="text-sm font-medium tabular-nums text-olive">
          {products.length} produk tersedia
        </span>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-stone-border bg-stone/60 p-10 text-center text-sm text-muted">
          Memuat data produk dari server...
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-rust/40 bg-rust/10 p-6 text-center">
          <p className="text-sm font-medium text-rust">{errorMessage}</p>
          <Button variant="primary" className="mt-3" onClick={() => void loadProducts()}>
            Muat Ulang
          </Button>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
          onEdit={(product) => setActiveModal({ type: "edit", product })}
          onDelete={(product) => setActiveModal({ type: "delete", product })}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-stone-border bg-stone/50 p-10 text-center text-sm text-muted">
          {searchQuery
            ? `Tidak ada produk yang cocok dengan pencarian "${searchQuery}".`
            : "Belum ada data produk di server."}
        </div>
      )}

      <footer className="mt-8 border-t border-stone-border pt-4 text-xs text-muted">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </footer>

      {activeModal?.type === "add" && (
        <ProductFormModal
          mode="add"
          isSubmitting={isSubmitting}
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
        />
      )}

      {activeModal?.type === "edit" && (
        <ProductFormModal
          mode="edit"
          initialData={activeModal.product}
          isSubmitting={isSubmitting}
          onClose={() => setActiveModal(null)}
          onSave={handleSave}
        />
      )}

      {activeModal?.type === "delete" && (
        <DeleteModal
          product={activeModal.product}
          isDeleting={isSubmitting}
          onClose={() => setActiveModal(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default ProductsPage;