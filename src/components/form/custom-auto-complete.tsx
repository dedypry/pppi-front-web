import { Autocomplete, AutocompleteProps } from "@heroui/react";

export default function CustomAutoComplete({ ...props }: AutocompleteProps) {
  return (
    <Autocomplete
      color="primary"
      inputProps={{
        classNames: {
          label: "text-gray-800",
        },
      }}
      labelPlacement="outside"
      variant="bordered"
      {...props}
    />
  );
}
