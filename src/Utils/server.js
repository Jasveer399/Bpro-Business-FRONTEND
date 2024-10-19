const server = "http://localhost:3000"

// ALl Banners Route
export const addBanner = `${server}/api/v1/banners/addBanner`
export const updateBanner = `${server}/api/v1/banners/updateBanner`
export const deleteBanner = `${server}/api/v1/banners/deleteBanner`

// ALl Categories Route
export const addCategory = `${server}/api/v1/categories/addCategory`
export const updateCategory = `${server}/api/v1/categories/updateCategory`
export const deleteCategory = `${server}/api/v1/categories/deleteCategory`


// All Blogs Route
export const createBlogs = `${server}/api/v1/blogs/createBlogs`
export const getAllBlogs = `${server}/api/v1/blogs/getAllBlogs`
export const getSingleBlog = `${server}/api/v1/blogs/getSingleBlog`

// export const updateBlog = `${server}/api/v1/blogs/updateBlog`