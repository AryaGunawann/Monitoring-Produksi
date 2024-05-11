import materialData from "../components/data/material";
import MaterialTable from "../components/tabel/materialTable";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome To Monitoring Product</h1>
      <div>
        <MaterialTable data={materialData} />
      </div>
    </div>
  );
}
