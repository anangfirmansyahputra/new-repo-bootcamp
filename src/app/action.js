// src/app/action.js

"use server";

import { db } from "@/lib/db";

export async function createArticle(data) {
  await db.article.create({
    data: {
      slug: data.title.replaceAll(" ", "-"),
      ...data,
    },
  });
}
