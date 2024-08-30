import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Form from "@/app/article/_components/form";
import React from "react";

export default function ArticlePage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Article" />
      {/* <Form /> */}
    </DefaultLayout>
  );
}
