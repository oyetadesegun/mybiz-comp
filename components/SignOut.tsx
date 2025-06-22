import { signOut } from "@/auth"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"

export function SignOut() {
  return (
    <form
      className="border-t pt-20"
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/login" })
      }}
    >
      <Button
        variant={"ghost"}
        className="w-full flex justify-start group hover:bg-blue-50"
        type="submit">
        <span>
          <LogOut className="text-red-400" />
        </span>
        <span className="group-hover:text-blue-500">Sign Out</span>
      </Button>
    </form>
  )
}