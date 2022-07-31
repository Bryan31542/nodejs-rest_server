const { uploadFile } = require("../helpers");

const loadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send({ msg: "No files were uploaded." });
    return;
  }

  try {
    // Images only
    const name = await uploadFile(req.files, undefined, "images");
    // const name = await uploadFile(req.files, ["txt", "md"], "texts");
    res.json({ name });
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
};

module.exports = {
  loadFile,
};
