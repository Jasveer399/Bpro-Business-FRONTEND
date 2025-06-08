import React from "react";
import { useNavigate } from "react-router-dom";

const DisplayVisitingCardWithQR = ({ id, url, setSnackbar }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      // Fetch the image
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch QR code");
      }

      // Convert response to blob
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element for download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `visiting-card-qr-${id}.png`; // Set filename

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);

      setSnackbar({
        open: true,
        type: "success",
        text: "QR code downloaded successfully",
      });
    } catch (error) {
      console.error("Download failed:", error);

      setSnackbar({
        open: true,
        type: "error",
        text: "Failed to download QR code",
      });
    }
  };

  return (
    <div className="rounded-lg shadow-md px-4 py-6 flex flex-col items-center justify-center border border-gray-200">
      <img src={url} className="w-48 h-48 object-cover" alt="QR Code" />
      <button
        onClick={() => navigate(`/visiting-card/${id}`)}
        className="bg-primary font-bold shadow-md text-white px-4 py-2 rounded-full mt-2 w-[90%]"
      >
        Visit
      </button>
      <button
        onClick={handleDownload}
        className="bg-secondary font-bold shadow-md text-black px-4 py-2 rounded-full mt-2 w-[90%]"
      >
        Download
      </button>
    </div>
  );
};

export default DisplayVisitingCardWithQR;
