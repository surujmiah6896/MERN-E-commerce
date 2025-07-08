import {
  Box,
  Button,
  Grid,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import {addProductFormElements} from "../../config/index";
import CustomForm from "../../components/common/form";
import ProductImageUpload from "../../components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, getAllProducts } from "../../store/admin/product-slice";
import useShowToast from "../../hooks/useShowToast";
import AdminProductList from "../../components/admin/product-list";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};


const AdminProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  // const [imageLoadingState, setImageLoadingState] = useState(false);
  const { products}  = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const Toast = useShowToast();

  console.log("productList", products);
  

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if(currentEditedId !== null){
      productEdit();
    }else{
      productAdd();
    }
  };

  const productEdit = async () => {
    console.log("product edit");
    try {
      const data = await dispatch(editProduct(currentEditedId));
    } catch (error) {
      console.error("Add new Product Error:", error);
      const errorMsg =
        error?.message || error?.errors?.avatar?.msg || "Something went wrong";
      Toast("Error", errorMsg, "error");
    }

  }

  const productAdd = async () =>{
    try {
      const data = await dispatch(addNewProduct({ ...formData, image: imageFile })).unwrap();
      if(data?.status){
        dispatch(getAllProducts());
        onClose();
        setImageFile(null);
        setFormData(initialFormData);
        Toast("Success", "Product Add Successfully", "success");
      }
    } catch (error) {
      console.error("Add new Product Error:", error);
      const errorMsg =
        error?.message || error?.errors?.avatar?.msg || "Something went wrong";
      Toast("Error", errorMsg, "error");
    }
  }

  const handleDelete = async (product_id) => {
    try {
      const data = dispatch(deleteProduct(product_id)).unwrap();
      console.log("delete data", data);
      
      // if (data?.status) {
        dispatch(getAllProducts());
        Toast("Success", "Product Delete Successfully", "success");
      // }
    } catch (error) {
      console.error("Product delete Error:", error);
      const errorMsg =
        error?.message || error?.errors?.avatar?.msg || "Something went wrong";
      Toast("Error", errorMsg, "error");
    }
  }

  const handleAddNewProduct = () => {
    setCurrentEditedId(null);
    setImageFile(null);
    setFormData(initialFormData);
    onOpen(true);
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {/* Add Product Button */}
      <Flex mb={5} justify="flex-end" w="full">
        <Button colorScheme="blue" onClick={handleAddNewProduct}>
          Add New Product
        </Button>
      </Flex>

      {/* Product Grid Placeholder */}
      <Grid
        gap={4}
        templateColumns={{
          base: "1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
      >
        {products && products.length > 0
          ? products.map((productItem) => (
              <AdminProductList
                key={productItem._id}
                setFormData={setFormData}
                onOpen={onOpen}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </Grid>

      {/* Drawer (Chakra's alternative to Sheet) */}
      <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="md">
        <DrawerOverlay />
        <DrawerContent overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              isEditMode={currentEditedId !== null}
            />
            <Box py={6}>
              {/* Form content goes here */}
              <CustomForm
                onSubmit={onSubmit}
                setFormData={setFormData}
                formData={formData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                //   isBtnDisabled={!isFormValida()}
                formControls={addProductFormElements}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
};

export default AdminProducts;
