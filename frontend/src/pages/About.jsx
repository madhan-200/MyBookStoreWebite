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
            About Radhamani Stores
          </h1>
          <p className="text-xl text-gray-600">
            Your Trusted Partner in Education & Stationery
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Located in the heart of Coimbatore's Town Hall area, <span className="font-semibold text-amber-800">Radhamani Stores</span> has been serving students, families, and book lovers with dedication and trust. We are conveniently situated inside Maharaja Fancy at Shop No-137, Raja Street, making us easily accessible to everyone in the city.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our store specializes in providing a comprehensive range of school books, study guides, general reading materials, and complete stationery supplies. We understand the importance of quality education materials, and that's why we ensure the availability of the latest editions at genuine, affordable prices.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              With a rating of 3.8 stars from our valued customers, we take pride in being a reliable destination for all your book and stationery needs. Our friendly staff is always ready to help you find exactly what you're looking for.
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
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Trusted by Families</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Years of service have built strong relationships with students and families across Coimbatore. We're known for our reliability and genuine products.
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
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Affordable Pricing</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We believe quality education materials should be accessible to everyone. Our prices are genuine and competitive, ensuring value for money.
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
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Prime Location</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Conveniently located in Town Hall's busy center, inside Maharaja Fancy. Easy to reach and well-connected to all parts of the city.
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
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Friendly Service</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our staff is knowledgeable and always ready to assist you. We help you find the right books and materials for your specific needs.
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
              <div className="text-4xl font-bold text-amber-700 mb-2">Years</div>
              <div className="text-gray-600 font-medium">Of Trusted Service</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-700 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-700 mb-2">Daily</div>
              <div className="text-gray-600 font-medium">Open Till 9 PM</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;