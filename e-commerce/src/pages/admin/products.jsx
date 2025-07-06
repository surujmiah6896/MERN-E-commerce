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
import { Fragment, useState } from "react";
import {addProductFormElements} from "../../config/index";
import CustomForm from "../../components/common/form";

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
const onSubmit = async(event)=> {
    event.preventDefault();
}

const AdminProducts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const handleClose = () => {
    onClose();
  };

  return (
    <Fragment>
      {/* Add Product Button */}
      <Flex mb={5} justify="flex-end" w="full">
        <Button colorScheme="blue" onClick={onOpen}>
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
        {/* Add product cards or components here */}
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
