import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="bg-white/60 backdrop-blur-sm border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/70">
              Please check your email and click the confirmation link to activate your account. Once confirmed, you can
              sign in and begin your transformation journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
