import React from "react";
import { Divide, Star } from "lucide-react";
import { Box, Typography, LinearProgress, Rating } from "@mui/material";
import Divider from "../../ui/divider";

const UsersRating = ({ overallRating, ratingCounts }) => {
  const totalRatings = ratingCounts.reduce((sum, count) => sum + count, 0);


  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white dark:bg-darkgrey shadow-lg dark:shadow-black border border-gray-200 dark:border-gray-600 rounded-2xl px-3 py-4 relative">
      <h2 className="text-lg font-semibold text-neutral-700 dark:text-lightPrimary mb-4 px-3">
        Users Rating
      </h2>
      <Divider className="mb-4" />
      <Box className="flex justify-between px3" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography className="text-colorText2 dark:text-colorText"  variant="h4" sx={{ mr: 2 }}>
          {overallRating.toFixed(1)}
          <Typography className="text-colorText2 dark:text-colorText" component="span" variant="body2">
            /5
          </Typography>
        </Typography>
        <Rating
          name="half-rating-read"
          defaultValue={overallRating}
          precision={0.5}
          readOnly
          sx={{ color: "gold" }}
        />
      </Box>
      {ratingCounts.map((count, index) => (
        <div key={5 - index} className="flex items-center px-3">
          <span className="w-6 text-lg text-colorText2 dark:text-colorText flex items-center">
            {5 - index} <Star size={20} className="text-yellow-400 fill-yellow-400"/>
          </span>
          <div className="flex-grow mx-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue h-full rounded-full"
              style={{ width: `${(count / totalRatings) * 100}%` }}
            ></div>
          </div>
          <span className="w-10 text-right text-sm text-colorText2 dark:text-colorText">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UsersRating;
