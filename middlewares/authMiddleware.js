const User = require('../models/User');

// if there is not a user session send to login
module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID);
    if (user._id) {
      next();
    }
  } catch (error) {
    res.redirect('/login');
  }
};
