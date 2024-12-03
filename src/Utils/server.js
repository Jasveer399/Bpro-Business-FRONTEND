export const server = "http://localhost:3000"
// export const server = "https://bpro-business-backend.onrender.com"

//  ALl Dealers Route
export const createDealerAccount = `${server}/api/v1/dealer/createDealerAccount`;
export const updateDealerAccount = `${server}/api/v1/dealer/updateDealerAccount`;
export const getAllDealers = `${server}/api/v1/dealer/getAllDealers`;
export const deleteDealer = `${server}/api/v1/dealer/deleteDealer`;
export const getCurrentDealer = `${server}/api/v1/dealer/getCurrentDealer`;
export const dealerLogin = `${server}/api/v1/dealer/dealerLogin`;
export const changePassword = `${server}/api/v1/dealer/changePassword`;
export const approveDealer = `${server}/api/v1/dealer/approveDealer`;

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

// All Blogs Route
export const createBlogs = `${server}/api/v1/blogs/createBlogs`;
export const getAllBlogs = `${server}/api/v1/blogs/getAllBlogs`;
export const getSingleBlog = `${server}/api/v1/blogs/getSingleBlog`;

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

