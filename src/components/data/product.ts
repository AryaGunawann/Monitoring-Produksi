export interface ProductItem {
  name: string;
  quantity: string;
  date: string;
}

const productData: ProductItem[] = [
  { name: "Product X", quantity: "1000 unit", date: "2024-05-01" },
  { name: "Product Y", quantity: "700 unit", date: "2024-04-28" },
  { name: "Product Z", quantity: "300 unit", date: "2024-04-30" },
];

export default productData;
