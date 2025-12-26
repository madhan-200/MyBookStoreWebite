import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Card } from '../components/ui/card';
import { getGallery } from '../services/api';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGallery();
      setGalleryItems(data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-600">
            Take a look at our store, products, and happy customers
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
              <p className="text-xl text-gray-500">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((image) => (
                <Card key={image._id} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {image.image_url ? (
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-amber-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{image.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visit Store CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Visit Our Store in Person
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Experience the complete range of books and stationery at our Vadalur location
          </p>
        </div>
      </section>
    </div>
  );
};

export default Gallery;