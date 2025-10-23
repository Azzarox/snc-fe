import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    // NOTE: Can calc the navbar height 4rem and use hte min-h to be calc(100vh-4rem)
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
