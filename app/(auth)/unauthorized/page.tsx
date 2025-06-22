"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Wait for session

    const role = session?.user?.role;

    if (role === "ADMIN") router.replace("/admin");
    else if (role === "CUSTOMER_EXPERIENCE") router.replace("/staff");
    else router.replace("/user/dashboard");
  }, [session, status, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg font-medium">Redirecting...</p>
    </div>
  );
}
