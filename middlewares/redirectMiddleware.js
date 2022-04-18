const User = require('../models/User');

// if there is a user session send to dashboard
module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userID);
    if (user._id) {
      res.redirect('/');
    }
  } catch (error) {
    next();
  }
};
