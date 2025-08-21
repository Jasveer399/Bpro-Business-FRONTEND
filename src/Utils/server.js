export const server = "http://localhost:3000";
// export const server = "https://api.bproindia.com";
// export const server = "https://bpro-business-backend.onrender.com";

// ALl Dashboard Route
export const getDashboardStats = `${server}/api/v1/dashboardStats`;

//  ALl Dealers Route
export const createDealerAccount = `${server}/api/v1/dealer/createDealerAccount`;
export const updateDealerAccount = `${server}/api/v1/dealer/updateDealerAccount`;
export const getAllDealers = `${server}/api/v1/dealer/getAllDealers`;
export const deleteDealer = `${server}/api/v1/dealer/deleteDealer`;
export const getCurrentDealer = `${server}/api/v1/dealer/getCurrentDealer`;
export const dealerLogin = `${server}/api/v1/dealer/dealerLogin`;
export const changePassword = `${server}/api/v1/dealer/changePassword`;
export const approveDealer = `${server}/api/v1/dealer/approveDealer`;
export const updateProfileImg = `${server}/api/v1/dealer/updateProfileImg`;
export const removeProfileImg = `${server}/api/v1/dealer/removeProfileImg`;
export const requestUpdateProfile = `${server}/api/v1/dealer/requestUpdateProfile`;
export const getAllUpdateApprovalRequests = `${server}/api/v1/dealer/getAllUpdateApprovalRequests`;
export const changeStatusUpdateProfile = `${server}/api/v1/dealer/changeStatusUpdateProfile`;
export const getSpecificDealer = `${server}/api/v1/dealer/getSpecificDealer`;
export const incrementWhatsappCount = `${server}/api/v1/dealer/incrementWhatsappCount`;
export const incrementCallCount = `${server}/api/v1/dealer/incrementCallCount`;
export const viewDealerProfile = `${server}/api/v1/dealer/viewDealerProfile`;
export const getPlanDaysLeft = `${server}/api/v1/dealer/getPlanDaysLeft`;

// ALl Banners Route
export const addBanner = `${server}/api/v1/banners/addBanner`;
export const updateBanner = `${server}/api/v1/banners/updateBanner`;
export const deleteBanner = `${server}/api/v1/banners/deleteBanner`;
export const getAllBanner = `${server}/api/v1/banners/getAllBanner`;
export const getAllBannerCategory = `${server}/api/v1/banners/getAllBannerCategory`;

// ALl Categories Route
export const addCategory = `${server}/api/v1/categories/addCategory`;
export const updateCategory = `${server}/api/v1/categories/updateCategory`;
export const deleteCategory = `${server}/api/v1/categories/deleteCategory`;
export const getSpecificCategory = `${server}/api/v1/categories/getSpecificCategory`;

// All Blogs Route
export const createBlogs = `${server}/api/v1/blogs/createBlogs`;
export const getAllBlogs = `${server}/api/v1/blogs/getAllBlogs`;
export const getSingleBlog = `${server}/api/v1/blogs/getSingleBlog`;
export const getFourLatestBlogs = `${server}/api/v1/blogs/getFourLatestBlogs`;

// export const updateBlog = `${server}/api/v1/blogs/updateBlog`

export const getAllCategories = `${server}/api/v1/categories/getAllCategories`;

// ALl Workers Routes
export const createWorkerAccount = `${server}/api/v1/worker/createWorkerAccount`;
export const updateWorker = `${server}/api/v1/worker/updateWorker`;
export const getAllWorkers = `${server}/api/v1/worker/getAllWorkers`;
export const deleteWorker = `${server}/api/v1/worker/deleteWorker`;
export const getWorkerIdAndName = `${server}/api/v1/worker/getWorkerIdAndName`;

//All Product Routes
export const createProduct = `${server}/api/v1/product/createProduct`;
export const getProducts = `${server}/api/v1/product/getProducts`;
export const editProduct = `${server}/api/v1/product/editProduct`;
export const deleteProduct = `${server}/api/v1/product/deleteProduct`;
export const getProductsStats = `${server}/api/v1/product/getProductsStats`;
export const getAllProducts = `${server}/api/v1/product/getAllProducts`;
export const viewProduct = `${server}/api/v1/product/viewProduct`;

//All BookMarks Routes
// export const getAllBookmarks = `${server}/api/v1/bookmarks/getAllBookmarks`;
export const getUserBookmarks = `${server}/api/v1/bookmark/getUserBookmarks`;
export const createBookmark = `${server}/api/v1/bookmark/createBookmark`;
export const deleteBookmark = `${server}/api/v1/bookmark/deleteBookmark`;

//All Reviews Routes
export const createReview = `${server}/api/v1/review/createReview`;
export const getSpecificProductReviews = `${server}/api/v1/review/getSpecificProductReviews`;

//ALl Plans Routes
export const createPlan = `${server}/api/v1/plan/createPlan`;
export const updatePlan = `${server}/api/v1/plan/updatePlan`;
export const deletePlan = `${server}/api/v1/plan/deletePlan`;
export const getAllPlans = `${server}/api/v1/plan/getAllPlans`;

//All File Routes
export const uploadFileEndPoint = `${server}/upload`;
export const deleteFileEndPoint = `${server}/upload`;

//All Customer Routes
export const createCustomerAndGetOTP = `${server}/api/v1/customer/createCustomerAndGetOTP`;
export const verifyOtp = `${server}/api/v1/customer/verifyOTP`;
export const completeProfile = `${server}/api/v1/customer/completeProfile`;

//All Visiting Card Routes
export const createTestimonialsUrl = `${server}/api/v1/visitingcard/create-testimonials`;
export const getTestimonialsUrl = `${server}/api/v1/visitingcard/get-testimonials`;
export const updateTestimonialsUrl = `${server}/api/v1/visitingcard/update-testimonials`;
export const deleteTestimonialsUrl = `${server}/api/v1/visitingcard/delete-testimonials`;
export const createVisitingCard = `${server}/api/v1/visitingcard/create-visiting-card`;
export const updateVisitingCard = `${server}/api/v1/visitingcard/update-visiting-card`;
export const getVisitingCard = `${server}/api/v1/visitingcard/get-visiting-card`;
export const deleteVisitingCard = `${server}/api/v1/visitingcard/delete-visiting-card`;
export const createVisitingCardPriceAPI = `${server}/api/v1/visitingcard/create`;
export const fetchVisitingCardsListAPI = `${server}/api/v1/visitingcard/fetch`;
export const updateVisitingCardsListAPI = `${server}/api/v1/visitingcard/update`;
export const deleteVisitingCardsListAPI = `${server}/api/v1/visitingcard/delete`;
export const sendMail = `${server}/api/v1/visitingcard/send-mail`;
