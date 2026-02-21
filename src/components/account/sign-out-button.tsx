"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { authClient } from "@/src/lib/auth/client";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess() {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch {
      toast.error("Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 -mx-2"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <LogOut className="h-4 w-4 mr-2" />
      )}
      Sign Out
    </Button>
  );
}
