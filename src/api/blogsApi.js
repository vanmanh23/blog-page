import axios from "axios";

export const getBlogs = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/blog`);
    return res.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const deleteBlogById = async (id) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_APP_SERVER_URL}/blog/remove/${id}`
    );
    return res.data.status;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
export const editBlogById = async (id, data) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_SERVER_URL}/blog/edit/${id}`,
      data
    );
    return res.data.status;
  } catch (error) {
    console.error("Error editing blog:", error);
    throw error;
  }
};

export const updateBlogById = async (id, data) => {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_APP_SERVER_URL}/blog/update/${id}`,
      data
    )
    return res.data.status
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

export const createBlog = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_APP_SERVER_URL}/blog/create`,
      data
    );
    return res.data.status;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_SERVER_URL}/blog/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};
