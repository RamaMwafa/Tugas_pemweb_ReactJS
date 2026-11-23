import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "../src/components/templates/PageLayout";
import ProductsRoutePage from "./products/page";
import ProductDetailRoutePage from "./products/detail-page";
import NotFoundRoutePage from "./not-found";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsRoutePage />} />
        <Route path="/products/:id" element={<ProductDetailRoutePage />} />
        <Route path="*" element={<NotFoundRoutePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;