// get user info - root/userinfo
const getUserInfo = (req, res) => {
  console.log("user info requested");
  if (!req.user) {
    console.log("user information is empty");
    return res.status(400).send({
      message: "User information not passed into body!",
    });
  }

  console.log("user info sent in response");
  res.json(req.user);
};

module.exports = { getUserInfo };
