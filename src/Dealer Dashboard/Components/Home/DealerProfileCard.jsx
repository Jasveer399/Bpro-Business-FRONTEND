import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchDealersAsync } from "../../../Redux/Features/dealersSlice";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "../../../Utils/Helper";
import Snackbars from "../../../ui/Snackbars";
import axios from "axios";
import { viewDealerProfile } from "../../../Utils/server";
import Dialog from "../../../ui/Dialog";
import CustomerLoginForm from "../Forms/Auth/CustomerLoginForm";

function DealerProfileCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dealers, fetchStatus } = useSelector((state) => state.dealers);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [selectedDealerId, setSelectedDealerId] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [dialogTrigger, setDialogTrigger] = useState(false);

  useDialogTrigger(dialogTrigger);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchDealersAsync());
    }
  }, [fetchStatus, dispatch]);

  const handleOnclick = async (id) => {
    if (getUserToken()) {
      // If user is logged in, proceed as before
      navigate(`/dealerProfile/${id}`);
      const res = await axios.post(
        `${viewDealerProfile}/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
    } else {
      // If user is not logged in, save the dealer ID and trigger the dialog
      setSelectedDealerId(id);
      // This will trigger the dialog to open
      setDialogTrigger((prev) => !prev);
    }
  };

  // Function to handle after successful login
  const handleSuccessfulLogin = () => {
    // If we have a selected dealer ID, navigate to their profile
    if (selectedDealerId) {
      navigate(`/dealerProfile/${selectedDealerId}`);

      // Make the API call to view the dealer profile
      axios.post(
        `${viewDealerProfile}/${selectedDealerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );

      // Reset selected dealer ID
      setSelectedDealerId(null);
    }
  };

  return (
    <div className="w-full">
      {dealers && dealers.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={6}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
        >
          {dealers?.map((dealer) => (
            <SwiperSlide
              key={dealer.id}
              onClick={() => handleOnclick(dealer.id)}
            >
              <div className="flex flex-col items-center h-60 p-3 border cursor-pointer">
                <img
                  src={dealer.profileUrl || "/dummy-profile.png"}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                />
                <h1 className="font-[600] text-lg">{dealer.fullName}</h1>
                <h1 className="text-sm text-gray-600">
                  {dealer?.Category?.title}
                </h1>
                <h1 className="text-sm">
                  {dealer.state}, {dealer.country}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full flex items-center justify-center">
          <h1 className="text-2xl font-semibold">No Dealers Found</h1>
        </div>
      )}

      {/* Login Dialog with a hidden button that we click programmatically */}
      <Dialog
        trigger={
          // This invisible button serves as the required trigger element
          <button id="hidden-login-dialog-trigger" style={{ display: "none" }}>
            Login
          </button>
        }
        width="w-[35%]"
        height="h-[55%]"
      >
        {({ closeDialog }) => (
          <CustomerLoginForm
            closeDialog={closeDialog}
            setIsLogin={setIsLogin}
            onLoginSuccess={handleSuccessfulLogin}
          />
        )}
      </Dialog>

      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
}

// Effect to programmatically click the hidden button when dialogTrigger changes
export function useDialogTrigger(dialogTrigger) {
  useEffect(() => {
    // Find the hidden button and click it to open the dialog
    const hiddenButton = document.getElementById("hidden-login-dialog-trigger");
    if (hiddenButton) {
      hiddenButton.click();
    }
  }, [dialogTrigger]);
}

export default DealerProfileCard;
