import React from 'react';
import { BookOpen, Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-600 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-base">PrimeBooks & Stationery</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for books and stationery in Vadalur. Quality materials for every student and professional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-amber-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-amber-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-sm hover:text-amber-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Abatharanapuram, Vadalur,<br />
                  Cuddalore - 607303
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Mon-Sat: 8:30 AM - 9 PM<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="font-bold text-white mb-4">Store Location</h3>
            <p className="text-sm leading-relaxed mb-4">
              Abatharanapuram<br />
              Vadalur, Cuddalore<br />
              Tamil Nadu - 607303
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} PrimeBooks & Stationery. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Serving students and families in Vadalur with quality books and stationery
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;