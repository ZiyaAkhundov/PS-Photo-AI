import Header from "@/components/Header/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/Transformation/TransformationForm";

const AddTransformationTypePage = ({ params: { type } }: SearchParamProps) => {
  const transformations = transformationTypes[type];

  return (
    <>
      <Header
        title={transformations.title}
        subtitle={transformations.subTitle}
      />

      <TransformationForm />
    </>
  );
};

export default AddTransformationTypePage;
