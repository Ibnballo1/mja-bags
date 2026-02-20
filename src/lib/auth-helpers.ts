import { headers } from "next/headers";
import { auth } from "./auth";
import { db } from "..";
import { user } from "../db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function getServerSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });
  if (!userData || userData.role !== "admin") {
    redirect("/");
  }
  return session;
}

export async function getOptionalSession() {
  try {
    return await getServerSession();
  } catch {
    return null;
  }
}
