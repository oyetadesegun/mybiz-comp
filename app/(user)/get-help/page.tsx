"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield, Phone } from "lucide-react"

export default function GetHelpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    businessName: "",
    businessType: "",
    businessChallenge: "",
    category: "",
    urgency: "",
    name: "",
    phone: "",
    referralCode: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate submission - in a real app, this would send to backend
    setTimeout(() => {
      setIsLoading(false)
      if (step === 1) {
        setStep(2)
      } else {
        router.push("/thank-you")
      }
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white">
        <Link href="/" className="flex items-center">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">MyBiz.Com</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-600 hover:text-blue-600">
            Cancel
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="mx-auto max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => (step === 1 ? router.back() : setStep(1))}
            className="mb-4 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-gray-900">
                    {step === 1 ? "Share Your Business Challenge" : "Let's Connect With You"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {step === 1
                      ? "Tell us what you're dealing with - everything is kept completely confidential"
                      : "Provide your contact details so our team can help you personally"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {step === 1 ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-gray-900">
                        Title or Short Description *
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Need help with cash flow management"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                      <p className="text-sm text-gray-600">Give us a brief summary of what you need help with</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName" className="text-gray-900">
                          Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          placeholder="Enter your business name"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessType" className="text-gray-900">
                          What is your business about? *
                        </Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) => handleInputChange("businessType", value)}
                          required
                        >
                          <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Select your business type" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {/* Service-Based Businesses */}
                            <SelectItem value="law-firm">Law Firm</SelectItem>
                            <SelectItem value="accounting-firm">Accounting Firm</SelectItem>
                            <SelectItem value="business-consulting">Business Consulting</SelectItem>
                            <SelectItem value="real-estate-agency">Real Estate Agency</SelectItem>
                            <SelectItem value="architecture-firm">Architecture Firm</SelectItem>
                            <SelectItem value="engineering-services">Engineering Services</SelectItem>
                            <SelectItem value="hair-salon">Hair Salon / Barbershop</SelectItem>
                            <SelectItem value="spa-massage">Spa & Massage Therapy</SelectItem>
                            <SelectItem value="fitness-gym">Fitness Trainer / Gym</SelectItem>
                            <SelectItem value="tailoring">Tailoring / Fashion Design</SelectItem>
                            <SelectItem value="makeup-artist">Makeup Artist</SelectItem>
                            <SelectItem value="cleaning-services">Cleaning Services</SelectItem>
                            <SelectItem value="plumbing">Plumbing Services</SelectItem>
                            <SelectItem value="electrical-repairs">Electrical Repairs</SelectItem>
                            <SelectItem value="landscaping">Landscaping</SelectItem>
                            <SelectItem value="interior-design">Interior Design</SelectItem>
                            <SelectItem value="tutoring">Private Tutoring</SelectItem>
                            <SelectItem value="online-courses">Online Courses / Coaching</SelectItem>
                            <SelectItem value="driving-school">Driving School</SelectItem>
                            <SelectItem value="language-school">Language School</SelectItem>

                            {/* Product-Based Businesses */}
                            <SelectItem value="grocery-store">Grocery Store</SelectItem>
                            <SelectItem value="clothing-boutique">Boutique / Clothing Shop</SelectItem>
                            <SelectItem value="electronics-store">Electronics Store</SelectItem>
                            <SelectItem value="cosmetics-skincare">Cosmetics & Skincare</SelectItem>
                            <SelectItem value="baby-products">Baby Products</SelectItem>
                            <SelectItem value="home-decor">Home Decor & Furniture</SelectItem>
                            <SelectItem value="jewelry-shop">Jewelry Shop</SelectItem>
                            <SelectItem value="bakery-production">Bakery / Bread Production</SelectItem>
                            <SelectItem value="water-production">Pure Water / Bottled Water</SelectItem>
                            <SelectItem value="fashion-line">Fashion/Clothing Line</SelectItem>
                            <SelectItem value="furniture-making">Furniture Making</SelectItem>
                            <SelectItem value="candle-soap">Candle or Soap Making</SelectItem>

                            {/* E-commerce & Digital */}
                            <SelectItem value="ecommerce-store">E-commerce Store</SelectItem>
                            <SelectItem value="dropshipping">Dropshipping Business</SelectItem>
                            <SelectItem value="print-on-demand">Print-on-Demand</SelectItem>
                            <SelectItem value="marketplace">Online Marketplace</SelectItem>
                            <SelectItem value="affiliate-marketing">Affiliate Marketing</SelectItem>

                            {/* Tech & Digital */}
                            <SelectItem value="web-development">Web Development Agency</SelectItem>
                            <SelectItem value="app-development">App Development</SelectItem>
                            <SelectItem value="digital-marketing">Digital Marketing Agency</SelectItem>
                            <SelectItem value="seo-consultant">SEO Consultant</SelectItem>
                            <SelectItem value="social-media-management">Social Media Management</SelectItem>
                            <SelectItem value="saas-startup">SaaS Startup</SelectItem>
                            <SelectItem value="virtual-assistant">Virtual Assistant Service</SelectItem>
                            <SelectItem value="graphic-design">Graphic Design</SelectItem>

                            {/* Creative & Media */}
                            <SelectItem value="photography">Photography / Videography</SelectItem>
                            <SelectItem value="animation">Animation & Motion Graphics</SelectItem>
                            <SelectItem value="music-production">Music Production</SelectItem>
                            <SelectItem value="podcasting">Podcasting</SelectItem>
                            <SelectItem value="youtube-channel">YouTube Channel</SelectItem>
                            <SelectItem value="content-writing">Content Writing</SelectItem>
                            <SelectItem value="blogging">Blogging / Vlogging</SelectItem>

                            {/* Food & Beverage */}
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="catering">Catering Service</SelectItem>
                            <SelectItem value="food-delivery">Food Delivery Service</SelectItem>
                            <SelectItem value="bakery">Bakery / Cake Business</SelectItem>
                            <SelectItem value="juice-bar">Juice or Smoothie Bar</SelectItem>
                            <SelectItem value="street-food">Street Food / Food Truck</SelectItem>
                            <SelectItem value="meal-prep">Meal Prep Service</SelectItem>

                            {/* Agriculture & Farming */}
                            <SelectItem value="poultry-farming">Poultry Farming</SelectItem>
                            <SelectItem value="fish-farming">Fish Farming</SelectItem>
                            <SelectItem value="crop-farming">Crop Farming</SelectItem>
                            <SelectItem value="livestock-farming">Livestock Farming</SelectItem>
                            <SelectItem value="agro-processing">Agro-processing</SelectItem>
                            <SelectItem value="farm-equipment">Farm Equipment</SelectItem>

                            {/* Transportation & Logistics */}
                            <SelectItem value="ride-hailing">Ride-hailing Service</SelectItem>
                            <SelectItem value="vehicle-rental">Vehicle Rental</SelectItem>
                            <SelectItem value="courier-service">Courier / Dispatch Service</SelectItem>
                            <SelectItem value="auto-parts">Auto Spare Parts</SelectItem>
                            <SelectItem value="logistics">Logistics & Haulage</SelectItem>

                            {/* Financial Services */}
                            <SelectItem value="microfinance">Microfinance Business</SelectItem>
                            <SelectItem value="pos-business">POS Business</SelectItem>
                            <SelectItem value="insurance">Insurance Services</SelectItem>
                            <SelectItem value="forex-trading">Forex Trading</SelectItem>
                            <SelectItem value="crypto-exchange">Crypto Exchange</SelectItem>
                            <SelectItem value="financial-coaching">Financial Coaching</SelectItem>

                            {/* Health & Wellness */}
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="clinic">Clinic / Health Center</SelectItem>
                            <SelectItem value="telemedicine">Telemedicine App</SelectItem>
                            <SelectItem value="supplement-business">Supplement Business</SelectItem>
                            <SelectItem value="herbal-medicine">Herbal Medicine</SelectItem>
                            <SelectItem value="mental-health">Mental Health Services</SelectItem>

                            {/* Event & Entertainment */}
                            <SelectItem value="event-planning">Event Planning</SelectItem>
                            <SelectItem value="event-decoration">Event Decoration</SelectItem>
                            <SelectItem value="equipment-rental">Equipment Rental</SelectItem>
                            <SelectItem value="entertainment">Entertainment Services</SelectItem>
                            <SelectItem value="wedding-services">Wedding Services</SelectItem>

                            {/* Education & Childcare */}
                            <SelectItem value="school">School / Educational Institution</SelectItem>
                            <SelectItem value="daycare">Daycare / Childcare</SelectItem>
                            <SelectItem value="educational-apps">Educational Apps</SelectItem>
                            <SelectItem value="skill-training">Skill Training Center</SelectItem>

                            {/* Emerging & Niche */}
                            <SelectItem value="green-energy">Green Energy / Solar</SelectItem>
                            <SelectItem value="recycling">Recycling & Waste Management</SelectItem>
                            <SelectItem value="ai-consulting">AI/ML Consulting</SelectItem>
                            <SelectItem value="cybersecurity">Cybersecurity Services</SelectItem>
                            <SelectItem value="drone-services">Drone Services</SelectItem>
                            <SelectItem value="pet-services">Pet Services</SelectItem>
                            <SelectItem value="thrift-business">Thrift / Resale Business</SelectItem>

                            <SelectItem value="other">Other (Please specify in description)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="challenge" className="text-gray-900">
                        What business challenge are you facing? *
                      </Label>
                      <Textarea
                        id="challenge"
                        placeholder="Describe your situation in detail. The more information you provide, the better we can help you..."
                        className="min-h-[150px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.businessChallenge}
                        onChange={(e) => handleInputChange("businessChallenge", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-900">
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select the area you need help with" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing & Sales</SelectItem>
                          <SelectItem value="finance">Finance & Cash Flow</SelectItem>
                          <SelectItem value="operations">Operations & Management</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="technology">Technology & Digital</SelectItem>
                          <SelectItem value="legal">Legal & Compliance</SelectItem>
                          <SelectItem value="strategy">Strategy & Growth</SelectItem>
                          <SelectItem value="social-media">Social Media & Online Presence</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-gray-900">
                        How urgent is this? *
                      </Label>
                      <Select
                        value={formData.urgency}
                        onValueChange={(value) => handleInputChange("urgency", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate - Need help today</SelectItem>
                          <SelectItem value="this-week">This week</SelectItem>
                          <SelectItem value="this-month">This month</SelectItem>
                          <SelectItem value="planning">Planning for future</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900">
                        Your Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-900">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                      <p className="text-sm text-gray-600">
                        Our customer experience team will call you within 24 hours to discuss your needs.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="referral" className="text-gray-900">
                        Referral Code (Optional)
                      </Label>
                      <Input
                        id="referral"
                        placeholder="Enter referral code if you have one"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        value={formData.referralCode}
                        onChange={(e) => handleInputChange("referralCode", e.target.value)}
                      />
                      <p className="text-sm text-gray-600">
                        Have a referral code? Enter it to give credit to who referred you.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">What happens next?</h4>
                          <p className="text-sm text-blue-800 mt-1">
                            Our customer experience team will call you to understand your specific needs and help you
                            create your account. We'll also discuss our social media evaluation services if relevant to
                            your business.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>

              <CardFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  {isLoading
                    ? step === 1
                      ? "Processing..."
                      : "Submitting..."
                    : step === 1
                      ? "Continue"
                      : "Submit & Get Help"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                🔒 Your information is completely confidential and will never be shared publicly.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
