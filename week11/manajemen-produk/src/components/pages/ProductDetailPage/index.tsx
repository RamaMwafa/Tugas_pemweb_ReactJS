import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../../../data/product/model/product.model";
import { productRepository } from "../../../data/product/repository/product.repository";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setNotFound(false);
        const detail = await productRepository.getProductById(id);
        if (!detail) {
          setNotFound(true);
        } else {
          setProduct(detail);
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-stone-border bg-stone/60 p-10 text-center text-sm text-muted">
        Memuat detail produk...
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-stone-border border-t-4 border-t-rust bg-stone p-8 text-center shadow-sm">
        <span className="inline-block rounded-full bg-rust/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rust">
          Produk Tidak Ditemukan
        </span>
        <h1 className="mt-3 text-3xl font-bold text-espresso">
          Produk dengan ID #{id} tidak tersedia
        </h1>
        <p className="mt-2 text-sm text-muted">
          Data produk mungkin telah dihapus atau parameter ID pada URL tidak valid.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-parchment transition hover:bg-navy-dark"
        >
          &larr; Kembali ke Daftar Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-olive transition-colors hover:text-navy"
        >
          &larr; Kembali ke Daftar Produk
        </Link>
      </div>

      <section className="rounded-xl border border-stone-border border-t-4 border-t-navy bg-stone p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-border pb-4">
          <span className="rounded border border-stone-border bg-parchment px-3 py-1 text-xs font-semibold uppercase tracking-wider text-olive">
            ID Produk: #{product.id}
          </span>
          <span className="text-xs font-medium text-muted">
            Informasi Detail Produk
          </span>
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-espresso sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl font-bold tabular-nums text-bronze">
            Rp{product.price.toLocaleString("id-ID")}
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 rounded-lg border border-stone-border bg-parchment p-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
              Nama Produk
            </dt>
            <dd className="mt-1 text-sm font-medium text-espresso">{product.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
              Harga Satuan
            </dt>
            <dd className="mt-1 text-sm font-medium text-espresso">
              Rp{product.price.toLocaleString("id-ID")}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

export default ProductDetailPage;