import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgrammaticDialog from "../../ui/ProgrammaticDialog";
import AddTestimonialsForm from "./AddTestimonialsForm";
import {
  fetchTestimonialsAsync,
  deleteTestimonialAsync,
  selectTestimonials,
  selectTestimonialsStatus,
  selectDeleteStatus,
  selectTestimonialsError,
  toggleSelectedTestimonial,
} from "../../Redux/Features/testimonialsSlice";
import UpdateTestimonialsForm from "./UpdateTestimonialsForm";
import { selectCurrentDealer } from "../../Redux/Features/dealersSlice";

function Testimonials() {
  const dispatch = useDispatch();
  const [isAddTestimonialsFormDialogOpen, setIsAddTestimonialsFormDialogOpen] =
    useState(false);
  const [
    isUpdateTestimonialsFormDialogOpen,
    setIsUpdateTestimonialsFormDialogOpen,
  ] = useState(false);

  const [selectedTestimonialId, setSelectedTestimonialId] = useState(null);
  const currentDealer = useSelector(selectCurrentDealer);

  // Row selection state
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Redux selectors
  const testimonials = useSelector(selectTestimonials);
  const status = useSelector(selectTestimonialsStatus);
  const deleteStatus = useSelector(selectDeleteStatus);
  const error = useSelector(selectTestimonialsError);

  // Fetch testimonials on component mount
  useEffect(() => {
    dispatch(
      fetchTestimonialsAsync({
        dealerId: currentDealer?.id || "",
      })
    );
  }, [dispatch, currentDealer]);

  // Handle individual row selection
  const handleRowSelect = (testimonialId) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(testimonialId)) {
      newSelectedRows.delete(testimonialId);
    } else {
      newSelectedRows.add(testimonialId);
    }
    setSelectedRows(newSelectedRows);
    dispatch(toggleSelectedTestimonial(testimonialId));
  };

  const handleRemove = async (id) => {
    try {
      await dispatch(deleteTestimonialAsync(id)).unwrap();
      // Remove from selected rows if it was selected
      const newSelectedRows = new Set(selectedRows);
      newSelectedRows.delete(id);
      setSelectedRows(newSelectedRows);
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const handleCloseDialog = () => {
    setIsAddTestimonialsFormDialogOpen(false);
    setIsUpdateTestimonialsFormDialogOpen(false);
    setSelectedTestimonialId(null);
  };

  const handleUpdate = (id) => {
    setSelectedTestimonialId(id);
    setIsUpdateTestimonialsFormDialogOpen(true);
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="mb-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (status === "failed") {
    return (
      <div className="mb-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">
            Error loading testimonials: {error?.message || error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Testimonials ({testimonials?.length || 0})
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsAddTestimonialsFormDialogOpen(true)}
            className="bg-secondary hover:bg-secondary/90 font-semibold text-primary px-6 py-2 rounded-md transition-colors"
          >
            Add More
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        {/* Header Row */}
        <div className="bg-primary text-white grid grid-cols-12 gap-4 px-6 py-4 font-semibold text-sm">
          <div className="col-span-2 flex items-center gap-2">SELECT ALL</div>
          <div className="col-span-2">NAME</div>
          <div className="col-span-2">DESIGNATION</div>
          <div className="col-span-3">CONTENT</div>
          <div className="col-span-3 text-center">ACTION</div>
        </div>

        {/* Data Rows */}
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center transition-colors ${
                selectedRows.has(testimonial.id)
                  ? "bg-blue-50 border-blue-200"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* Selection Column */}
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRows.has(testimonial.id)}
                  onChange={() => handleRowSelect(testimonial.id)}
                  className="form-checkbox h-4 w-4 text-primary focus:ring-primary"
                />
              </div>

              {/* Name Column */}
              <div className="col-span-2 flex items-center gap-3">
                <img
                  src={testimonial.clientPhoto}
                  alt={testimonial.clientPhoto || testimonial.name || "Client"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-900 font-medium">
                  {testimonial.clientName || testimonial.name || "N/A"}
                </span>
              </div>

              {/* Designation Column */}
              <div className="col-span-2">
                <span className="text-gray-600">
                  {testimonial.designation || "N/A"}
                </span>
              </div>

              {/* Content Column */}
              <div className="col-span-3">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {testimonial.testimonialsText ||
                    testimonial.content ||
                    "No content available"}
                </p>
              </div>

              {/* Action Column */}
              <div className="col-span-3 flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => handleUpdate(testimonial.id)}
                  className="bg-[#49B27A] hover:bg-[#32a568] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Modify
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(testimonial.id)}
                  disabled={deleteStatus === "loading"}
                  className="bg-[#FE043C] hover:bg-[#c7173d] text-white px-4 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {deleteStatus === "loading" ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            No testimonials found. Click "Add More" to create your first
            testimonial.
          </div>
        )}
      </div>

      <ProgrammaticDialog
        isOpen={isAddTestimonialsFormDialogOpen}
        onClose={handleCloseDialog}
        width="w-[35%]"
        height="h-[98%]"
        closeOnBackdrop={false}
        showCloseButton={false}
        rounded="rounded-[10px]"
      >
        {({ closeDialog }) => <AddTestimonialsForm closeDialog={closeDialog} />}
      </ProgrammaticDialog>

      <ProgrammaticDialog
        isOpen={isUpdateTestimonialsFormDialogOpen}
        onClose={handleCloseDialog}
        width="w-[35%]"
        height="h-[98%]"
        closeOnBackdrop={false}
        showCloseButton={false}
        rounded="rounded-[10px]"
      >
        {({ closeDialog }) => (
          <UpdateTestimonialsForm
            testimonialId={selectedTestimonialId}
            closeDialog={closeDialog}
          />
        )}
      </ProgrammaticDialog>
    </div>
  );
}

export default Testimonials;
