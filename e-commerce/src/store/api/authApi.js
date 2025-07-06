import axios from "axios";

//user register
export const userStore = async (formData) => {
  console.log("user register api call", formData);
  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    formData,
    { withCredentials: true }
  );
  console.log("res api", response);
  return response;
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
  return response;
};

//user logout
export const userLogout = async () => {
  const response = await axios.post("http://localhost:5000/api/auth/logout", {
    withCredentials: true,
  });
  console.log(response);
  return response;
};

// user auth check
export const userAuthCheck = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
};
