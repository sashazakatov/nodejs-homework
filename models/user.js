const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
},
{
  versionKey: false
});

const User = model('user', UserSchema);

module.exports = User;