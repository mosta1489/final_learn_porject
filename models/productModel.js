const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/arabProject";
function connection() {
  return mongoose.connect(dbURL);
}

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  title: String,
  descriptors: String,
  category: String,
});

const product = mongoose.model("product", productSchema);

exports.getAllProduct = () => {
  return new Promise((resolve, reject) => {
    connection()
      .then(async () => {
        return await product.find({});
      })

      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })

      .catch((err) => {
        reject(err);
      });
  });
};

exports.getProductByCategory = (category) => {
  return new Promise((resolve, reject) => {
    connection()
      .then(async () => {
        return await product.find({ category: category });
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })

      .catch((err) => {
        reject(err);
      });
  });
};

exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    connection()
      .then(async () => {
        return await product.findById(id);
      })
      .then((product) => {
        mongoose.disconnect();
        resolve(product);
      })

      .catch((err) => {
        reject(err);
      });
  });
};

exports.addProduct = (newProduct) => {
  return new Promise((resolve, reject) => {
    connection()
      .then(async () => {
        const Product = new product(newProduct);
        await Product.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("product added successfully");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
