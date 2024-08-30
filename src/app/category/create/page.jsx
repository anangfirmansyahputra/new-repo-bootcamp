import Form from "@/app/category/_components/form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CreateCategoryPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Category" />
      <Form />
    </DefaultLayout>
  );
}
