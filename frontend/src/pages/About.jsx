import React from 'react';
import { Award, Users, Heart, MapPin } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About PrimeBooks & Stationery
          </h1>
          <p className="text-xl text-gray-600">
            Your Trusted Partner in Education & Stationery in Vadalur
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Located in <span className="font-semibold text-amber-800">Abatharanapuram, Vadalur</span>, PrimeBooks & Stationery is dedicated to serving students, teachers, and book enthusiasts with quality educational materials. We pride ourselves on being a comprehensive resource for all your academic and stationery needs.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our store specializes in a wide selection of school books (across various boards), expert study guides, competitive exam materials for SSC, TNPSC, and NEET, as well as a charming collection of kids' books. We also offer a complete range of premium quality stationery products.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              We understand that the right tools are essential for success. That's why we focus on providing the latest editions at affordable prices, paired with friendly and knowledgeable service to help you find exactly what you need.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-t-4 border-t-amber-600 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-4 rounded-lg">
                    <Award className="w-8 h-8 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Student Focused</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We focus on providing the best materials for students of all ages in Vadalur. Our collection is curated to support academic excellence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <Heart className="w-8 h-8 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Competitive Prices</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Quality education should be affordable. We offer competitive pricing on all our books and stationery items.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-600 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <MapPin className="w-8 h-8 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Vadalur Store</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Conveniently located in Abatharanapuram, Vadalur. Easily accessible for students across Cuddalore district.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-red-600 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-4 rounded-lg">
                    <Users className="w-8 h-8 text-red-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Expert Guidance</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our staff is always ready to help you choose the right guides and competitive exam materials for your career goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Store Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Store Highlights
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-amber-700 mb-2">Primary</div>
              <div className="text-gray-600 font-medium">Educational Resource</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-700 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Quality Stationery</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-700 mb-2">Daily</div>
              <div className="text-gray-600 font-medium">Except Sunday</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;