"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { authClient } from "@/src/lib/auth/client";
import { signUpSchema, type SignUpInput } from "@/src/lib/validation/schemas";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpInput) {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onError(ctx) {
            toast.error(ctx.error.message || "Registration failed");
          },
          onSuccess() {
            toast.success("Account created successfully!");
            router.push("/");
            router.refresh();
          },
        },
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="font-serif text-3xl font-bold text-olive-700"
          >
            MAJ<span className="text-gold-400">.</span>
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-[#1E1E1E] mt-6 mb-2">
            Create Account
          </h1>
          <p className="text-[#6B7280] text-sm">
            Join MAJ and discover premium bags
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card border border-cream-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                {...register("name")}
                className="mt-1.5"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="mt-1.5"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                className="mt-1.5"
                placeholder="+234..."
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
                className="mt-1.5"
                placeholder="Min. 8 characters"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <p className="text-xs text-[#6B7280] text-center">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-olive-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-olive-700">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-olive-700 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
