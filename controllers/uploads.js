const path = require("path");
const { v4: uuidv4 } = require("uuid");

const loadFile = (req, res = response) => {
  console.log(req.files);

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send({ msg: "No files were uploaded." });
    return;
  }

  const { file } = req.files;
  const nameCut = file.name.split(".");
  const extension = nameCut[nameCut.length - 1];

  // Validate extension
  const validExtensions = ["jpg", "jpeg", "png", "gif"];

  if (!validExtensions.includes(extension)) {
    return res.status(400).send({ msg: `Invalid file extension ${extension}` });
  }

  const tempName = `${uuidv4()}.${extension}`;
  const uploadPath = path.join(__dirname, "../uploads/", tempName);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: "File uploaded to " + uploadPath });
  });
};

module.exports = {
  loadFile,
};
