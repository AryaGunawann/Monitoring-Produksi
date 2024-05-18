import React from "react";

import materialData from "../../components/data/material";
import InventoryTable from "../../components/tabel/inventoryMetah";
import InventoryProduct from "../../components/tabel/inventoryProduct";
import productData from "../../components/data/product";

const inventory = () => {
  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        <InventoryTable data={materialData} />
        <InventoryProduct data={productData} />
      </div>
    </div>
  );
};

export default inventory;
