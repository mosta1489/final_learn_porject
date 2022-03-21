const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://mosta1489:mosta1489@cluster0.xh1an.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
