import { signIn } from "@/auth"
import { Button } from "./ui/button"

export default function GoogleSignIn() {
  return (
    <form
      className="w-full flex justify-center"
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/admin" })
      }}
    >
      <Button variant="ghost" type="submit" className="mx-4  w-full text-gray-900 bg-accent" >Continuue with Google</Button>
    </form>
  )
} 