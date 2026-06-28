import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
const uploadImages = async (files) => {
    try {
        // console.log(files);
        
        let urls = [];
        for (let file of files) {
            console.log(file);
            
            const cloudResponse = await uploadFromBuffer(file.buffer);
            urls.push({
                url: cloudResponse.secure_url,
                public_id: cloudResponse.public_id
            });
        };
        return urls;
    } catch (error) {
        throw error
    }
}
export default uploadImages;