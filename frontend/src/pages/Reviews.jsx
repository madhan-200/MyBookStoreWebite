import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { getReviews } from '../services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-amber-500 text-amber-500'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            What our valued customers say about us
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1">
              <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
              <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
              <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
              <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">3.8</div>
              <div className="text-sm text-gray-600">30+ Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow relative">
                <CardContent className="p-6">
                  <Quote className="w-10 h-10 text-amber-200 mb-4" />
                  <div className="mb-4">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4 italic">
                    "{review.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Trusted by Students & Families
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We take pride in serving our community with quality products and genuine service. Your satisfaction is our priority.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Reviews;