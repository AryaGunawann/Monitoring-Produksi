export interface MaterialItem {
  name: string;
  quantity: string;
  date: string;
}

const materialData: MaterialItem[] = [
  { name: "Material A", quantity: "500 kg", date: "2024-05-01" },
  { name: "Material B", quantity: "700 kg", date: "2024-04-28" },
  { name: "Material C", quantity: "300 kg", date: "2024-04-30" },
];

export default materialData;
