import React, { useState, useEffect } from 'react';
import { Star, Quote, Plus, Loader2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { getReviews, submitReview } from '../services/api';
import { toast } from 'sonner';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await submitReview({
        ...formData,
        rating: parseInt(formData.rating)
      });
      toast.success('Thank you! Your review has been submitted for approval.');
      setIsModalOpen(false);
      setFormData({
        name: '',
        rating: 5,
        comment: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-5 h-5 ${star <= rating
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
          <p className="text-xl text-gray-600 mb-10">
            What our valued customers say about PrimeBooks & Stationery
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
                <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
                <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
                <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
                <Star className="w-8 h-8 text-gray-300" />
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-gray-900">3.8</div>
                <div className="text-sm text-gray-600">Based on 30+ Reviews</div>
              </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-white gap-2 h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Plus className="w-6 h-6" /> Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Share Your Experience</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Full Name</label>
                    <Input
                      placeholder="e.g. John Doe"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none transition-transform active:scale-90"
                        >
                          <Star
                            className={`w-10 h-10 ${star <= formData.rating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-gray-300'
                              }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Detailed Feedback</label>
                    <Textarea
                      placeholder="Tell us about your visit, our products, or service..."
                      className="min-h-[120px] resize-none"
                      required
                      value={formData.comment}
                      onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    />
                  </div>

                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full h-12 text-lg bg-amber-700 hover:bg-amber-800"
                      disabled={submitLoading}
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...
                        </>
                      ) : 'Submit Review'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
              <p className="text-xl text-gray-500">Loading verified reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <Quote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <Card key={review._id || idx} className="hover:shadow-xl transition-shadow relative border-none shadow-md">
                  <CardContent className="p-8">
                    <Quote className="w-12 h-12 text-amber-100 absolute top-4 right-4" />
                    <div className="mb-6">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic min-h-[100px]">
                      "{review.comment}"
                    </p>
                    <div className="border-t pt-6 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{review.name}</p>
                        <p className="text-sm text-gray-500 font-medium">{review.date}</p>
                      </div>
                      <div className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                        Verified Customer
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trusted by the Vadalur Community
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Since our rebranding to **PrimeBooks & Stationery**, we've been committed to providing the best educational resources. Your feedback helps us grow and serve you better.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-60">
            {/* Just decorative placeholders for trust indicators */}
            <div className="font-bold border px-4 py-2 rounded">Excellent Service</div>
            <div className="font-bold border px-4 py-2 rounded">Authentic Books</div>
            <div className="font-bold border px-4 py-2 rounded">Fast Support</div>
            <div className="font-bold border px-4 py-2 rounded">Verified Store</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;