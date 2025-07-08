import { Box, Button, Image, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ProductImageUpload from "../../components/admin/image-upload";
import { useDispatch } from "react-redux";

function FeatureImageUploader() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const handleUploadFeatureImage = async()=>{
      console.log({ image: imageFile });
      
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
              <Image
                src=""
                alt={`feature-id`}
                width="100%"
                height="300px"
                objectFit="cover"
                borderTopRadius="lg"
              />
            </Box>
      </VStack>
    </Box>
  );
}

export default FeatureImageUploader;
