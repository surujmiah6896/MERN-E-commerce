import axios from 'axios'

export const userStore = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    formData,
    { withCredentials: true }
  );
  return response.json();
};