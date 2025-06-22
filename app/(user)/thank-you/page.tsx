import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, MessageCircle, Clock } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com</span>
        </Link>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mx-auto max-w-2xl">
          <Card className="border-gray-200 shadow-lg text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Thank You!</CardTitle>
              <CardDescription className="text-gray-600">
                We've received your business challenge and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
                <div className="space-y-3 text-sm text-green-800">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4" />
                    <span>Our customer experience team will call you within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4" />
                    <span>We'll discuss your specific needs and help create your account</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4" />
                    <span>You'll receive personalized recommendations within 48 hours</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">While you wait, you can:</h4>
                <div className="grid gap-3">
                  <Link href="/forum">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      Browse our Community Forum
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      Learn about our Services
                    </Button>
                  </Link>
                  <Link href="/referral">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      Join our Referral Program
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Need immediate help?</h4>
                <p className="text-sm text-blue-800 mb-3">
                  If your issue is urgent, you can also browse our community forum where business owners share general
                  advice.
                </p>
                <Link href="/forum">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Visit Community Forum</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
