const users = require("../model/users.json");

const usersDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.status(401).json({ message: "user not found!" }); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWTs
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.status(401).json({ message: "password not correct!" });
  }
};

module.exports = { handleLogin };
