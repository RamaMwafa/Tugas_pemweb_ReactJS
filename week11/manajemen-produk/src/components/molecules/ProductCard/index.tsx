import { Link } from "react-router-dom";
import type { Product } from "../../../data/product/model/product.model";
import { Button } from "../../atoms/Button";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const formattedPrice = `Rp${product.price.toLocaleString("id-ID")}`;

  return (
    <article className="flex flex-col rounded-xl border border-stone-border border-t-4 border-t-navy bg-stone p-5 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-olive">
          ID: {product.id}
        </span>
        <Link
          to={`/products/${product.id}`}
          className="text-xs font-semibold text-navy underline-offset-4 hover:underline"
        >
          Detail &rarr;
        </Link>
      </div>

      <Link to={`/products/${product.id}`} className="group">
        <h3 className="text-2xl font-bold leading-snug text-espresso transition-colors group-hover:text-navy">
          {product.name}
        </h3>
      </Link>

      <p className="mt-1 mb-5 text-lg font-bold tabular-nums text-bronze">
        {formattedPrice}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-2.5">
        <Button variant="oliveOutline" className="py-1.5" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="rustOutline" className="py-1.5" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </article>
  );
}

export default ProductCard;