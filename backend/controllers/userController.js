exports.getFiles = (req, res) => {
  const user = req.user;

  res.send(user);
};
