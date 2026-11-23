import type { Product } from "../../../data/product/model/product.model";
import { Button } from "../../atoms/Button";

interface DeleteModalProps {
  product: Product;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (id: number) => Promise<void>;
}

export function DeleteModal({
  product,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const formattedPrice = `Rp${product.price.toLocaleString("id-ID")}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/55 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl border border-stone-border border-t-4 border-t-rust bg-stone p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md px-2 py-0.5 text-2xl leading-none text-muted hover:text-espresso cursor-pointer"
        >
          &times;
        </button>

        <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-xl bg-rust/15 text-rust">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-espresso">Hapus Produk?</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          Produk yang dihapus dari server tidak dapat dikembalikan.
        </p>

        <div className="mb-5 flex flex-col gap-0.5 rounded-lg border border-stone-border bg-parchment p-3.5 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-olive">
            ID: {product.id}
          </span>
          <strong className="font-serif text-xl text-espresso">{product.name}</strong>
          <span className="text-base font-bold text-bronze">{formattedPrice}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Button variant="cancel" onClick={onClose} disabled={isDeleting}>
            Batal
          </Button>
          <Button variant="danger" onClick={() => onConfirm(product.id)} disabled={isDeleting}>
            {isDeleting ? "Menghapus..." : "Hapus Produk"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;