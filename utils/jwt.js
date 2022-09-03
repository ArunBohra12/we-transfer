const jwt = require('jsonwebtoken');

exports.signJwt = id => {
  return jwt.sign(
    {
      id,
      iat: Math.floor(Date.now() / 1000) - 30,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    }
  );
};

exports.verifyJwt = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
};
