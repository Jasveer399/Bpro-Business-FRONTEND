import React, { useState } from "react";
import { FaStar, FaWhatsapp, FaBookmark } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MailOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Snackbars from "../../../ui/Snackbars";
import { getUserToken } from "../../../Utils/Helper";
import ProgrammaticDialog from "../../../ui/ProgrammaticDialog";
import CustomerLoginForm from "../Forms/Auth/CustomerLoginForm";

function PopularSearches({ product, onBookmarkToggle }) {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Function to handle navigation to product detail
  const handleProductClick = (productId) => {
    if (getUserToken()) {
      navigate(`/product-detail/${productId}`);
    } else {
      setSelectedProductId(productId);
      setIsLoginDialogOpen(true);
    }
  };

  // Function to handle after successful login
  const handleSuccessfulLogin = () => {
    setIsLoginDialogOpen(false);
    if (selectedProductId) {
      navigate(`/product-detail/${selectedProductId}`);
      setSelectedProductId(null);
    }
  };

  // Function to handle communication buttons click
  const handleCommunicationClick = (type) => {
    if (getUserToken()) {
      // If logged in, do nothing as href will handle it
      return;
    } else {
      // If not logged in, trigger dialog
      setIsLoginDialogOpen(true);
    }
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setIsLoginDialogOpen(false);
    setSelectedProductId(null);
  };

  return (
    <>
      <div className="relative border bg-white border-[#E7E7E7] rounded-md font-montserrat p-2">
        {/* Bookmark Icon */}
        <div
          className="absolute top-3 right-3 cursor-pointer z-50"
          onClick={() => onBookmarkToggle(product)}
        >
          <FaBookmark
            className={`${
              product.bookmark ? "text-yellow-500" : "text-gray-500"
            }`}
            size={20}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          {/* Product Image */}
          <div>
            <img
              src={product.images?.[0] || "/placeholder-image.png"}
              alt={product.title}
              className="rounded-t-md w-full h-48 object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center gap-1">
              <img src="/cardIcon.png" className="w-5" />
              <p className="text-[#6A6A6A] mt-1 text-sm">
                {product?.categories?.map((cat) => `${cat.title}`)}
              </p>
            </div>
            <div className="flex items-center text-[#00BCE7]">
              <VscVerifiedFilled size={20} />
              <p className="font-semibold text-sm">Verified</p>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-lg">{product.title}</h1>
          </div>
          <div className="flex items-center my-1">
            <IoLocationSharp className="text-secondary" size={16} />
            <p className="text-[#6A6A6A] text-xs truncate">
              {product?.Dealer?.city + ", " + product?.Dealer?.state ||
                "Location Not Specified"}
            </p>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="flex items-center gap-1 bg-secondary py-[2px] px-2 rounded-md">
              <p className="font-semibold text-sm mt-px">
                {product.averageRatings || "0.0"}
              </p>
              <FaStar className="text-white" size={14} />
            </div>
            <p className="text-[#6A6A6A] text-sm">
              {product.Reviews?.length || product?._count?.Reviews || "0"}{" "}
              Ratings
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getUserToken() ? (
            <>
              <a
                href={`tel:+91${product?.Dealer?.mobileNo}`}
                className="bg-[#29AF3E] px-3 py-1 rounded-md text-white font-semibold border border-[#29AF3E]"
              >
                Call Now
              </a>
              <a
                href={`https://wa.me/+91${product?.Dealer?.whatsappNo}`}
                className="border border-[#C3C3C3] rounded-md p-px"
              >
                <FaWhatsapp className="text-[#29AF3E] text-3xl" />
              </a>
              <a
                href={`mailto:${product?.Dealer?.email}`}
                className="bg-primary p-1 rounded-md border border-primary text-white"
              >
                <MailOpen />
              </a>
            </>
          ) : (
            <>
              <div
                onClick={() => handleCommunicationClick("call")}
                className="bg-[#29AF3E] px-3 py-1 rounded-md text-white font-semibold border border-[#29AF3E] cursor-pointer"
              >
                Call Now
              </div>
              <div
                onClick={() => handleCommunicationClick("whatsapp")}
                className="border border-[#C3C3C3] rounded-md p-px cursor-pointer"
              >
                <FaWhatsapp className="text-[#29AF3E] text-3xl" />
              </div>
              <div
                onClick={() => handleCommunicationClick("email")}
                className="bg-primary p-1 rounded-md border border-primary text-white cursor-pointer"
              >
                <MailOpen />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Login Dialog using ProgrammaticDialog */}
      <ProgrammaticDialog
        isOpen={isLoginDialogOpen}
        onClose={handleCloseDialog}
        width="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[35%] max-w-md"
        height="h-[95%] sm:h-[90%] md:h-[80%] lg:h-[70%] xl:h-[60%] max-h-[455px] sm:max-h-[500px] md:max-h-[650px]"
        closeOnBackdrop={true}
        showCloseButton={false}
      >
        {({ closeDialog }) => (
          <CustomerLoginForm
            closeDialog={closeDialog}
            setIsLogin={setIsLogin}
            onLoginSuccess={handleSuccessfulLogin}
          />
        )}
      </ProgrammaticDialog>

      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}
export default PopularSearches;
