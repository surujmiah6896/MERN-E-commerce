import axios from "axios";

export const addProduct = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/admin/products/add",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getProducts = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/products/all"
  );
  console.log("response",response);
  
  return response;
};
