import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-amber-50 to-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <BookOpen className="w-16 h-16 mx-auto text-amber-700 mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
              PrimeBooks & Stationery
            </h1>
          </div>

          <p className="text-xl text-gray-700 mb-2 max-w-2xl mx-auto">
            Your Premium Destination for Books & Stationery in Vadalur
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Abatharanapuram, Vadalur | Mon-Sat 8:30 AM to 9 PM
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-gray-700 ml-2 font-semibold">Quality Guaranteed</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-700 text-amber-800 hover:bg-amber-50 px-8 py-6 text-lg"
              onClick={() => window.location.href = '/contact'}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Visit Store
            </Button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full font-medium">
            <Clock className="w-5 h-5" />
            Reliable Service • Quality Products
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-amber-600 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <BookOpen className="w-6 h-6 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Wide Collection</h3>
                    <p className="text-gray-600">School books, guides, and latest editions available</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Genuine Pricing</h3>
                    <p className="text-gray-600">Affordable rates trusted by families</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Vadalur Store</h3>
                    <p className="text-gray-600">Abatharanapuram, Cuddalore</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'School Books', desc: 'All boards & classes', color: 'bg-amber-600' },
              { title: 'Guides', desc: 'Expert reference materials', color: 'bg-blue-600' },
              { title: 'Competitive Exam', desc: 'SSC, TNPSC, NEET & more', color: 'bg-red-600' },
              { title: 'Kids Books', desc: 'Illustrated story books', color: 'bg-purple-600' },
              { title: 'Stationery', desc: 'Premium quality supplies', color: 'bg-green-600' }
            ].map((cat, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${cat.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm">{cat.desc}</p>
                  <Link to="/products" className="inline-flex items-center text-amber-700 hover:text-amber-800 mt-3 font-medium">
                    Explore <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Visit Us Today!
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            Get all your books and stationery needs at one trusted place
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Find Us
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-6 text-lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;