const router = require("express").Router();
const categoryRoutes = require("./category-routes");
const productRoutes = require("./product-routes");
const tagRoutes = require("./tag-routes");

// Prefix all routes defined in `category-routes.js` with `/categories
router.use("/categories", categoryRoutes);

// Prefix all routes defined in `product-routes.js` with `/products
router.use("/products", productRoutes);

// Prefix all routes defined in `tag-routes.js` with `/tags
router.use("/tags", tagRoutes);

module.exports = router;
