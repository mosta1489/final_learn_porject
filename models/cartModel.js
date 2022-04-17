const res = require("express/lib/response");
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/arabProject";

const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  image: String,
});

const cartItem = mongoose.model("cart", cartSchema);

function addNewItem(data) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(async () => {
        const itemInDB = await cartItem.findOne({
          poductId: data.ProductId,
          userId: data.userId,
        });

        if (itemInDB) {
          const newAmount = itemInDB.amount + +data.amount;
          await cartItem.updateOne(
            { _id: itemInDB._id },
            { $set: { amount: newAmount } }
          );
        } else {
          const newItem = new cartItem(data);
          await newItem.save();
        }
      })
      .then(() => {
        mongoose.disconnect();
        resolve("A new item has been added");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
}

function geItems(userId) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(async () => {
        const items = await cartItem.find({ userId: userId });
        return items;
      })
      .then((items) => {
        if (items) {
          mongoose.disconnect();
          resolve(items);
        } else {
          mongoose.disconnect();
          reject("cart is empty");
        }
      })
      .catch((error) => {
        mongoose.disconnect();

        reject(error);
      });
  });
}

exports.addNewItem = addNewItem;
exports.geItems = geItems;
