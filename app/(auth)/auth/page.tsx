import SignupForm from '@/components/auth/SignUpForm'
import LoginForm from '@/components/auth/LoginForm'
import GoogleSignIn from '@/components/GoogleSignIn'

export default function AuthPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  let mode = searchParams.mode
  let email: string | undefined = ""
  let password: string | undefined
  let firstName: string | undefined
  let lastName: string | undefined
  let message: string | undefined

  // Fallback: extract values from encoded `code` param
  if (searchParams.code) {
    try {
      const decoded = decodeURIComponent(searchParams.code)
      const nestedParams = new URLSearchParams(decoded)

      // Get nested mode if not directly in searchParams
      mode = mode || (nestedParams.get('mode') ?? undefined)

      email = nestedParams.get('email') || undefined
      password = nestedParams.get('password') || undefined
      firstName = nestedParams.get('firstName') || undefined
      lastName = nestedParams.get('lastName') || undefined
      message = nestedParams.get('message') || undefined
    } catch (err) {
      console.error("Failed to parse 'code' param:", err)
    }
  }

  if (mode === 'signup') {
    return (
      <SignupForm
        customError={message}
        formData={{
          email: email || "",
          password: password || "",
          firstName: firstName || "",
          lastName: lastName || "",
          confirmPassword: password || ""
        }}
      >
        <GoogleSignIn />
      </SignupForm>
    )
  }

  return (
    <LoginForm
      customError={message}
      formData={{
        email: email || "",
        password: password || "",
      }}
    >
      <GoogleSignIn />
    </LoginForm>
  )
}
