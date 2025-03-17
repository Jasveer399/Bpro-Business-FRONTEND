import axios from "axios";
import { deleteFileEndPoint, uploadFileEndPoint } from "./server";

const storeDealerAccessToken = (token) => {
  localStorage.setItem("dealerAccessToken", token);
};
const removeDealerAccessToken = () => {
  localStorage.removeItem("dealerAccessToken");
};

const storeCustomerAccessToken = (token) => {
  localStorage.setItem("customerAccessToken", token);
};
const removeCustomerAccessToken = () => {
  localStorage.removeItem("customerAccessToken");
};

const getCustomerAccessToken = () =>
  localStorage.getItem("customerAccessToken");
const getDealerAccessToken = () => localStorage.getItem("dealerAccessToken");
const getAdminAccessToken = () => localStorage.getItem("accessToken");

const getUserToken = () => {
  const dealerAccessToken = getDealerAccessToken();
  const customerAccessToken = getCustomerAccessToken();
  return dealerAccessToken || customerAccessToken;
};

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
  if (!dateString || typeof dateString !== "string") {
    throw new Error("Invalid input: Please provide a valid date string");
  }

  try {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }

    // Format hours for 12-hour clock
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    // Format minutes with leading zero if needed
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Array of month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Build the formatted string
    const formattedDate = `${hours}:${minutes} ${ampm} ${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;

    return formattedDate;
  } catch (error) {
    throw new Error(`Error formatting date: ${error.message}`);
  }
}

function calculateRemainingDays(createdAt, planDuration) {
  // Convert creation date to Date object
  const startDate = new Date(createdAt);
  const today = new Date();

  // Calculate end date based on plan duration
  let endDate = new Date(startDate);

  switch (planDuration) {
    case "One Month":
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case "Three Month":
      endDate.setMonth(endDate.getMonth() + 3);
      break;
    case "Six Month":
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    case "One Year":
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    case "Three Year":
      endDate.setFullYear(endDate.getFullYear() + 3);
      break;
    default:
      throw new Error("Invalid plan duration");
  }

  // Calculate remaining time in milliseconds
  const remainingTime = endDate.getTime() - today.getTime();

  // Convert to days and round up
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  // Return 0 if plan has expired
  return Math.max(0, remainingDays);
}

function formatIndianCurrency(number) {
  // Convert to string and split into integer and decimal parts
  const [integer, decimal] = number.toString().split(".");

  // Add commas according to Indian number system
  const formattedNumber = integer.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

  // Return with decimal if exists, otherwise just the formatted integer
  return decimal ? `${formattedNumber}.${decimal}` : formattedNumber;
}

const calculateDiscount = (price, discount) => {
  // Calculate discounted price
  const discountedPrice = price - (price * discount) / 100;

  // Calculate discount amount
  const discountAmount = price - discountedPrice;

  return {
    discountedPrice,
    discountAmount,
  };
};

function timeAgo(timestamp) {
  // Parse the timestamp
  const date = new Date(timestamp);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = now - date;

  // Convert to seconds
  const seconds = Math.floor(timeDiff / 1000);

  // Define time intervals in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Return appropriate time string based on time difference
  if (seconds < 5) {
    return "just now";
  } else if (seconds < minute) {
    return seconds + " seconds ago";
  } else if (seconds < 2 * minute) {
    return "a minute ago";
  } else if (seconds < hour) {
    return Math.floor(seconds / minute) + " minutes ago";
  } else if (seconds < 2 * hour) {
    return "an hour ago";
  } else if (seconds < day) {
    return Math.floor(seconds / hour) + " hours ago";
  } else if (seconds < 2 * day) {
    return "yesterday";
  } else if (seconds < week) {
    return Math.floor(seconds / day) + " days ago";
  } else if (seconds < 2 * week) {
    return "a week ago";
  } else if (seconds < month) {
    return Math.floor(seconds / week) + " weeks ago";
  } else if (seconds < 2 * month) {
    return "a month ago";
  } else if (seconds < year) {
    return Math.floor(seconds / month) + " months ago";
  } else if (seconds < 2 * year) {
    return "a year ago";
  } else {
    return Math.floor(seconds / year) + " years ago";
  }
}

export {
  storeDealerAccessToken,
  removeDealerAccessToken,
  getDealerAccessToken,
  getAdminAccessToken,
  storeCustomerAccessToken,
  removeCustomerAccessToken,
  getCustomerAccessToken,
  getUserToken,
  isColorDark,
  uploadFile,
  deleteFile,
  calculateRemainingDays,
  formatIndianCurrency,
  calculateDiscount,
  timeAgo,
};
