import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import users from "./data/users.js";
import { foods } from "./data/data.js";
import connect from "./db/db.js";

connect();

const importDb = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleFoods = foods.map((food) => {
      return { ...food, user: adminUser };
    });

    await Product.insertMany(sampleFoods);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyDb = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyDb();
} else {
  importDb();
}
