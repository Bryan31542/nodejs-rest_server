const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  validExtensions = ["jpg", "jpeg", "png", "gif"],
  directory = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const nameCut = file.name.split(".");
    const extension = nameCut[nameCut.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject({ msg: `Invalid file extension ${extension}` });
    }

    const tempName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, "../uploads/", directory, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(tempName);
    });
  });
};

module.exports = { uploadFile };
