import React, { useEffect, useState } from "react";
import { fetchVisitingCardsList } from "../../../Redux/Features/visitingCardSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectVisitingCard_Card from "../../Components/Visiting Card/SelectVisitingCard_Card";
import Loader from "../../../ui/Loader";
import Snackbars from "../../../ui/Snackbars";

const SelectVIsitingCard = () => {
  const dispatch = useDispatch();
  const { currentDealer, isPaymentDoneForVisitingCard } = useSelector(
    (state) => state.dealers
  );
  const { visitingCardsList, status } = useSelector(
    (state) => state.visitingCards
  );
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVisitingCardsList());
    }
  }, [dispatch, status]);

  console.log("visitingCardsList", visitingCardsList);

  return (
    <>
      <div className="w-[90%] mx-auto">
        <h1 className="text-2xl font-bold my-4">Select Visiting Card</h1>
        <div className="">
          {status === "loading" ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : visitingCardsList && visitingCardsList.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {visitingCardsList.map((card) => (
                <SelectVisitingCard_Card
                  dealerId={currentDealer?.id}
                  isPaymentDoneForVisitingCard={isPaymentDoneForVisitingCard}
                  key={card.id}
                  name={card.name}
                  price={card.price}
                  setSnackbar={setSnackbar}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">No data found</p>
          )}
        </div>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default SelectVIsitingCard;
