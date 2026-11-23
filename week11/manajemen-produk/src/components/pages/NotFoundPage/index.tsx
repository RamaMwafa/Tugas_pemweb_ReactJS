import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-stone-border border-t-4 border-t-navy bg-stone p-8 text-center shadow-sm">
        <p className="font-serif text-6xl font-bold text-bronze">404</p>
        <h1 className="mt-2 text-3xl font-bold text-navy">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 text-sm text-muted">
          URL yang Anda tuju tidak terdaftar pada aplikasi ini.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-parchment transition hover:bg-navy-dark"
        >
          Kembali ke Daftar Produk
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;