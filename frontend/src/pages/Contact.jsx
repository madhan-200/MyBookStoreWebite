import React from 'react';
import { Phone, MapPin, Clock, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Visit Us
          </h1>
          <p className="text-xl text-gray-600">
            We're here to help with all your book and stationery needs
          </p>
        </div>
      </section>

      {/* Contact Info & Map */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-l-4 border-l-green-600 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Abatharanapuram, Vadalur<br />
                        Cuddalore, Tamil Nadu<br />
                        Pincode - 607303
                      </p>
                      <p className="text-sm text-amber-700 font-medium mt-2">
                        Temporary Address
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Business Hours</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Monday - Saturday</span>
                        </div>
                        <div className="text-lg font-semibold text-green-700">
                          8:30 AM - 9:00 PM
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-gray-500 font-medium">Sunday</span>
                          <span className="text-red-600 font-semibold">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                onClick={() => window.open('https://www.google.com/maps/search/Abatharanapuram+Vadalur', '_blank')}
              >
                <Navigation className="w-5 h-5 mr-2" />
                Find Us on Google Maps
              </Button>
            </div>

            {/* Map */}
            <div>
              <Card className="overflow-hidden shadow-lg h-full">
                <CardContent className="p-0 h-full min-h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.8!2d79.55!3d11.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54d!2sVadalur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '500px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="PrimeBooks & Stationery Location"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            How to Reach Us
          </h2>
          <div className="bg-amber-50 border-l-4 border-l-amber-600 p-6 rounded-lg text-left">
            <p className="text-gray-700 leading-relaxed mb-4">
              Our store is located in <span className="font-semibold">Abatharanapuram area of Vadalur</span>. We are well-positioned to serve students and families in Vadalur and surrounding parts of Cuddalore district.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are currently at our temporary address. For any help finding us, please visit the location on Google Maps or look for our signage in Abatharanapuram.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-xl mb-6 text-amber-50">
            Visit us in store - we're happy to help!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;