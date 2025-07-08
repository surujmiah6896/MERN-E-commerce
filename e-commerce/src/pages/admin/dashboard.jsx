import { Box, Button, Flex, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages } from "../../store/feature-slice";
import useShowToast from "../../hooks/useShowToast";

function FeatureImageUploader() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const Toast = useShowToast();
  const dispatch = useDispatch();
  const { featureImages } = useSelector((state) => state.feature);


  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log("featureImages",featureImages);
  
  
  const handleUploadFeatureImage = async()=>{
    const formData = new FormData();
    formData.append("image", imageFile);
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
    <Box >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="100%" // Make sure it spans the full container
        mt={8} // Optional: add vertical margin
      >
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
          width="300px" // ✅ smaller width for better centering
          colorScheme="blue"
        >
          Upload
        </Button>
      </Flex>

      <SimpleGrid columns={[2, null, 3]} spacing={5} mt={5}>
        {featureImages?.length > 0 &&
          featureImages.map((featureImageItem) => (
            <Box
              key={featureImageItem._id}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ boxShadow: "md" }}
            >
              <Image
                src={`http://localhost:5000/uploads/features/${featureImageItem.image}`}
                alt={`feature-${featureImageItem._id}`}
                height="150px"
                width="100%"
                objectFit="cover"
              />
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
}

export default FeatureImageUploader;
