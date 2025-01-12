import axios from "axios";
import { deleteFileEndPoint, uploadFileEndPoint } from "./server";

const storeDealerAccessToken = (token) => {
  localStorage.setItem("dealerAccessToken", token);
};
const removeDealerAccessToken = () => {
  localStorage.removeItem("dealerAccessToken");
};
const getDealerAccessToken = () => localStorage.getItem("dealerAccessToken");

const isColorDark = (hexColor) => {
  const rgb = parseInt(hexColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

const uploadFile = async (file) => {
  try {
    // Create FormData object
    const formData = new FormData();
    formData.append("image", file);

    // Send file to server
    const response = await axios.post(uploadFileEndPoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("ResPones =>>>>", response);

    // Return the URL from the response
    return response.data.url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const deleteFile = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    // Extract filename from URL
    const filename = fileUrl.split("/").pop();

    // Send delete request to backend
    await axios.delete(`${deleteFileEndPoint}/${filename}`);

    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export {
  storeDealerAccessToken,
  removeDealerAccessToken,
  getDealerAccessToken,
  isColorDark,
  uploadFile,
  deleteFile,
};
