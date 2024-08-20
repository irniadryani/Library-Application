const { User } = require('../models/UsersModel'); // Adjust the path to your User model
const { comparePassword } = require('../utils/utils'); // Adjust the path to your utils

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // Set user ID in session
    req.session.userId = user.id;

    // Send response
    res.status(200).send('Logged in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  login,
};
