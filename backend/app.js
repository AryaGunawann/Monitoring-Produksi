const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");

// Menghubungkan ke database
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/produk", require("./routes/produkRoutes"));
app.use("/material", require("./routes/materialRoutes"));
app.use("/riwayat", require("./routes/riwayatRoutes"));
app.use("/jabatan", require("./routes/jabatan"));
app.use("/employee", require("./routes/employee"));
app.use("/slipgaji", require("./routes/slipGaji"));
app.use("/packing", require("./routes/packing"));
app.use("/shipping", require("./routes/shipping"));

const PORT = process.env.PORT || 2000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
