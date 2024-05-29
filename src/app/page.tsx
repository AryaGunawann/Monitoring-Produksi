import MaterialsPage from "./materials/page";
import ProductsPage from "./products/page";

export default function HomePage() {
  return (
    <div>
      <ProductsPage />
      <MaterialsPage />
    </div>
  );
}
