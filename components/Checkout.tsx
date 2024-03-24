"use client";
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { createTransaction } from "@/lib/actions/transaction.action";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { transactionDefaultValues } from "@/constants";
import { Form } from "./ui/form";
import { TransactionFormField } from "./TransactionFormField";
import { Input } from "./ui/input";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const transactionFormSchema = z.object({
  creditcard_number: z.string().nonempty().min(16).max(16),
  exp_date: z.string().nonempty().min(5).max(5),
  cvv: z.string().nonempty().min(3).max(3),
});

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();
  const route = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCheckout = async (values: z.infer<typeof transactionFormSchema>) => {
    setIsSubmitting(true);
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
      createdAt: new Date(),
      creditCardNumber: values.creditcard_number,
      expDate: values.exp_date,
      cvv: values.cvv,
    };
    try {
      const response = await createTransaction(transaction);
      if (response.success) {
        toast({
          title: "Order placed!",
          description: `${response._doc.credits} added your account. You will redirect to profile page`,
          duration: 5000,
          className: "success-toast",
        });
        debounce(() => {
          route.push("/profile");
        }, 2500)();
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: transactionDefaultValues,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-full">
        <section>
          <Button
            type="submit"
            role="link"
            className="w-full rounded-full bg-gradient-to-r from-cyan-600 to-bondiBlue-600 bg-cover"
          >
            Buy Credit
          </Button>
        </section>
      </AlertDialogTrigger>

      <AlertDialogContent
        id="ziya"
        className="flex flex-col gap-10 max-h-dvh overflow-y-auto"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to buy {plan}?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-16-regular">
            This transaction is non-refundable if you buy
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onCheckout)}
              className="space-y-8"
            >
              <TransactionFormField
                control={form.control}
                name="creditcard_number"
                formLabel="Credit card number"
                className="w-full"
                render={({ field }) => (
                  <Input
                    {...field}
                    maxLength={16}
                    placeholder="****************"
                    className="input-field"
                  />
                )}
              />
              <TransactionFormField
                control={form.control}
                name="cvv"
                formLabel="CVV"
                className="w-1/2"
                render={({ field }) => (
                  <Input
                    {...field}
                    maxLength={3}
                    placeholder="***"
                    className="input-field"
                  />
                )}
              />
              <TransactionFormField
                control={form.control}
                name="exp_date"
                formLabel="EXP Date"
                className="w-1/2"
                render={({ field }) => (
                  <Input
                    {...field}
                    maxLength={5}
                    placeholder="**/**"
                    className="input-field"
                  />
                )}
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="submit-button capitalize"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Checkout"}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel className="border bg-red-500 text-white hover:bg-red-600">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Checkout;
