import { useState } from "react";
import type { FormEvent } from "react";
import type { Product, ProductPayload } from "../../../data/product/model/product.model";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";

interface ProductFormModalProps {
  mode: "add" | "edit";
  initialData?: Product;
  isSubmitting: boolean;
  onClose: () => void;
  onSave: (payload: ProductPayload, id?: number) => Promise<void>;
}

export function ProductFormModal({
  mode,
  initialData,
  isSubmitting,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const isEdit = mode === "edit";
  const [name, setName] = useState(isEdit && initialData ? initialData.name : "");
  const [price, setPrice] = useState(isEdit && initialData ? String(initialData.price) : "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    await onSave(
      { name: name.trim(), price: numericPrice },
      isEdit && initialData ? initialData.id : undefined
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-stone-border border-t-4 border-t-navy bg-stone p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">
              {isEdit ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <p className="mt-0.5 text-sm text-muted">
              {isEdit
                ? "Perbarui informasi produk yang dipilih."
                : "Masukkan informasi produk baru ke server."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-0.5 text-2xl leading-none text-muted hover:text-espresso cursor-pointer"
          >
            &times;
          </button>
        </div>

        {isEdit && initialData && (
          <span className="mb-4 inline-block rounded border border-stone-border bg-parchment px-2.5 py-0.5 text-xs font-semibold text-olive">
            ID: {initialData.id}
          </span>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="mb-1.5 block text-sm font-semibold text-espresso">
              Nama Produk
            </label>
            <Input
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

          <div>
            <label htmlFor="productPrice" className="mb-1.5 block text-sm font-semibold text-espresso">
              Harga (Rp)
            </label>
            <Input
              id="productPrice"
              type="number"
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
            />
            <p className={`mt-1.5 text-xs ${error ? "font-medium text-rust" : "text-muted"}`}>
              {error || "Harga harus lebih dari 0."}
            </p>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <Button variant="cancel" onClick={onClose} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;