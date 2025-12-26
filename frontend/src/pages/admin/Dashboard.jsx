import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package,
    MessageSquare,
    Image as GalleryIcon,
    LogOut,
    Plus,
    Trash2,
    Edit2,
    CheckCircle2,
    BookOpen,
    Loader2,
    Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllReviews,
    approveReview,
    deleteReview,
    createReviewAdmin,
    updateReviewAdmin,
    getGallery,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    getAdminMe,
    changePassword
} from '@/services/api';
import { toast } from 'sonner';

const AdminDashboard = () => {
    const [admin, setAdmin] = useState(null);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    // Modal States
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form States
    const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category: 'school', availability: 'In Stock' });
    const [galleryForm, setGalleryForm] = useState({ title: '', description: '', image_url: '', display_order: 1 });
    const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) });
    const [securityForm, setSecurityForm] = useState({ old_password: '', new_password: '', confirm_password: '' });

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [adminData, productsData, reviewsData, galleryData] = await Promise.all([
                getAdminMe(token),
                getProducts(),
                getAllReviews(token),
                getGallery()
            ]);
            setAdmin(adminData);
            setProducts(productsData);
            setReviews(reviewsData);
            setGallery(galleryData);
        } catch (error) {
            toast.error('Session expired. Please login again.');
            localStorage.removeItem('adminToken');
            navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        toast.success('Logged out successfully');
        navigate('/admin/login');
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (securityForm.new_password !== securityForm.confirm_password) {
            toast.error("New passwords don't match");
            return;
        }
        setSubmitLoading(true);
        try {
            await changePassword({
                old_password: securityForm.old_password,
                new_password: securityForm.new_password
            }, token);
            toast.success('Password updated successfully');
            setIsSecurityModalOpen(false);
            setSecurityForm({ old_password: '', new_password: '', confirm_password: '' });
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to update password');
        } finally {
            setSubmitLoading(false);
        }
    };

    // --- Product CRUD ---
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const data = { ...productForm, price: parseFloat(productForm.price) };
            if (editingItem) {
                const updated = await updateProduct(editingItem._id, data, token);
                setProducts(products.map(p => p._id === updated._id ? updated : p));
                toast.success('Product updated');
            } else {
                const created = await createProduct(data, token);
                setProducts([created, ...products]);
                toast.success('Product created');
            }
            setIsProductModalOpen(false);
            resetProductForm();
        } catch (error) {
            toast.error('Operation failed');
        } finally {
            setSubmitLoading(false);
        }
    };

    const resetProductForm = () => {
        setProductForm({ name: '', description: '', price: '', category: 'school', availability: 'In Stock' });
        setEditingItem(null);
    };

    const openProductEdit = (product) => {
        setEditingItem(product);
        setProductForm({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            category: product.category,
            availability: product.availability
        });
        setIsProductModalOpen(true);
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await deleteProduct(id, token);
            setProducts(products.filter(p => p._id !== id));
            toast.success('Product removed');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    // --- Review CRUD ---
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const data = { ...reviewForm, rating: parseInt(reviewForm.rating) };
            if (editingItem) {
                const updated = await updateReviewAdmin(editingItem._id, data, token);
                setReviews(reviews.map(r => r._id === updated._id ? updated : r));
                toast.success('Review updated');
            } else {
                const created = await createReviewAdmin(data, token);
                setReviews([created, ...reviews]);
                toast.success('Review added');
            }
            setIsReviewModalOpen(false);
            resetReviewForm();
        } catch (error) {
            toast.error('Operation failed');
        } finally {
            setSubmitLoading(false);
        }
    };

    const resetReviewForm = () => {
        setReviewForm({ name: '', rating: 5, comment: '', date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) });
        setEditingItem(null);
    };

    const openReviewEdit = (review) => {
        setEditingItem(review);
        setReviewForm({
            name: review.name,
            rating: review.rating,
            comment: review.comment,
            date: review.date
        });
        setIsReviewModalOpen(true);
    };

    const handleApproveReview = async (id) => {
        try {
            await approveReview(id, token);
            setReviews(reviews.map(r => r._id === id ? { ...r, approved: true } : r));
            toast.success('Review approved');
        } catch (error) {
            toast.error('Failed to approve');
        }
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await deleteReview(id, token);
            setReviews(reviews.filter(r => r._id !== id));
            toast.success('Review removed');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    // --- Gallery CRUD ---
    const handleGallerySubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            if (editingItem) {
                const updated = await updateGalleryItem(editingItem._id, galleryForm, token);
                setGallery(gallery.map(g => g._id === updated._id ? updated : g));
                toast.success('Gallery item updated');
            } else {
                const created = await createGalleryItem(galleryForm, token);
                setGallery([created, ...gallery]);
                toast.success('Gallery item added');
            }
            setIsGalleryModalOpen(false);
            resetGalleryForm();
        } catch (error) {
            toast.error('Operation failed');
        } finally {
            setSubmitLoading(false);
        }
    };

    const resetGalleryForm = () => {
        setGalleryForm({ title: '', description: '', image_url: '', display_order: 1 });
        setEditingItem(null);
    };

    const openGalleryEdit = (item) => {
        setEditingItem(item);
        setGalleryForm({
            title: item.title,
            description: item.description,
            image_url: item.image_url,
            display_order: item.display_order
        });
        setIsGalleryModalOpen(true);
    };

    const handleDeleteGallery = async (id) => {
        if (!window.confirm('Delete this image?')) return;
        try {
            await deleteGalleryItem(id, token);
            setGallery(gallery.filter(g => g._id !== id));
            toast.success('Item removed');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
        </div>
    );

    return (
        <Tabs defaultValue="products" className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white border-r p-6 flex flex-col sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center gap-2 mb-10">
                    <div className="bg-amber-600 p-2 rounded-lg">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-nowrap">PrimeBooks Admin</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Menu</p>
                    <TabsList className="flex flex-col h-auto bg-transparent border-0 p-0 gap-1 items-stretch text-left">
                        <TabsTrigger value="products" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-none hover:bg-gray-50 transition-all font-medium border-l-4 border-transparent data-[state=active]:border-amber-600">
                            <Package className="w-5 h-5 mr-3" /> Products
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-none hover:bg-gray-50 transition-all font-medium border-l-4 border-transparent data-[state=active]:border-amber-600">
                            <MessageSquare className="w-5 h-5 mr-3" /> Reviews
                        </TabsTrigger>
                        <TabsTrigger value="gallery" className="justify-start px-4 py-3 h-auto data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-none hover:bg-gray-50 transition-all font-medium border-l-4 border-transparent data-[state=active]:border-amber-600">
                            <GalleryIcon className="w-5 h-5 mr-3" /> Gallery
                        </TabsTrigger>
                    </TabsList>

                    <div className="mt-8 pt-4 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">System</p>
                        <Button
                            variant="ghost"
                            className="w-full justify-start px-4 py-3 h-auto text-gray-600 hover:bg-amber-50 hover:text-amber-700 font-medium border-l-4 border-transparent hover:border-amber-600 transition-all"
                            onClick={() => setIsSecurityModalOpen(true)}
                        >
                            <Lock className="w-5 h-5 mr-3" /> Change Password
                        </Button>
                    </div>
                </nav>

                <div className="pt-6 border-t mt-auto">
                    <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-bold text-gray-900 truncate">{admin?.username}</p>
                        <p className="text-xs text-gray-500 truncate">{admin?.email}</p>
                    </div>
                    <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 border-red-200" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
                        <p className="text-gray-500">Welcome back, {admin?.username}</p>
                    </div>
                    <TabsList className="bg-white border p-1 rounded-xl hidden md:flex">
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>
                </div>

                {/* --- Products Tab --- */}
                <TabsContent value="products" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Catalog ({products.length})</h2>
                        <Dialog open={isProductModalOpen} onOpenChange={(val) => { setIsProductModalOpen(val); if (!val) resetProductForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-amber-700 hover:bg-amber-800">
                                    <Plus className="w-4 h-4 mr-2" /> Add Product
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{editingItem ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleProductSubmit} className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Product Name</label>
                                        <Input placeholder="e.g. Class 12 Math Guide" required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <Input placeholder="Brief details about the book" required value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Price (₹)</label>
                                            <Input type="number" placeholder="299" required value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Category</label>
                                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                                                <option value="school">School Books</option>
                                                <option value="guides">Guides</option>
                                                <option value="competitive">Competitive Exam</option>
                                                <option value="kids">Kids Books</option>
                                                <option value="stationery">Stationery</option>
                                            </select>
                                        </div>
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <Button type="submit" className="w-full bg-amber-700" disabled={submitLoading}>
                                            {submitLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            {editingItem ? 'Save Changes' : 'Create Product'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b bg-gray-50/50">
                                            <th className="py-4 font-bold px-6 text-sm text-gray-600 uppercase">Product</th>
                                            <th className="py-4 font-bold px-6 text-sm text-gray-600 uppercase">Category</th>
                                            <th className="py-4 font-bold px-6 text-sm text-gray-600 uppercase">Price</th>
                                            <th className="py-4 font-bold px-6 text-sm text-gray-600 uppercase text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {products.map(product => (
                                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <p className="font-bold text-gray-900">{product.name}</p>
                                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded font-bold uppercase">{product.category}</span>
                                                </td>
                                                <td className="py-4 px-6 font-bold text-gray-900">₹{product.price}</td>
                                                <td className="py-4 px-6 text-right space-x-2">
                                                    <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50" onClick={() => openProductEdit(product)}>
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDeleteProduct(product._id)}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- Reviews Tab --- */}
                <TabsContent value="reviews" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Feedback Management ({reviews.length})</h2>
                        <Dialog open={isReviewModalOpen} onOpenChange={(val) => { setIsReviewModalOpen(val); if (!val) resetReviewForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-amber-700 hover:bg-amber-800">
                                    <Plus className="w-4 h-4 mr-2" /> Add Review
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{editingItem ? 'Edit Review' : 'Add Manual Review'}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleReviewSubmit} className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Customer Name</label>
                                        <Input placeholder="e.g. John Doe" required value={reviewForm.name} onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Rating (1-5)</label>
                                            <Input type="number" min="1" max="5" required value={reviewForm.rating} onChange={e => setReviewForm({ ...reviewForm, rating: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Date</label>
                                            <Input placeholder="e.g. December 2025" required value={reviewForm.date} onChange={e => setReviewForm({ ...reviewForm, date: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Comment</label>
                                        <Input placeholder="What did the customer say?" required value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} />
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <Button type="submit" className="w-full bg-amber-700" disabled={submitLoading}>
                                            {submitLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            {editingItem ? 'Update Review' : 'Save Review'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {reviews.map(review => (
                            <Card key={review._id} className={!review.approved ? 'border-orange-200 bg-orange-50/20' : ''}>
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg">{review.name}</h3>
                                                <div className="flex gap-0.5 text-amber-500">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i} className={i < review.rating ? 'fill-current' : 'text-gray-300'}>★</span>
                                                    ))}
                                                </div>
                                                {!review.approved && <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Pending Approval</span>}
                                            </div>
                                            <p className="text-gray-700">"{review.comment}"</p>
                                            <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0 self-end md:self-center">
                                            {!review.approved && (
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveReview(review._id)}>
                                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50" onClick={() => openReviewEdit(review)}>
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 border-red-200" onClick={() => handleDeleteReview(review._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* --- Gallery Tab --- */}
                <TabsContent value="gallery" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Visual Assets ({gallery.length})</h2>
                        <Dialog open={isGalleryModalOpen} onOpenChange={(val) => { setIsGalleryModalOpen(val); if (!val) resetGalleryForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-amber-700 hover:bg-amber-800">
                                    <Plus className="w-4 h-4 mr-2" /> Add Image
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{editingItem ? 'Edit Gallery Item' : 'Add Gallery Image'}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleGallerySubmit} className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Image Title</label>
                                        <Input placeholder="e.g. Store Interior" required value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">URL</label>
                                        <Input placeholder="https://unsplash.com/..." required value={galleryForm.image_url} onChange={e => setGalleryForm({ ...galleryForm, image_url: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <Input placeholder="Short caption" value={galleryForm.description} onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })} />
                                    </div>
                                    <DialogFooter className="pt-4">
                                        <Button type="submit" className="w-full bg-amber-700" disabled={submitLoading}>
                                            {submitLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            {editingItem ? 'Save Changes' : 'Add to Gallery'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gallery.map(item => (
                            <Card key={item._id} className="overflow-hidden group">
                                <div className="aspect-video bg-gray-100 relative">
                                    <img src={item.image_url || 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=800'} alt={item.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button variant="secondary" size="sm" onClick={() => openGalleryEdit(item)}>
                                            <Edit2 className="w-4 h-4 mr-2" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteGallery(item._id)}>
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h4 className="font-bold truncate">{item.title}</h4>
                                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </div>

            {/* Change Password Modal */}
            <Dialog open={isSecurityModalOpen} onOpenChange={setIsSecurityModalOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-amber-600" />
                            Security Settings
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleChangePassword} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Current Password</label>
                            <Input
                                type="password"
                                required
                                value={securityForm.old_password}
                                onChange={e => setSecurityForm({ ...securityForm, old_password: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">New Password</label>
                            <Input
                                type="password"
                                required
                                value={securityForm.new_password}
                                onChange={e => setSecurityForm({ ...securityForm, new_password: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm New Password</label>
                            <Input
                                type="password"
                                required
                                value={securityForm.confirm_password}
                                onChange={e => setSecurityForm({ ...securityForm, confirm_password: e.target.value })}
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800" disabled={submitLoading}>
                                {submitLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Update Password
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Tabs>
    );
};

export default AdminDashboard;
