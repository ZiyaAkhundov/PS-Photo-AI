import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "./ui/form";

import { transactionFormSchema } from "./Checkout";

type CustomFieldProps = {
  control: Control<z.infer<typeof transactionFormSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof transactionFormSchema>;
  formLabel?: string;
  className?: string;
};

export const TransactionFormField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
