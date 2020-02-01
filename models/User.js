const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./db/myddata.db",
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
    const user = await users.findOne({ email:body.email });
    if (!user) {
      return false;
    } else {
      const passwordMatch = await bcrypt.compare(body.password, user.password);
      if (passwordMatch){
        const secret = process.env.SECRET;
        const payload = {
          token: "token", 
          user:{
            email:user.email,
            name:user.name,
            role:user.role,
            adress:{
              street: user.adress.street,
              city: user.adress.city,
              zip: user.adress.zip
            }
            
          }
          
        };
        return jwt.sign(payload,secret) ;
      } else {
        return false;
      }
    }
  }
};