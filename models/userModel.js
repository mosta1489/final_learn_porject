const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DB_URL = "mongodb://localhost:27017/arabProject";

const Schema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String },
  fullName: { type: String },
  isAdmin: {
    type: String,
    default: false,
  },
});

const userModel = mongoose.model("user", Schema);

function saveUser(userName, password, fullName) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return userModel.findOne({ userName: userName });
      })
      .then(async (userInDB) => {
        if (userInDB) {
          mongoose.disconnect();
          reject("user alredy exist");
        } else {
          const hashed = await bcrypt.hash(password, 10);
          const newUser = new userModel({
            userName: userName,
            password: hashed,
            fullName: fullName,
          });
          await newUser.save();
          mongoose.disconnect();
          resolve("registration completed successfully");
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function postLogin(userName, password) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(async () => {
        return await userModel.findOne({ userName: userName });
      })
      .then(async (userInDB) => {
        if (userInDB) {
          const checkPassword = await bcrypt.compare(
            password,
            userInDB.password
          );
          if (checkPassword) {
            mongoose.disconnect();
            resolve(userInDB);
          } else {
            mongoose.disconnect();
            reject("pasword not correct");
          }
        } else {
          mongoose.disconnect();
          reject("username not registerd");
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error.message);
      });
  });
}

exports.saveUser = saveUser;
exports.postLogin = postLogin;
