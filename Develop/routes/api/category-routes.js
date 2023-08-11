const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// Get all categories
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // be sure to include its associated Products
    const categoryData = await Category.findAll({ include: [Product] });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

  // Another Alternative Code without using Try Catch
  // Category.findAll({
  //   attributes: ["id", "category_name"],

  //   include: [
  //     {
  //       model: Product,
  //       attributes: ["id", "product_name", "price", "stock", "category_id"],
  //     },
  //   ],
  // })

  //   .then((dbCategoryData) => res.json(dbCategoryData))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// Get a category based on the 'id'
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      // JOIN with products, using the productTag through table
      // be sure to include its associated Products
      include: [Product],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // Category.findOne({
  //   where: {
  //     id: req.params.id,
  //   },

  //   include: [
  //     {
  //       model: Product,
  //       attributes: ["id", "product_name", "price", "stock", "category_id"],
  //     },
  //   ],
  // })
  //   .then((dbCategoryData) => {
  //     if (!dbCategoryData) {
  //       res.status(404).json({ message: "No category found with this id" });
  //       return;
  //     }
  //     res.json(dbCategoryData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// CREATE a new category
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.post("/", async (req, res) => {
  // create a new category
  // Use Sequelize's `create()` method to add a row to the table
  // Similar to `INSERT INTO` in plain SQL

  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

  // Category.create({
  //   category_name: req.body.category_name,
  // })
  //   // Send the newly created row as a JSON object
  //   .then((dbCategoryData) => res.json(dbCategoryData))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

//Update category base on its 'id'
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

  // Category.update(
  //   {
  //     category_name: req.body.category_name,
  //   },
  //   {
  //     where: {
  //       id: req.params.id,
  //     },
  //   }
  // )
  //   .then((dbCategoryData) => {
  //     if (!dbCategoryData) {
  //       res.status(404).json({ message: "No Category found with this id" });
  //       return;
  //     }
  //     res.json(dbCategoryData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// Delete route for a category with a matching 'id'
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // console.log("id", req.params.id);
  // Looks for the category based on 'id' given in the request parameters and deletes the instance from the database
  // Category.destroy({
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((dbCategoryData) => {
  //     if (!dbCategoryData) {
  //       res.status(404).json({ message: "No Category found with this id" });
  //       return;
  //     }
  //     res.json(dbCategoryData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

module.exports = router;
