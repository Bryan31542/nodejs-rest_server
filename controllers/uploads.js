const loadFile = (req, res = response) => {
  res.json({
    msg: "File Uploaded",
  });
};

module.exports = {
  loadFile,
};
