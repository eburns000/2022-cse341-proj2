const cors = require("cors");

let corsOptions = {
  origin: "*", // was option
};

module.exports = cors(corsOptions);
