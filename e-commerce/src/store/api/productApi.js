import axios from "axios";

export const addProduct = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/admin/products/add",
    formData,
    { 
        headers: { 
            "Content-Type": "application/json" 
        }
    }
  );
  return response;
};
