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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import { addCategoryFormElements } from "../../config";
import CustomForm from "../../components/common/form";
import AdminCategoryView from "../../components/admin/categories";
import { useDispatch } from "react-redux";
import { createAdminCategories, deleteAdminCategories, editAdminCategories, getAllAdminCategories } from "../../store/admin/category-slice";
import useShowToast from "../../hooks/useShowToast";
import { useRef } from "react";

const initialFormData = {
  name: "",
  isActive: "",
};

function AdminCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [categoryDeletedId, setCategoryDeletedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
    const cancelRef = useRef();
   const {
     isOpen: isDeleteOpen,
     onOpen: onDeleteOpen,
     onClose: onDeleteClose,
   } = useDisclosure();
  const dispatch = useDispatch();
  const Toast = useShowToast();

  const handleAddNewCategory = () => {
    onOpen();
  };
  const handleClose = () => {
    onClose();
  };

  console.log("categoryDeletedId", categoryDeletedId);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (currentEditedId !== null) {
        categoryEdit();
    } else {
        categoryAdd();
    }
  };

  const categoryEdit = async() =>{
    try {
          const data = await dispatch(
            editAdminCategories({
              id: currentEditedId,
              data: formData,
            })
          ).unwrap();
    
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
  
  const categoryAdd = async () => {
     try {
          const data = await dispatch(
            createAdminCategories(formData)
          ).unwrap();
          if(data?.status){
            dispatch(getAllAdminCategories());
            onClose();
            setFormData(initialFormData);
            Toast("Success", "Category Add Successfully", "success");
          }
        } catch (error) {
          console.error("Add new Product Error:", error);
          const errorMsg =
            error?.message || error?.errors?.avatar?.msg || "Something went wrong";
          Toast("Error", errorMsg, "error");
        }
  };

  const handleCategoryDelete= async()=>{
     try {
       const data = await dispatch(
         deleteAdminCategories(categoryDeletedId)
       ).unwrap();
       if (data?.status) {
        //  dispatch(getAllAdminCategories());
         onDeleteClose();
         Toast("Success", "Category Delete Successfully", "success");
       }
     } catch (error) {
       console.error("delete category Error:", error);
       const errorMsg =
         error?.message || "Something went wrong";
       Toast("Error", errorMsg, "error");
     }
    
  }


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
        setCategoryDeletedId={setCategoryDeletedId}
        setFormData={setFormData}
        onDeleteOpen={onDeleteOpen}
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

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Category
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={handleCategoryDelete} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
}

export default AdminCategory;
