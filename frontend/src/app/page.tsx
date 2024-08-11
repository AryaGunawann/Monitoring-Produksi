import { Title, Text } from "@mantine/core";
import ProductTabel from "../components/produkTabel";
import MaterialsTabel from "../components/materialTabel";
import PackingTabel from "../components/Dasboard/packingTable";
import ShippingTabel from "../components/Dasboard/shippingTable";

export default function HomePage() {
  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <Title order={1}>Dashboard</Title>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="text-center mb-4">
            <Title order={2}>Materials</Title>
          </div>
          <MaterialsTabel />
        </div>
        <div className="col-span-1">
          <div className="text-center mb-4">
            <Title order={2}>Products</Title>
          </div>
          <ProductTabel />
        </div>
        <div className="col-span-1">
          <div className="text-center mb-4">
            <Title order={2}>Packing</Title>
          </div>
          <PackingTabel />
        </div>
        <div className="col-span-1">
          <div className="text-center mb-4">
            <Title order={2}>Shipping</Title>
          </div>
          <ShippingTabel />
        </div>
      </section>
    </div>
  );
}
