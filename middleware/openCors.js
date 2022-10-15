const cors = require("cors");

let corsOptions = {
  option: "*",
};

module.exports = cors(corsOptions);