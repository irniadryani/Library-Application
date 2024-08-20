const { User } = require('../models/UsersModel'); // Adjust the path to your User model

const verifySession = async (req, res, next) => {
  // Check if there is a user ID in the session
  if (req.session.userId) {
    try {
      // Find the user by the ID stored in the session
      const user = await User.findByPk(req.session.userId);

      // If user exists, proceed to the next middleware or route handler
      if (user) {
        req.user = user; // Attach user information to the request object (optional)
        return next();
      } else {
        // If no user is found, destroy the session and respond with unauthorized
        req.session.destroy(() => {
          res.status(401).send('Unauthorized: No user found');
        });
      }
    } catch (error) {
      // Handle errors and respond with a server error
      console.error(error);
      res.status(500).send('Server error');
    }
  } else {
    // If no session ID is found, respond with unauthorized
    res.status(401).send('Unauthorized: No session');
  }
};

module.exports = {
  verifySession,
};
