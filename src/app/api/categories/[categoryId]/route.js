import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function DELETE(req, { params }) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", {
        status: 404,
      });
    }

    await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({ data: null, success: true }, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", {
        status: 404,
      });
    }

    const body = await req.json();

    const updatedCategory = await db.category.update({
      where: {
        id: params.categoryId,
      },
      data: body,
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
