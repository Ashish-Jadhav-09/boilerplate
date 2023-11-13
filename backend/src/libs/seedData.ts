import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { userRepository } from "../repositories/user/UserRepository";
import { configuration } from "../config/configuration";

export default async () => {
  const userSeedDataCount = await userRepository.countUsers();

  if (!userSeedDataCount) {
    console.log("||  User Data is Seeding  ||");
    await userRepository.createUser({
      originalId: new mongoose.Types.ObjectId(),
      firstName: "Ashish",
      lastName: "Jadhav",
      email: "jadhavashish228@gmail.com",
      password: await bcrypt.hash('1234567890', configuration.saltRounds),
      role: "admin",
    }, {});
    console.log("||  User Data seeded successfully  ||");
  } else {
    console.log("||  User Data already seeded  ||");
  }
};
