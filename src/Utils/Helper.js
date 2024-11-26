const storeAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

const getAccessToken = () => localStorage.getItem("accessToken");

export { storeAccessToken, removeAccessToken, getAccessToken };
