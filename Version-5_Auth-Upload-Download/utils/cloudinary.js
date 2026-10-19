require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "airbnb-houses",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

/**
 * Safely delete an image from Cloudinary by public ID or URL
 * @param {string} photoUrl - The stored image URL
 * @param {string} publicId - The stored Cloudinary public ID
 */
const deleteCloudinaryImage = async (photoUrl, publicId) => {
  try {
    let idToDelete = publicId;

    // If publicId was not passed, extract it from a Cloudinary URL
    if (!idToDelete && photoUrl && typeof photoUrl === "string") {
      const match = photoUrl.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
      if (match && match[1]) {
        idToDelete = match[1];
      }
    }

    if (idToDelete) {
      await cloudinary.uploader.destroy(idToDelete);
    }
  } catch (err) {
    console.error("Cloudinary image deletion failed:", err.message);
  }
};

module.exports = {
  cloudinary,
  storage,
  deleteCloudinaryImage,
};

