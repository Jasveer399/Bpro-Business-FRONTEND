const storeDealerAccessToken = (token) => {
  localStorage.setItem("dealerAccessToken", token);
};
const removeDealerAccessToken = () => {
  localStorage.removeItem("dealerAccessToken");
};
const getDealerAccessToken = () => localStorage.getItem("dealerAccessToken");


export { storeDealerAccessToken, removeDealerAccessToken, getDealerAccessToken };
