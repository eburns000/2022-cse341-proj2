const appConfig = require("../config/db.config");

const AuthorizationController = {
  login: (req, res) => {
    const authorizationUrl = `${
      appConfig.authorizationHost
    }/authorize?response_type=code&client_id=${
      appConfig.clientID
    }&redirect_uri=${encodeURIComponent(
      appConfig.redirectUrl
    )}&state=1234&scope=openid%20profile%20email`;

    // redirect user - authorization request
    res.redirect(authorizationUrl);
  },
  callback: async (req, res) => {
    // example - return code from query res.json(req.query.code);
    // what we want is to respond to get the token
    // that's why a callback makes sense - we now need to make a POST request
    // fetch API to make POST request easy
    // Makes a request to Auth0 to exchange a Code for an Access Token
    const response = await fetch(`${appConfig.authorizationHost}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ // Auth0 needs to be url encoded
        grant_type: "authorization_code",
        client_id: appConfig.clientID,
        client_secret: appConfig.clientSecret,
        redirect_uri: appConfig.redirectUrl,
        scope: "openid profile email",
        code: req.query.code, // this is the code that was returned to the callback
      }),
    });

    // converts the response we got from Auth0 into JSON
    const jsonResponse = await response.json(); // converts respone to json

    // Returns response in JSON format
    res.json(jsonResponse);

  },
};

module.exports = AuthorizationController;

// note: a request handler always takes a request and response
