import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Users, TrendingUp, MessageCircle, Phone, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/forum" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Community Forum
          </Link>
          <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/get-help">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Help Now</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                    Your Business Companion for Growth & Success
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Get personalized business advice, social media evaluations, and expert guidance - all in complete
                    confidence. We're here to help your business thrive.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/get-help">
                    <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700 text-white">
                      Share Your Challenge
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/forum">
                    <Button size="lg" variant="outline" className="px-8 border-blue-600 text-blue-600 hover:bg-blue-50">
                      Browse Community
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400/20 rounded-full filter blur-3xl opacity-70"></div>
                  <div className="absolute -bottom-10 -right-4 w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl opacity-70"></div>
                  <img
                    src="/placeholder.svg?height=550&width=550"
                    alt="Business growth illustration"
                    width={550}
                    height={550}
                    className="relative z-10 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  How We Help Your Business
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From private consultations to social media audits, we provide comprehensive support for your business
                  needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-gray-900">Private & Confidential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Share your business challenges privately. Our experts provide personalized advice without exposing
                    your sensitive information.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-gray-900">Social Media Audit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Get professional evaluation of your social media presence with actionable recommendations to improve
                    engagement and reach.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-gray-900">Expert Support Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our customer experience team calls you personally to understand your needs and guide you through our
                    services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Simple 3-Step Process
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Getting help for your business has never been easier.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white mx-auto">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Share Your Challenge</h3>
                <p className="text-gray-600">
                  Tell us what you're dealing with in your business. Provide your name and phone number for personalized
                  follow-up.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white mx-auto">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Get Personal Call</h3>
                <p className="text-gray-600">
                  Our customer experience team calls you to understand your needs and helps you create your account.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white mx-auto">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Receive Expert Advice</h3>
                <p className="text-gray-600">
                  Get personalized recommendations, social media audits, and ongoing support to grow your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Grow Your Business?
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of business owners who trust MyBiz.Com for their growth and success.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/get-help">
                  <Button size="lg" className="px-8 bg-white text-blue-600 hover:bg-gray-100">
                    <Phone className="mr-2 h-4 w-4" />
                    Get Help Now
                  </Button>
                </Link>
                <Link href="/forum">
                  <Button size="lg" variant="outline" className="px-8 border-white text-blue-600 hover:bg-white/10">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  What Business Owners Say
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "The social media audit completely transformed our online presence. Sales increased by 40% in just 3
                    months!"
                  </p>
                  <p className="font-semibold text-gray-900">- Sarah Johnson, Retail Store Owner</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "The personal call from their team made all the difference. They really understood my business
                    challenges."
                  </p>
                  <p className="font-semibold text-gray-900">- Michael Chen, Tech Startup</p>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "Finally, a platform that keeps my business information private while providing real solutions."
                  </p>
                  <p className="font-semibold text-gray-900">- Emily Rodriguez, Restaurant Owner</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t border-gray-200 px-4 md:px-6 bg-gray-50">
        <p className="text-xs text-gray-600">© 2024 MyBiz.Com. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/referral" className="text-xs text-gray-600 hover:text-blue-600 transition-colors">
            Referral Program
          </Link>
        </nav>
      </footer>
    </div>
  )
}
