const jwt = require('jsonwebtoken');

// Generate an Access Token for the given User ID
module.exports = function generateAccessToken(userId) {
  // How long will the token be valid for
  const expiresIn = '1 hour';
  // Which service issued the token
  const issuer = process.env.ISSUER;
  // Which service is the token intended for
  const audience = process.env.AUDIENCE;
  // The signing key for signing the token
  const secret = process.env.SECRET_OR_KEY;

  const token = jwt.sign({ userId }, secret, {
    expiresIn,
    audience,
    issuer,
    subject: userId.toString()
  });

  return { token };
};
