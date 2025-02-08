import axios from "axios";
import { deleteFileEndPoint, uploadFileEndPoint } from "./server";

const storeDealerAccessToken = (token) => {
  localStorage.setItem("dealerAccessToken", token);
};
const removeDealerAccessToken = () => {
  localStorage.removeItem("dealerAccessToken");
};
const getDealerAccessToken = () => localStorage.getItem("dealerAccessToken");
const getAdminAccessToken = () => localStorage.getItem("accessToken");

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

export function formatDateString(dateString) {
  // Check if input is valid
  if (!dateString || typeof dateString !== 'string') {
      throw new Error('Invalid input: Please provide a valid date string');
  }

  try {
      // Create a new Date object from the input string
      const date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
          throw new Error('Invalid date format');
      }

      // Format hours for 12-hour clock
      let hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12

      // Format minutes with leading zero if needed
      const minutes = String(date.getMinutes()).padStart(2, '0');

      // Array of month names
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Build the formatted string
      const formattedDate = `${hours}:${minutes} ${ampm} ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

      return formattedDate;
  } catch (error) {
      throw new Error(`Error formatting date: ${error.message}`);
  }
}

export {
  storeDealerAccessToken,
  removeDealerAccessToken,
  getDealerAccessToken,
  getAdminAccessToken,
  isColorDark,
  uploadFile,
  deleteFile,
};
