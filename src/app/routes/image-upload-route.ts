import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/src/lib/auth-helpers";
import { db } from "@/src";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { uploadProductImage } from "@/src/lib/supabase-client";

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!userData || userData.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const productId = formData.get("productId");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!productId || typeof productId !== "string") {
    return NextResponse.json(
      { error: "No productId provided" },
      { status: 400 },
    );
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "File must be JPEG, PNG, WebP, or AVIF" },
      { status: 400 },
    );
  }

  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File size must be under 10MB" },
      { status: 400 },
    );
  }

  try {
    const url = await uploadProductImage(file, productId);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
