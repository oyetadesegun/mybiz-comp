import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building,
  DollarSign,
  Globe,
  TrendingUp,
  Users,
  Zap,
  BarChart,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Lightbulb,
} from "lucide-react"

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "pre-launch",
      title: "Pre-launch Phase",
      icon: Lightbulb,
      description: "From idea validation to business planning",
      color: "bg-purple-100 text-purple-700",
      services: [
        {
          name: "Feasibility Study & Market Research",
          description: "Industry research, competitive analysis, SWOT analysis, target audience profiling",
          price: "From $299",
          features: [
            "Market trends analysis",
            "Competitive landscape",
            "Target audience profiling",
            "Pricing strategy",
          ],
        },
        {
          name: "Business Plan Development",
          description: "Complete business plan with financial projections and scalability roadmap",
          price: "From $499",
          features: ["Executive summary", "Business model canvas", "Financial projections", "Break-even analysis"],
        },
        {
          name: "Legal Compliance & Registration",
          description: "Business registration, trademark protection, legal documents",
          price: "From $399",
          features: ["Business registration", "Trademark protection", "Legal documents", "Tax compliance setup"],
        },
      ],
    },
    {
      id: "foundation",
      title: "Structure & Foundation",
      icon: Building,
      description: "Building your business identity and structure",
      color: "bg-blue-100 text-blue-700",
      services: [
        {
          name: "Branding & Identity Package",
          description: "Complete brand identity including logo, visual guidelines, and brand story",
          price: "From $599",
          features: ["Logo design", "Brand guidelines", "Brand story", "Domain registration"],
        },
        {
          name: "Business Structure Setup",
          description: "Legal structure optimization, HR policies, accounting systems",
          price: "From $349",
          features: ["Legal structure advice", "HR policy templates", "Accounting setup", "Contract templates"],
        },
      ],
    },
    {
      id: "funding",
      title: "Funding & Capital",
      icon: DollarSign,
      description: "Access to funding and investment opportunities",
      color: "bg-green-100 text-green-700",
      services: [
        {
          name: "Pitch Deck Creation",
          description: "Professional investor-ready pitch decks that get funding",
          price: "From $799",
          features: ["Investor pitch deck", "Financial modeling", "Market analysis", "Presentation coaching"],
        },
        {
          name: "Grant & Funding Support",
          description: "Grant applications, investor connections, loan advisory",
          price: "From $449",
          features: ["Grant applications", "Investor introductions", "Loan advisory", "Crowdfunding setup"],
        },
      ],
    },
    {
      id: "online-presence",
      title: "Online & Offline Presence",
      icon: Globe,
      description: "Professional website and social media presence",
      color: "bg-indigo-100 text-indigo-700",
      services: [
        {
          name: "Website & E-commerce Development",
          description: "Professional websites with booking systems and e-commerce capabilities",
          price: "From $899",
          features: ["Custom website design", "E-commerce setup", "Booking systems", "Mobile optimization"],
        },
        {
          name: "Social Media Setup & Optimization",
          description: "Complete social media presence across all major platforms",
          price: "From $299",
          features: ["Profile optimization", "Content templates", "Bio optimization", "WhatsApp Business setup"],
        },
      ],
    },
    {
      id: "marketing",
      title: "Marketing & Client Acquisition",
      icon: TrendingUp,
      description: "Comprehensive marketing strategies to attract customers",
      color: "bg-orange-100 text-orange-700",
      services: [
        {
          name: "Digital Marketing Strategy",
          description: "Complete digital marketing plan with content calendar and hashtag strategy",
          price: "From $699",
          features: ["Content calendar", "Hashtag strategy", "Influencer outreach", "Video marketing plan"],
        },
        {
          name: "Paid Advertising Management",
          description: "Professional ad campaigns across Facebook, Google, TikTok, and YouTube",
          price: "From $599/month",
          features: ["Facebook/Instagram Ads", "Google Ads", "TikTok Ads", "Campaign optimization"],
        },
        {
          name: "SEO & Content Marketing",
          description: "Search engine optimization and content creation for organic growth",
          price: "From $499/month",
          features: ["SEO optimization", "Blog writing", "Email newsletters", "Lead magnets"],
        },
      ],
    },
    {
      id: "engagement",
      title: "Client Engagement & Retention",
      icon: Users,
      description: "Systems to engage and retain your customers",
      color: "bg-pink-100 text-pink-700",
      services: [
        {
          name: "CRM & Automation Setup",
          description: "Customer relationship management and marketing automation",
          price: "From $449",
          features: ["CRM implementation", "Chatbot setup", "WhatsApp automation", "Email automation"],
        },
        {
          name: "Loyalty & Referral Programs",
          description: "Customer retention systems and referral programs",
          price: "From $349",
          features: ["Loyalty program design", "Referral systems", "Coupon strategies", "Membership models"],
        },
      ],
    },
    {
      id: "scaling",
      title: "Scaling & Virality",
      icon: Zap,
      description: "Strategies to scale your business and go viral",
      color: "bg-yellow-100 text-yellow-700",
      services: [
        {
          name: "Partnership & Collaboration Strategy",
          description: "Strategic partnerships and affiliate programs for growth",
          price: "From $599",
          features: ["Partnership strategy", "Affiliate programs", "B2B partnerships", "Collaboration planning"],
        },
        {
          name: "Public Relations & Viral Marketing",
          description: "PR campaigns and viral content strategies",
          price: "From $799",
          features: ["Press releases", "Media outreach", "Viral content strategy", "Influencer partnerships"],
        },
        {
          name: "Viral Content Creation",
          description: "Content designed to go viral and increase brand awareness",
          price: "From $499",
          features: ["Viral content strategy", "Meme marketing", "User-generated campaigns", "Challenge creation"],
        },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring & Growth",
      icon: BarChart,
      description: "Analytics and continuous improvement systems",
      color: "bg-teal-100 text-teal-700",
      services: [
        {
          name: "Analytics & Performance Tracking",
          description: "Comprehensive analytics setup and performance monitoring",
          price: "From $299",
          features: ["Google Analytics setup", "Social media analytics", "Sales tracking", "Performance reports"],
        },
        {
          name: "Feedback & Optimization Systems",
          description: "Customer feedback systems and continuous improvement processes",
          price: "From $249",
          features: ["Feedback surveys", "Review management", "A/B testing", "Optimization strategies"],
        },
      ],
    },
  ]

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
            Community
          </Link>
          <Link href="/get-help" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Get Help
          </Link>
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link href="/get-help">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Now</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Complete Business Growth Services
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  From idea to viral success - we provide every service your business needs to grow sustainably and
                  reach wide market penetration.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/get-help">
                  <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700 text-white">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#services">
                  <Button size="lg" variant="outline" className="px-8 border-blue-600 text-blue-600 hover:bg-blue-50">
                    Browse Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white" id="services">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  End-to-End Business Services
                </h2>
                <p className="mx-auto max-w-[900px] text-gray-600 md:text-xl/relaxed">
                  Everything you need to take your business from idea to viral success, organized by growth phase.
                </p>
              </div>
            </div>

            {/* Service Categories */}
            <div className="space-y-16">
              {serviceCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon
                return (
                  <div key={category.id} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {category.services.map((service, serviceIndex) => (
                        <Card key={serviceIndex} className="border-gray-200 hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{service.name}</CardTitle>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {service.price}
                              </Badge>
                            </div>
                            <CardDescription>{service.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                              <ul className="space-y-1">
                                {service.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Link href="/get-help">
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                Request This Service
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Package Deals */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Popular Service Packages
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
                  Save money with our bundled packages designed for different business stages.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-gray-200 relative">
                <CardHeader>
                  <CardTitle className="text-xl">Startup Launch Package</CardTitle>
                  <CardDescription>Perfect for new businesses getting started</CardDescription>
                  <div className="text-3xl font-bold text-blue-600">$1,999</div>
                  <p className="text-sm text-gray-500">Save $500 vs individual services</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Business Plan Development
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Legal Registration & Compliance
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Complete Branding Package
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Website Development
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Social Media Setup
                    </li>
                  </ul>
                  <Link href="/get-help">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-blue-500 relative shadow-lg">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Growth Accelerator Package</CardTitle>
                  <CardDescription>For businesses ready to scale and go viral</CardDescription>
                  <div className="text-3xl font-bold text-blue-600">$3,499</div>
                  <p className="text-sm text-gray-500">Save $800 vs individual services</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Digital Marketing Strategy
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />3 Months Paid Advertising Management
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      SEO & Content Marketing
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      CRM & Automation Setup
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Viral Content Strategy
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Analytics & Tracking Setup
                    </li>
                  </ul>
                  <Link href="/get-help">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Accelerate Growth</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-gray-200 relative">
                <CardHeader>
                  <CardTitle className="text-xl">Enterprise Scale Package</CardTitle>
                  <CardDescription>Complete solution for established businesses</CardDescription>
                  <div className="text-3xl font-bold text-blue-600">$5,999</div>
                  <p className="text-sm text-gray-500">Save $1,200 vs individual services</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Everything in Growth Package
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Pitch Deck & Funding Support
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Partnership Strategy
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Public Relations Campaign
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />6 Months Ongoing Support
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Dedicated Account Manager
                    </li>
                  </ul>
                  <Link href="/get-help">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Scale Enterprise</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Success Stories</h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed">
                  See how our comprehensive services have helped businesses achieve viral growth.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">TechStart Solutions</CardTitle>
                  <CardDescription>Software Development Company</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "MyBiz.Com helped us go from idea to $100K revenue in 8 months. Their complete package approach
                    saved us time and money."
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📈 300% growth</span>
                    <span>💰 $100K revenue</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">Fashion Forward</CardTitle>
                  <CardDescription>E-commerce Fashion Brand</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "Their viral marketing strategy got us 50K followers in 2 months. Our sales increased by 500%!"
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>👥 50K followers</span>
                    <span>📊 500% sales increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">Local Eats</CardTitle>
                  <CardDescription>Restaurant Chain</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    "From one location to five locations in 18 months. Their funding support helped us secure $500K
                    investment."
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>🏪 5 locations</span>
                    <span>💵 $500K funding</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Transform Your Business?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl/relaxed">
                  Get a custom quote for the services your business needs to achieve viral growth and sustainable
                  success.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/get-help">
                  <Button size="lg" className="px-8 bg-white text-blue-600 hover:bg-gray-100">
                    <Target className="mr-2 h-4 w-4" />
                    Get Custom Quote
                  </Button>
                </Link>
                <Link href="/forum">
                  <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white/10">
                    <Users className="mr-2 h-4 w-4" />
                    Join Community
                  </Button>
                </Link>
              </div>
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
