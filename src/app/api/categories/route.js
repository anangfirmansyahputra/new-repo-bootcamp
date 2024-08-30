import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    console.log(decoded);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return new NextResponse("You are not permitted", { status: 403 });
    }

    const { name } = await req.json();

    const category = await db.category.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Your token is not valid", { status: 401 });
    } else {
      return new NextResponse("Internal server error", { status: 500 });
    }
  }
}

export async function GET(req) {
  const categories = await db.category.findMany();

  return NextResponse.json(categories);
}
