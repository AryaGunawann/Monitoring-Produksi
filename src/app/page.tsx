import { Container } from "@mantine/core";
import MaterialsTabel from "../components/materialTabel";
import Productstabel from "../components/produkTabel";

export default function HomePage() {
  return (
    <Container>
      <Productstabel />
      <MaterialsTabel />
    </Container>
  );
}
