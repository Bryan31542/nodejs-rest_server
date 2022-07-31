const { uploadFile } = require("../helpers");

const loadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send({ msg: "No files were uploaded." });
    return;
  }

  // Images only
  const name = await uploadFile(req.files);

  res.json({
    name,
  });
};

module.exports = {
  loadFile,
};
