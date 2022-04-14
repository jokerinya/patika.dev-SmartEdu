exports.getIndexPage = async (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = async (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = async (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};
