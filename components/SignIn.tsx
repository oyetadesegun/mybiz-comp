import { signIn } from "@/auth"

export default function SignIn() {
  return (
    <form
      className="w-full flex justify-center"
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/admin" })
      }}
    >
      <button type="submit" className="mx-auto w-fit" >Signin with Google</button>
    </form>
  )
} 