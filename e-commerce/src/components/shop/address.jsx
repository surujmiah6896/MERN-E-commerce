import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";// Adjust path
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();

  const { user } = useSelector((state) => state.auth);
//   const { addressList } = useSelector((state) => state.shopAddress);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllAddresses(user.id));
    }
  }, [dispatch, user?.id]);

  const isFormValid = () =>
    Object.values(formData).every((value) => value.trim() !== "");

  const handleManageAddress = (event) => {
    event.preventDefault();

    // if (addressList.length >= 3 && currentEditedId === null) {
    //   setFormData(initialAddressFormData);
    //   toast({
    //     title: "You can add max 3 addresses",
    //     status: "error",
    //     isClosable: true,
    //   });
    //   return;
    // }

    // if (currentEditedId !== null) {
    //   dispatch(
    //     editaAddress({
    //       userId: user?.id,
    //       addressId: currentEditedId,
    //       formData,
    //     })
    //   ).then((data) => {
    //     if (data?.payload?.success) {
    //       dispatch(fetchAllAddresses(user?.id));
    //       setCurrentEditedId(null);
    //       setFormData(initialAddressFormData);
    //       toast({
    //         title: "Address updated successfully",
    //         status: "success",
    //         isClosable: true,
    //       });
    //     }
    //   });
    // } else {
    //   dispatch(
    //     addNewAddress({
    //       ...formData,
    //       userId: user?.id,
    //     })
    //   ).then((data) => {
    //     if (data?.payload?.success) {
    //       dispatch(fetchAllAddresses(user?.id));
    //       setFormData(initialAddressFormData);
    //       toast({
    //         title: "Address added successfully",
    //         status: "success",
    //         isClosable: true,
    //       });
    //     }
    //   });
    // }
  };

  const handleDeleteAddress = (address) => {
    // dispatch(deleteAddress({ userId: user?.id, addressId: address._id })).then(
    //   (data) => {
    //     if (data?.payload?.success) {
    //       dispatch(fetchAllAddresses(user?.id));
    //       toast({
    //         title: "Address deleted successfully",
    //         status: "success",
    //         isClosable: true,
    //       });
    //     }
    //   }
    // );
  };

  const handleEditAddress = (address) => {
    setCurrentEditedId(address._id);
    setFormData({
      address: address.address || "",
      city: address.city || "",
      phone: address.phone || "",
      pincode: address.pincode || "",
      notes: address.notes || "",
    });
  };

  return (
    <Card variant="outline">
      <CardBody>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={6}>
            <AddressCard
              selectedId={selectedId}
              addressInfo=""
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
            />
        </SimpleGrid>

        <CardHeader px={0}>
          <Heading size="md">
            {currentEditedId !== null ? "Edit Address" : "Add New Address"}
          </Heading>
        </CardHeader>

        <Box mt={4}>
          <CustomForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Edit" : "Add"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </Box>
      </CardBody>
    </Card>
  );
}

export default Address;
