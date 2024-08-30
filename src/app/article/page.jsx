import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import React from "react";

export default function ArticlePage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Article" />
    </DefaultLayout>
  );
}
