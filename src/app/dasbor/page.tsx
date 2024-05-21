import { Text, Container, Divider } from "@mantine/core";
import materialData from "../../components/data/material";
import productData from "../../components/data/product";
import MaterialList from "../../components/tabel/materialList";
import ProductList from "../../components/tabel/productList";

const Dasbor = () => {
  return (
    <div className="min-h-screen ">
      <Container className=" p-6 rounded-lg ">
        <Text className="text-3xl font-semibold mb-6 text-white">Dasbor</Text>
        <div className="space-y-12">
          <div>
            <ProductList data={productData} />
          </div>

          <div>
            <MaterialList data={materialData} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dasbor;
