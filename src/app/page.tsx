import Link from 'next/link'
import { Search, Calendar, DollarSign, CheckCircle, Star, ArrowRight, Users, Heart, Building2, Camera, Music, Cake, Flower2, Check } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const topVendors = await prisma.vendor.findMany({
    where: { isActive: true },
    take: 3,
    orderBy: { rating: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50" suppressHydrationWarning>
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Craft Your Perfect Event Experience
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover world-class vendors, visualize your dream event, and bring your vision to life with our intelligent planning platform.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vendors, venues, or services..."
                className="w-full px-6 py-4 pr-32 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg shadow-lg"
              />
              <button className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition transform hover:scale-105">
                Find Vendors
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-purple-600 mb-2">2,500+</div>
              <div className="text-gray-600">Verified Vendors</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-pink-600 mb-2">15,000+</div>
              <div className="text-gray-600">Events Planned</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Couples</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Plan Your Event in 4 Simple Steps</h2>
          <p className="text-xl text-gray-600 text-center mb-16">From inspiration to celebration</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3 text-purple-600">Dream Canvas</h3>
              <p className="text-gray-600">Personalize your inspiration board</p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3 text-pink-600">Budget Wizard</h3>
              <p className="text-gray-600">Manage your expenses with ease</p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3 text-purple-600">Request Quotes</h3>
              <p className="text-gray-600">Connect with thousands of vendors</p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition">
                4
              </div>
              <h3 className="text-2xl font-bold mb-3 text-pink-600">Book & Celebrate</h3>
              <p className="text-gray-600">Secure your date and enjoy the moment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Vendors</h2>
            <p className="text-xl text-gray-600 mb-6">Browse by category</p>
            <Link href="/vendors" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <Link href="/vendors?category=photographer" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center border-2 border-transparent hover:border-purple-500">
                <Camera className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition" />
                <h3 className="font-bold text-lg">Photographers</h3>
              </div>
            </Link>

            <Link href="/vendors?category=venue" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center border-2 border-transparent hover:border-pink-500">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-pink-600 group-hover:scale-110 transition" />
                <h3 className="font-bold text-lg">Venues</h3>
              </div>
            </Link>

            <Link href="/vendors?category=catering" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center border-2 border-transparent hover:border-purple-500">
                <Cake className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition" />
                <h3 className="font-bold text-lg">Catering</h3>
              </div>
            </Link>

            <Link href="/vendors?category=music" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center border-2 border-transparent hover:border-pink-500">
                <Music className="w-12 h-12 mx-auto mb-4 text-pink-600 group-hover:scale-110 transition" />
                <h3 className="font-bold text-lg">Music & Entertainment</h3>
              </div>
            </Link>

            <Link href="/vendors?category=floral" className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center border-2 border-transparent hover:border-purple-500">
                <Flower2 className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition" />
                <h3 className="font-bold text-lg">Floral & Decor</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Top-Rated Vendors</h2>
            <Link href="/vendors" className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              View All Vendors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topVendors.map((vendor: any) => (
              <div key={vendor.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group flex flex-col">
                <div className={`h-48 bg-gradient-to-br from-purple-400 to-pink-400 opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {/* Placeholder for image - ideally fetch real image */}
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold opacity-30">
                    {vendor.businessName.charAt(0)}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold truncate pr-2">{vendor.businessName}</h3>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <span className="font-bold">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{vendor.description}</p>
                  <div className="mt-auto">
                    <Link href={`/vendors/${vendor.id}`} className="block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition transform group-hover:scale-105">
                      View Portfolio
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">We Plan Every Occasion</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center cursor-pointer group">
              <div className="text-5xl mb-4">💒</div>
              <h3 className="font-bold text-xl group-hover:text-purple-600 transition">Weddings</h3>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center cursor-pointer group">
              <div className="text-5xl mb-4">🏢</div>
              <h3 className="font-bold text-xl group-hover:text-pink-600 transition">Corporate</h3>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center cursor-pointer group">
              <div className="text-5xl mb-4">🎂</div>
              <h3 className="font-bold text-xl group-hover:text-purple-600 transition">Birthday</h3>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center cursor-pointer group">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-bold text-xl group-hover:text-pink-600 transition">Social Events</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose the Perfect Plan</h2>
            <p className="text-xl text-gray-600">Simple, transparent pricing for every stage of event planning.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Customer Basic */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition group">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basic (Planners)</h3>
                <div className="text-4xl font-bold text-gray-900">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['1 Active Event', 'Basic Vendor Search', 'Email Support'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup?type=customer" className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 text-center transition">Get Started</Link>
            </div>

            {/* Customer Pro */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 flex flex-col relative transform scale-105 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Recommended</div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-purple-400">Premium (Planners)</h3>
                <div className="text-4xl font-bold">$29<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Unlimited Events', 'Dream Canvas Access', 'Advanced Discovery', 'Priority Support'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/subscription" className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-purple-500/20 hover:shadow-xl text-center transition">Upgrade to Pro</Link>
            </div>

            {/* Vendor Pro */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition group">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vendor Pro</h3>
                <div className="text-4xl font-bold text-gray-900">$99<span className="text-lg text-gray-400 font-normal">/mo</span></div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow text-gray-600">
                {['Unlimited Leads', 'Featured Verified Badge', 'Analytics Dashboard', 'Marketing Tools'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup?type=vendor" className="w-full py-3 bg-purple-50 text-purple-600 rounded-xl font-bold hover:bg-purple-100 text-center transition">Grow Business</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Your Dream Event?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers and vendors on our platform</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?type=customer" className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl transition transform hover:scale-105">
              For Customers
            </Link>
            <Link href="/auth/signup?type=vendor" className="px-8 py-4 bg-purple-900 text-white rounded-full font-bold hover:shadow-2xl transition transform hover:scale-105">
              For Vendors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
