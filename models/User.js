const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./users.db",
  autoload: true
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async register(body) {
    if (body.password === body.repeatPassword) {
      const user = await users.findOne({ email: body.email });
      if (user) {
        return false;
      } else {
        const passwordHash = await bcrypt.hash(body.password, 10);
        const newUser = {
          email: body.email,
          password: passwordHash,
          role: "customer",
          name: body.name,
          adress: {
            street: body.adress.street,
            zip: body.adress.zip,
            city: body.adress.city
          }
        };
        return await users.insert(newUser);
      }
    } else {
      return false;
    }
  },

  async login(body) {
    const user = await users.findOne({});
    const email = body.email;
    const password = body.password;
    if (email !== user.email) {
      return false;
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          email:user.email,
          password: user.password
        };
        const secret = process.env.SECRET;
        const token = jwt.sign(payload, secret);
        return token;
      } else {
        return false;
      }
    }
  }
};