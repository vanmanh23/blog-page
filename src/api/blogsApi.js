import axios from "axios";

export const getBlogs = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/blog`);
    return res.data.status;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

