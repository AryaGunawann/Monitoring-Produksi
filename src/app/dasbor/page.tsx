import materialData from "../../components/data/material";
import productData from "../../components/data/product";
import MaterialTable from "../../components/tabel/materialTable";
import ProductTable from "../../components/tabel/productTabel";

const dasbor = () => {
  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        <MaterialTable data={materialData} />
        <ProductTable data={productData} />
      </div>
    </div>
  );
};

export default dasbor;
