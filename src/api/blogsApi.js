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
    const res = await axios.delete(`${import.meta.env.VITE_APP_SERVER_URL}/blog/remove/${id}`);
    return res.data.status;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
