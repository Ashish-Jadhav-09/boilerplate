import * as mongoose from "mongoose";
export class UserSchema extends mongoose.Schema {
  constructor(collections: any) {
    const userSchema = Object.assign({
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      deletedAt: {
        type: Date,
        default: null,
      },
      originalId: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
    });
    super(userSchema, collections);
  }
}
