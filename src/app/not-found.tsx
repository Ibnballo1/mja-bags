import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl font-bold text-olive-200 mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-[#1E1E1E] mb-3">
          Page Not Found
        </h1>
        <p className="text-[#6B7280] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/shop">Browse Shop</Link>
          </Button>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
