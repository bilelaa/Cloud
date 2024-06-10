const private = async (req, res) => {
  try {
    res.status(200).json({ message: "authorized", auth: true });
  } catch (error) {
    res.status(500).json({ message: "error accessing the private room", auth: false });
  }
};


const updateProfilePicture = async (req, res) => {
  try {
    const cloudinary = require("cloudinary").v2;



    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
      secure: true,
    });
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        req.body.picture,
        { folder: "cld", resource_type: "auto" },
        async function (error, result) {
          if (error) {
            console.log(error);
            reject(error);
           

          }
           else {
          resolve(result);
        }
        }
      );
    });


    res.status(200).json({ message: "picture upload state",result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error uploading picture" });
  }
};

module.exports = { private, updateProfilePicture };
