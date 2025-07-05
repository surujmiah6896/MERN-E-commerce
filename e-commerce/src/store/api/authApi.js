import axios from "axios";

//user register
export const userStore = async (formData) => {
    console.log("user register api call");
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      { withCredentials: true }
    );
  console.log(response);
  return response.json();
};


//user login
export const userLogin = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData,
    {
      withCredentials: true,
    }
  );
  console.log(response);
  return response.json();
}