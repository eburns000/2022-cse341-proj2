const appConfig = require("../config/db.config");
const User = require("../models/user");

//request -> loadUser (middleware) -> favoriteScriptures
// all middleware takes a req, res, and next
// the next() is what sends it onto the next method to be called
// Why is this in middleware? Because we need to get the user information
// before we allow access onto other resources. 
const loadUser = async (req, res, next) => {
  
  try {
    // get user information from Auth0  
    console.log(`req.headers.authorization: ${req.headers.authorization}`);
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
    console.log(authZeroUser);

    // retrieve user information from DB or add user to DB if does not exist
    const user = await findOrCreateUser(authZeroUser);
    console.log(user);

    // next step: make this user available to our controller - the way to do this
    // is to store on the req object - see 1:38:52
    // req.user = user;

  } catch (error) {
    console.log(`Error attempting to access user: ${error.message}`);
  }

  next();
};

// helper function: GET request - user info - need to pass in access token into header
const fetchAuthZeroUser = async (authorizationValue) => {
  const response = await fetch(`${appConfig.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue },
  });

  return response.json();
};

// helper function: find user if exists, then return, otherwise create user
// mongoose functions need to be "awaited" because they return promises
const findOrCreateUser = async (authZeroUserJson) => {
  // if null or undefined, just return and do nothing
  if (!authZeroUserJson) return;

  // look up the user based on the identifier, if it exists, return it
  try {
    const existingUser = await User.findOne({
      identifier: authZeroUserJson.sub,
    });
    if (existingUser) return existingUser;
  } catch (error) {
    console.log(error.message);
  }

  // otherwise, user does not exist, let's create and return the new user
  try {
    const newUser = await User.create({
      identifier: authZeroUserJson.sub,
      email: authZeroUserJson.email,
      givenName: authZeroUserJson.given_name,
      familyName: authZeroUserJson.family_name,
      locale: authZeroUserJson.locale,
      picture: authZeroUserJson.picture,
    });
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = loadUser;
