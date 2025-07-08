import { Box, Button, Image, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ProductImageUpload from "../../components/admin/image-upload";
import { useDispatch } from "react-redux";
import { addFeatureImage, getFeatureImages } from "../../store/feature-slice";
import useShowToast from "../../hooks/useShowToast";

function FeatureImageUploader() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const Toast = useShowToast();
  const dispatch = useDispatch();
  const handleUploadFeatureImage = async()=>{
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(imageFile);
    await dispatch(getFeatureImages());
    return
    try{
        const data = await dispatch(addFeatureImage(formData)).unwrap();
          if(data?.status){
            await dispatch(getFeatureImages());
              setImageFile(null);
              Toast("Success", "Feature Add Successfully", "success");
            }
       } catch (error) {
         console.error("Add new Feature Error:", error);
         const errorMsg =
           error?.message || error?.errors?.avatar?.msg || "Something went wrong";
         Toast("Error", errorMsg, "error");
       }
  }
  return (
    <Box>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />

      <Button
        onClick={handleUploadFeatureImage}
        mt={5}
        width="full"
        colorScheme="blue"
      >
        Upload
      </Button>

      <VStack spacing={4} mt={5} align="stretch">
            <Box  position="relative">
              {/* <Image
                src=""
                alt={`feature-id`}
                width="100%"
                height="300px"
                objectFit="cover"
                borderTopRadius="lg"
              /> */}
            </Box>
      </VStack>
    </Box>
  );
}

export default FeatureImageUploader;
