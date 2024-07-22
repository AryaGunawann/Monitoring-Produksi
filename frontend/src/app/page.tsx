import { Container } from "@mantine/core";
import ProductTabel from "../components/produkTabel";
import MaterialsTabel from "../components/materialTabel";
import PackingTabel from "../components/Dasboard/packingTable";
import ShippingTabel from "../components/Dasboard/shippingTable";

export default function HomePage() {
  return (
    <Container>
      <section>
        <MaterialsTabel />
        <ProductTabel />
        <PackingTabel />
        <ShippingTabel />
      </section>
    </Container>
  );
}
