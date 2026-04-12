import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase';

export default function AdminPage() {
    // Auth State
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Business Logic State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price_per_kg: '',
        stock_status: 'In Stock',
        description: '',
        image: null,
        image_url: '',
        stock: 0
    });
    const [isSaving, setIsSaving] = useState(false);

    // Toasts
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) {
            fetchProducts();
        }
    }, [session]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setProducts(data || []);
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoading(true);
        setAuthError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            showToast("Welcome back!", "success");
        } catch (err) {
            setAuthError(err.message);
            showToast(err.message, "error");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        showToast("Successfully logged out.", "success");
    };

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const deleteProduct = async (id) => {
        if (!confirm("Are you sure you want to permanently delete this product?")) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            showToast("Product deleted.", "success");
            fetchProducts();
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price_per_kg: product.price_per_kg,
                stock_status: product.stock_status || 'In Stock',
                description: product.description,
                image_url: product.image_url,
                image: null
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                price_per_kg: '',
                stock_status: 'In Stock',
                description: '',
                image_url: '',
                image: null,
                stock: 0
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let publicUrl = formData.image_url;

            if (formData.image) {
                const file = formData.image;
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file, { cacheControl: '3600', upsert: false });

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName);
                publicUrl = publicUrlData.publicUrl;
            }

            const payload = {
                name: formData.name,
                description: formData.description,
                price_per_kg: parseFloat(formData.price_per_kg),
                image_url: publicUrl,
                stock_status: formData.stock_status,
                stock: parseInt(formData.stock) || 0
            };

            if (editingProduct) {
                const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id);
                if (error) throw error;
                showToast("Product updated successfully!", "success");
            } else {
                const { error } = await supabase.from('products').insert([payload]);
                if (error) throw error;
                showToast("Product created successfully!", "success");
            }

            fetchProducts();
            closeModal();
        } catch (err) {
            showToast(err.message, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const updateProductStock = async (id, newStock) => {
        try {
            const val = parseInt(newStock);
            if (isNaN(val)) return;

            const { error } = await supabase
                .from('products')
                .update({ stock: val })
                .eq('id', id);

            if (error) throw error;
            showToast("Stock updated!", "success");
            fetchProducts();
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortOrder === 'price_desc') return b.price_per_kg - a.price_per_kg;
        if (sortOrder === 'price_asc') return a.price_per_kg - b.price_per_kg;
        if (sortOrder === 'name_asc') return a.name.localeCompare(b.name);
        return new Date(b.created_at) - new Date(a.created_at);
    });

    if (!session) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center font-sans">
                <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-sm mx-4">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Admin Login</h2>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Kamal Sea Food Inventory</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                class="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-sm font-medium transition-all"
                                placeholder="admin@kamalseafood.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                class="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-sm font-medium transition-all"
                                placeholder="••••••••" />
                        </div>
                        <button type="submit" disabled={authLoading}
                            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-md bg-gray-900 text-white text-sm font-bold focus:outline-none mt-2 transition-transform active:scale-95 ${authLoading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}>
                            {authLoading ? 'Signing In...' : 'Sign In Securely'}
                        </button>
                    </form>
                    {authError && (
                        <p className="text-red-500 font-bold bg-red-50 p-3 rounded-xl text-sm mt-5 text-center border border-red-100">
                            {authError}
                        </p>
                    )}
                </div>
                {/* Toast Container */}
                <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3">
                    {toasts.map(t => (
                        <div key={t.id} className={`flex items-center p-4 rounded-xl shadow-xl border-l-4 bg-white max-w-sm ${t.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
                            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 mr-3 ${t.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                <span className="material-symbols-outlined text-[20px]">{t.type === 'success' ? 'check_circle' : 'error'}</span>
                            </div>
                            <div className="text-sm font-bold text-gray-900 tracking-tight">{t.message}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen flex font-sans antialiased overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111111] text-gray-300 flex flex-col z-[100] flex-shrink-0 transition-transform duration-300 hidden md:flex">
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 flex-shrink-0">
                    <span className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-500">water</span>
                        Kamal Admin
                    </span>
                </div>
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                    <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/50 text-white font-bold transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
                    </a>
                    <a onClick={() => openModal()} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/50 hover:text-white transition-colors font-medium cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">add_circle</span> Add Product
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-gray-800 text-red-400 hover:text-red-300 transition-colors font-bold">
                        <span className="material-symbols-outlined text-[20px]">logout</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-10 z-10 flex-shrink-0">
                    <div className="relative w-full max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-[9px] text-gray-400 text-[20px]">search</span>
                        <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            class="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => openModal()} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:scale-[1.02] transition-transform">
                            <span className="material-symbols-outlined text-[18px]">add</span> Add Product
                        </button>
                        <div className="h-8 border-l border-gray-200 mx-2"></div>
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs ring-2 ring-white shadow-sm">KS</div>
                    </div>
                </header>

                {/* Main View Area */}
                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inventory Overview</h1>
                            <p className="text-sm text-gray-500 mt-1 font-medium">Manage your product catalog entirely.</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-blue-500">inventory_2</span>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Total Items</p>
                                </div>
                                <h3 className="text-4xl font-black text-gray-900">{products.length}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-yellow-500">warning</span>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Low Stock</p>
                                </div>
                                <h3 className="text-4xl font-black text-yellow-600">{products.filter(p => p.stock > 0 && p.stock <= 5).length}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-red-500">error</span>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Out of Stock</p>
                                </div>
                                <h3 className="text-4xl font-black text-red-600">{products.filter(p => !p.stock || p.stock === 0).length}</h3>
                            </div>
                        </div>

                        {/* Critical Alerts */}
                        {products.some(p => !p.stock || p.stock === 0) && (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4 animate-pulse">
                                <span className="material-symbols-outlined text-red-500">campaign</span>
                                <p className="text-red-700 text-sm font-bold truncate">
                                    Attention: {products.filter(p => !p.stock || p.stock === 0).length} product(s) are OUT OF STOCK. Please update inventory.
                                </p>
                            </div>
                        )}

                        {/* Action Bar */}
                        <div className="flex items-center justify-between gap-4">
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
                                class="bg-white border-gray-200 text-sm font-medium rounded-xl py-2 pl-4 pr-10 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                                <option value="newest">Newest First</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="name_asc">Name: A-Z</option>
                            </select>
                            <button onClick={fetchProducts} className="text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-xl flex items-center shadow-sm transition-colors text-sm font-bold">
                                <span className="material-symbols-outlined text-[18px] mr-2">refresh</span> Refresh
                            </button>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead className="bg-gray-50/80 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest pl-8">Product Details</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Price / kg</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Inventory</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right pr-8">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr><td colSpan="4" class="px-6 py-20 text-center text-gray-400"><div class="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div></td></tr>
                                    ) : filteredProducts.length === 0 ? (
                                        <tr><td colSpan="4" class="px-6 py-20 text-center text-gray-500 font-bold">No products found.</td></tr>
                                    ) : (
                                        filteredProducts.map(p => (
                                            <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
                                                <td className="px-6 py-4 pl-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                                                            <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-gray-900">{p.name}</div>
                                                            <div className="text-[11px] font-medium text-gray-500 truncate max-w-[200px] mt-0.5">{p.description}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-black text-gray-900">₹{p.price_per_kg}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <input 
                                                            type="number" 
                                                            defaultValue={p.stock || 0}
                                                            onBlur={(e) => updateProductStock(p.id, e.target.value)}
                                                            className={`w-20 px-3 py-1.5 rounded-lg border text-sm font-bold focus:ring-2 outline-none transition-all ${
                                                                (p.stock || 0) === 0 ? 'bg-red-50 border-red-200 text-red-600 focus:ring-red-100' : 
                                                                (p.stock || 0) <= 5 ? 'bg-yellow-50 border-yellow-200 text-yellow-600 focus:ring-yellow-100' : 
                                                                'bg-green-50 border-green-200 text-green-600 focus:ring-green-100'
                                                            }`}
                                                        />
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">kg</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right pr-8">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button onClick={() => openModal(p)} className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button onClick={() => deleteProduct(p.id)} className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[150] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-xl rounded-[24px] shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-gray-100">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Product Name</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required
                                        class="w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 text-sm font-bold focus:bg-white" placeholder="e.g. Medium Prawn" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Price per kg (₹)</label>
                                    <input type="number" value={formData.price_per_kg} onChange={(e) => setFormData({...formData, price_per_kg: e.target.value})} required
                                        class="w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 text-sm font-bold focus:bg-white" placeholder="0.00" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Standard Stock (kg)</label>
                                    <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required
                                        class="w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 text-sm font-bold focus:bg-white" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Stock Status Display</label>
                                    <select value={formData.stock_status} onChange={(e) => setFormData({...formData, stock_status: e.target.value})}
                                        class="w-full rounded-xl border-gray-200 bg-gray-50 py-2.5 px-4 text-sm font-bold focus:bg-white">
                                        <option value="In Stock">In Stock</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Description</label>
                                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="3"
                                        className="w-full rounded-xl border-gray-200 bg-gray-50 py-3 px-4 text-sm font-medium focus:bg-white resize-none" placeholder="Product details..."></textarea>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Product Image</label>
                                    <div className="relative h-32 w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden hover:bg-blue-50">
                                        {formData.image || formData.image_url ? (
                                            <img src={formData.image ? URL.createObjectURL(formData.image) : formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                                                <p className="text-xs font-bold uppercase tracking-widest mt-1">Upload Image</p>
                                            </div>
                                        )}
                                        <input type="file" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 flex gap-3 border-t border-gray-100">
                                <button type="button" onClick={closeModal} className="flex-1 py-3.5 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold">Cancel</button>
                                <button type="submit" disabled={isSaving} className={`flex-[2] py-3.5 px-4 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-md flex justify-center items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}>
                                    {isSaving ? 'Saving...' : <><span class="material-symbols-outlined text-[18px]">{editingProduct ? 'update' : 'save'}</span> {editingProduct ? 'Update Product' : 'Save Product'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3">
                {toasts.map(t => (
                    <div key={t.id} className={`flex items-center p-4 rounded-xl shadow-xl border-l-4 bg-white max-w-sm ${t.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
                        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-gray-50 mr-3 ${t.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            <span className="material-symbols-outlined text-[20px]">{t.type === 'success' ? 'check_circle' : 'error'}</span>
                        </div>
                        <div className="text-sm font-bold text-gray-900 tracking-tight">{t.message}</div>
                        <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="ml-auto text-gray-400 hover:text-gray-900 focus:outline-none pl-3 p-1">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
