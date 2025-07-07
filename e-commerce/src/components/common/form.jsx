import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack } from "@chakra-ui/react";

function CustomForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>{
              console.log("select value", value)
              
            return  setFormData({
                ...formData,
                [getControlItem.name]: value,
              })}
            }
            value={value}
          >
            {/* <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger> */}
            {/* <SelectContent> */}
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <option key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </option>
                  ))
                : null}
            {/* </SelectContent> */}
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }
  return (
    <Box as="form" onSubmit={onSubmit}>
      <VStack spacing={3} align="stretch" mb={5}>
        {formControls.map((controlItem) => (
          <FormControl key={controlItem.name}>
            <FormLabel mb={1}>{controlItem.label}</FormLabel>
            {renderInputsByComponentType(controlItem)}
          </FormControl>
        ))}
      </VStack>

      <Button
        mt={2}
        w="full"
        type="submit"
        isDisabled={isBtnDisabled}
        colorScheme="teal" // You can change this to fit your theme
      >
        {buttonText || "Submit"}
      </Button>
    </Box>
  );
}

export default CustomForm;
