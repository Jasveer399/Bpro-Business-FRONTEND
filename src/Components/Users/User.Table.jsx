import React, { useEffect, useState } from "react";
import { PencilIcon, Trash2 } from "lucide-react";
import Dialog from "../../ui/Dialog";
import Loader from "../../ui/Loader";
import Snackbars from "../../ui/Snackbars";
import ConfirmationDialog from "../../ui/ConfirmationDialog";
import axios from "axios";
import { server } from "../../Utils/server";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/api/v1/admin/userData`, {
          withCredentials: true,
        });

        if (response.data && response.data.data) {
          setUsers(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
        setSnackbar({
          open: true,
          type: "error",
          text: "Failed to fetch user data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      // Replace with your actual delete API endpoint
      await axios.delete(`${server}/api/v1/admin/user/${id}`, {
        withCredentials: true,
      });

      // Remove user from local state
      setUsers(users.filter((user) => user.id !== id));

      setSnackbar({
        open: true,
        type: "success",
        text: "User Deleted Successfully",
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      setSnackbar({
        open: true,
        type: "error",
        text: "Failed to delete user",
      });
    } finally {
      setTimeout(() => {
        setIsDeleteDialogOpen(false);
      }, 500);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mx-3 dark:bg-darkgrey overflow-hidden h-[33rem] overflow-y-auto">
      <div className="overflow-x-auto">
        <table className="w-full h-full">
          <thead>
            <tr className="text-base text-white uppercase bg-blue border">
              <th className="py-5 px-3">Name</th>
              <th className="py-5 px-3">User ID</th>
              <th className="py-5 px-3">Mobile No.</th>
              <th className="py-5 px-3">Location</th>
              <th className="py-5 px-3">OTP Verified</th>
              <th className="py-5 px-3">Profile Complete</th>
              <th className="py-5 px-3">Created At</th>
              {/* <th className="py-5 px-3">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex items-center justify-center my-5">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border border-[rgba(0, 0, 0, 0.06)] text-[#565656] dark:text-lightPrimary"
                >
                  <td className="py-5 text-center">{user.name || "N/A"}</td>
                  <td className="py-5 text-center">
                    {user.id ? user.id.substring(0, 8) + "..." : "N/A"}
                  </td>
                  <td className="py-5 text-center">{user.mobileNo || "N/A"}</td>
                  <td className="py-5 text-center">{user.location || "N/A"}</td>
                  <td className="py-5 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isOTPVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isOTPVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="py-5 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.isUserFillAllDetails
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.isUserFillAllDetails ? "Complete" : "Incomplete"}
                    </span>
                  </td>
                  <td className="py-5 text-center">
                    {formatDate(user.created_at)}
                  </td>
                  {/* <td className="py-5">
                    <div className="flex justify-center gap-3">
                      <Dialog
                        trigger={
                          <button
                            className="flex justify-center items-center gap-1 font-semibold text-white bg-[#49B27A] py-2 px-3 text-sm rounded-md"
                            onClick={() => setSelectedUser(user)}
                          >
                            <PencilIcon size={14} />
                            <h1>Edit</h1>
                          </button>
                        }
                        width="w-[40%]"
                        height="h-[60%]"
                      >
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-4">
                            Edit User
                          </h3>
                          <p>Edit form for user: {selectedUser?.name}</p>
                        </div>
                      </Dialog>
                      <button
                        className="flex justify-center items-center gap-1 font-semibold text-white bg-[#FE043C] py-2 px-3 text-sm rounded-md"
                        onClick={() => {
                          setIsDeleteDialogOpen(true);
                          setUserId(user.id);
                        }}
                      >
                        <Trash2 size={14} />
                        <h1>Delete</h1>
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-5 font-[600]">
                  {error || "No Users Available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
      {/* <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteHandler(userId);
        }}
        title="Confirm Action"
        message="Are you sure you want to delete this user?"
        isLoading={loading}
      /> */}
    </div>
  );
};

export default UserTable;
