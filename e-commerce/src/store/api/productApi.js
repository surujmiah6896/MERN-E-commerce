import axios from "axios";


// product new add
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

//product edit
export const productEdit = async (id, data) => {
  const response = axios.put(
    `http://localhost:5000/api/admin/products/edit/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
}

//get all product
export const getProducts = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/products/all"
  );
  console.log("response",response);
  
  return response;
};

//delete product
export const productDelete = async(id)=>{
  const response = await axios.delete(
    `http://localhost:5000/api/admin/products/delete/${id}`
  );
  return response;
}
