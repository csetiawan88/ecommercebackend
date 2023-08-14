const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// Get all tag
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.get("/", async (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData)) // Can use .catch and try too
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a tag based on the 'id'
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbCategoryData) => {
      // Can use .catch and try too
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new Tag
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.post("/", async (req, res) => {
  // create a new tag
  // Use Sequelize's `create()` method to add a row to the table
  // Similar to `INSERT INTO` in plain SQL
  Tag.create({
    tag_name: req.body.tag_name,
  })
    // Send the newly created row as a JSON object
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Update tag category base on its 'id'
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbTagData) => {
      // Can use .catch and try too
      if (!dbTagData) {
        res.status(404).json({ message: "No Tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete route for a category with a matching 'id'
// This route uses async/await with try/catch for errors
// along with HTTP status codes
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  console.log("id", req.params.id);
  // Looks for the tag based on 'id' given in the request parameters and deletes the instance from the database
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      // Can use .catch and try too
      if (!dbTagData) {
        res.status(404).json({ message: "No Tag found with this id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
