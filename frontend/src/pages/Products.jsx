import React, { useState, useEffect } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { getProducts } from '../services/api';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Products', color: 'bg-gray-600' },
    { id: 'school', name: 'School Books', color: 'bg-amber-600' },
    { id: 'guides', name: 'Study Guides', color: 'bg-blue-600' },
    { id: 'reading', name: 'General Reading', color: 'bg-green-600' },
    { id: 'stationery', name: 'Stationery', color: 'bg-red-600' }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Books & Stationery
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Browse our wide collection of books and stationery items
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className={`${
                  selectedCategory === cat.id
                    ? `${cat.color} text-white hover:opacity-90`
                    : 'border-2 hover:bg-gray-50'
                } px-6 py-5 text-base font-medium transition-all`}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              Showing {filteredProducts.length} products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full font-medium">
                          {categories.find(c => c.id === product.category)?.name}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <span className={
                        product.availability === 'In Stock'
                          ? 'text-green-600 font-medium'
                          : 'text-orange-600 font-medium'
                      }>
                        {product.availability}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 px-4 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-xl mb-6 text-amber-50">
            Call us or visit our store - we'll help you find it!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="px-8 py-6 text-lg"
            onClick={() => window.location.href = 'tel:04222392122'}
          >
            Call Us Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Products;