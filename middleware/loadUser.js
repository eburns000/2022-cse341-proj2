const appConfig = require("../config/db.config");

//request -> loadUser (middleware) -> favoriteScriptures
// all middleware takes a req, res, and next
// the next() is what sends it onto the next method to be called

const loadUser = async (req, res, next) => {

  try {
    console.log(`req.headers.authorization: ${req.headers.authorization}`);
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    console.log(authZeroUser);
  } catch (error) {
    console.log(error.message);
  }

  next();
};

// GET request - user info - need to pass in access token into header
const fetchAuthZeroUser = async (authorizationValue) => {
  const response = await fetch(`${appConfig.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue },
  });

  return response.json();
};

module.exports = loadUser;
