import { Container } from "@mantine/core";
import ProductTabel from "../components/produkTabel";
import MaterialsTabel from "../components/materialTabel";

export default function HomePage() {
  return (
    <Container>
      <section>
        <ProductTabel />
        <MaterialsTabel />
      </section>
    </Container>
  );
}
