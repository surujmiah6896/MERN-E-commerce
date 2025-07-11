import {
  Box,
  Input,
  Text,
  FormLabel,
  VStack,
  Skeleton,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { UploadCloud, FileIcon, X } from "lucide-react"; // Replace with Chakra icons if preferred
import { useRef } from "react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  // imageLoadingState,
  // uploadedImageUrl,
  // setUploadedImageUrl,
  // setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) => {
    const inputRef = useRef(null);
    const uploadColor = useColorModeValue("#718096", "#A0AEC0");

    //upload image
    const handleImageFileChange = (e)=>{
        console.log("file change", e.target.files);
        const selectedFile = e.target.files?.[0];
        if(selectedFile){
          setImageFile(selectedFile);
        }
    }

    //image remove
    const handleRemoveImage = ()=> {
      setImageFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }

    const handleDragOver = (event) => {
      event.preventDefault();
    }

    const handleDrop = (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files?.[0];
      if(droppedFile) setImageFile(droppedFile);
    }

  return (
    <Box
      w="full"
      mt={4}
      maxW={isCustomStyling ? "none" : "md"}
      mx={isCustomStyling ? "0" : "auto"}
    >
      <FormLabel
        fontSize="lg"
        color={"blackAlpha.500"}
        p={2}
        fontWeight="semibold"
        mb={2}
      >
        Upload Image
      </FormLabel>
      <Box
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        borderWidth="2px"
        borderStyle="dashed"
        borderRadius="lg"
        p={4}
        border={"2px"}
        borderColor={"blackAlpha.300"}
        opacity={isEditMode ? 0.6 : 1}
      >
        <Input
          id="image-upload"
          type="file"
          hidden
          ref={inputRef}
          onChange={handleImageFileChange}
          isDisabled={isEditMode}
        />

        {!imageFile ? (
          <FormLabel
            htmlFor="image-upload"
            cursor={isEditMode ? "not-allowed" : "pointer"}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            h="8rem"
          >
            <UploadCloud size={40} color={uploadColor} />
            <Text mt={2}>Drag & drop or click to upload image</Text>
          </FormLabel>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <FileIcon size={32} className="mr-2" />
              <Text fontSize="sm" fontWeight="medium">
                {imageFile.name}
              </Text>
            </Box>
            <IconButton
              aria-label="Remove File"
              icon={<X size={16} />}
              variant="ghost"
              colorScheme="gray"
              onClick={handleRemoveImage}
              size="sm"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductImageUpload;
