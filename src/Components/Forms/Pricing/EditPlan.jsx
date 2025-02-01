import React, { useEffect, useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../ui/Loader";
import Snackbars from "../../../ui/Snackbars";
import { updatePlanAsync } from "../../../Redux/Features/PlansSlice";
import SelectInput from "../../../ui/SelectInput";
import { planDurations } from "../../../Utils/options";

function EditPlan({ closeDialog, plan }) {
  const dispatch = useDispatch();
  const { updateStatus } = useSelector((state) => state.plans);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      planFeatures: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "planFeatures",
  });

  useEffect(() => {
    if (plan) {
      setValue("planName", plan.planName);
      setValue("planPrice", plan.planPrice);
      setValue("planDuration", plan.planDuration);

      // Set the planFeatures directly using setValue instead of append
      if (plan.planFeatures && Array.isArray(plan.planFeatures)) {
        // Transform the features array into the required format
        const formattedFeatures = plan.planFeatures.map((feature) => ({
          value: feature,
        }));

        // Set all features at once
        setValue("planFeatures", formattedFeatures);
      }
    }
  }, [plan, setValue]);

  const editPlanHandler = async (data) => {
    // Transform the planFeatures from array of objects to array of strings
    const transformedData = {
      ...data,
      planFeatures: data.planFeatures.map((feature) => feature.value),
    };

    try {
      const response = await dispatch(
        updatePlanAsync({ id: plan.id, data: transformedData })
      ).unwrap();
      if (response.success) {
        setSnackbar({
          open: true,
          type: "success",
          text: response.message,
        });
        setTimeout(() => {
          closeDialog();
        }, 500);
      } else {
        setSnackbar({
          open: true,
          type: "error",
          text:
            response?.payload ||
            response?.error?.message ||
            "Error updating plan",
        });
      }
    } catch (error) {
      console.error("Failed to update plan:", error);
    }
  };

  return (
    <>
      <FormHeading title="Edit Plan" closeDialog={closeDialog} />
      <div>
        <form
          onSubmit={handleSubmit(editPlanHandler)}
          className="px-16 mt-4 space-y-4"
        >
          <FormInput
            label="Enter Plan Title"
            type="text"
            {...register("planName", {
              required: "Plan Title is required",
            })}
            error={errors.planName?.message}
            width="w-full"
          />
          <FormInput
            label="Enter Plan Price"
            type="number"
            {...register("planPrice", {
              required: "Plan Price is required",
            })}
            error={errors.planPrice?.message}
            width="w-full"
          />
          <div>
            <h1 className="text-sm ml-2 mb-px text-gray-600">Plan Duration</h1>
            <Controller
              name="planDuration"
              control={control}
              rules={{ required: "Plan Duration is required" }}
              render={({ field, fieldState: { error } }) => (
                <SelectInput
                  label="Select Plan Duration"
                  options={planDurations}
                  onChange={(option) => {
                    field.onChange(option.value);
                  }}
                  error={error?.message}
                  width="w-full"
                  value={field.value}
                />
              )}
            />
          </div>

          {fields.map((field, index) => (
            <div key={field.id}>
              <FormInput
                label={`Feature ${index + 1}`}
                type="text"
                {...register(`planFeatures.${index}.value`, {
                  required: "Field can't be empty",
                })}
                error={errors?.planFeatures?.[index]?.value?.message}
                width="w-full"
              />
              {fields.length > 1 && (
                <div className="flex items-center justify-between gap-3 mt-2">
                  <div
                    className="text-sm hover:underline font-semibold text-red-500 cursor-pointer"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center justify-end">
            <div
              className="text-sm hover:underline font-semibold text-blue cursor-pointer"
              onClick={() => append({ value: "" })}
            >
              Add More Feature
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold mb-4 text-white py-1">
              {updateStatus === "loading" ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default EditPlan;
