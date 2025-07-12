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
import { addCategoryFormElements } from "../../config";
import CustomForm from "../../components/common/form";
import AdminCategoryView from "../../components/admin/categories";
import { useDispatch } from "react-redux";
import { editAdminCategories, getAllAdminCategories } from "../../store/admin/category-slice";
import useShowToast from "../../hooks/useShowToast";

const initialFormData = {
  name: "",
};

function AdminCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const Toast = useShowToast();

  console.log("currentEditedId", currentEditedId);
  

  const handleAddNewCategory = () => {
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };

  console.log("setFormData", formData);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (currentEditedId !== null) {
        categoryEdit();
    } else {
        categoryAdd();
    }
  };

  const categoryEdit = async() =>{
    console.log("setFormData", formData);
    
    try {
          const data = await dispatch(
            editAdminCategories({
              id: currentEditedId,
              data: formData,
            })
          ).unwrap();
          console.log("category edit dispatch", data);
    
          if (data?.status) {
            dispatch(getAllAdminCategories());
            onClose();
            setFormData(initialFormData);
            Toast("Success", "Category Update Successfully", "success");
          }
        } catch (error) {
          console.error("Category Error:", error);
          const errorMsg =
            error?.message || "Something went wrong";
          Toast("Error", errorMsg, "error");
        }
    
  } 
  
  const categoryAdd = () => {
    console.log("category add", formData);
  };
  return (
    <Fragment>
      {/* Add Product Button */}
      <Flex mb={5} justify="flex-end" w="full">
        <Button colorScheme="blue" onClick={handleAddNewCategory}>
          Add New Category
        </Button>
      </Flex>

      <AdminCategoryView
        setCurrentEditedId={setCurrentEditedId}
        setFormData={setFormData}
        onOpen={onOpen}
      />

      {/* Drawer (Chakra's alternative to Sheet) */}
      <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="sm">
        <DrawerOverlay />
        <DrawerContent overflowY="auto">
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading size="md">
              {currentEditedId !== null ? "Edit Category" : "Add New Category"}
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            {/* <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              isEditMode={currentEditedId !== null}
            /> */}
            <Box py={6}>
              {/* Form content goes here */}
              <CustomForm
                onSubmit={onSubmit}
                setFormData={setFormData}
                formData={formData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                //   isBtnDisabled={!isFormValida()}
                formControls={addCategoryFormElements}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default AdminCategory;
