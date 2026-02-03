import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from '../pages/AddProduct.jsx';
import { 
  Copy, 
  Trash2, 
  Edit, 
  Eye, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Download,
  MoreVertical,
  ChevronDown,
  TrendingUp,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Tag,
  Layers,
  Image as ImageIcon,
  Hash,
  Star,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import { SellerContext } from '../Context/SellerContext.jsx';

const ProductList = () => {
  const { fetchProductList, products, setProducts } = useContext(SellerContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleAddProduct = (productData) => {
    setShowAddForm(false);
    navigate('/');
  };

  const handleDelete = (id) => {
    const updated = products.filter((product) => product._id !== id);
    setProducts(updated);
  };

  const handleClone = (product) => {
    const clonedProduct = {
      ...product,
      _id: Date.now().toString(36),
      name: product.name + ' (Clone)',
      date: new Date().toISOString()
    };
    setProducts([clonedProduct, ...products]);
  };

  const refreshProducts = async () => {
    setIsLoading(true);
    await fetchProductList();
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate statistics
  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      trend: "+8%",
      trendUp: true,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      label: "Total Value",
      value: `$${products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString()}`,
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    },
    {
      label: "Low Stock",
      value: products.filter(p => p.quantity <= 10).length,
      icon: AlertCircle,
      trend: "-3%",
      trendUp: false,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
    {
      label: "Best Sellers",
      value: products.filter(p => p.bestSeller).length,
      icon: TrendingUp,
      trend: "+15%",
      trendUp: true,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    },
  ];

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'electronics': 'bg-blue-100 text-blue-800',
      'clothing': 'bg-emerald-100 text-emerald-800',
      'home': 'bg-amber-100 text-amber-800',
      'books': 'bg-violet-100 text-violet-800',
      'beauty': 'bg-pink-100 text-pink-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category?.toLowerCase()] || colors.default;
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p._id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span>Seller Portal</span>
                  <ChevronRight className="w-4 h-4" />
                  <span>Products</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">Inventory</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  Product Management
                  <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {products.length} products
                  </span>
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={refreshProducts}
                disabled={isLoading}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <Grid className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                >
                  <List className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
              
              <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="sticky top-20 z-10 bg-gradient-to-r from-blue-50 to-cyan-50 border-y border-blue-200">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">
                    {selectedProducts.length} products selected
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedProducts([])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear selection
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  <span>Update Tags</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4" />
                  <span>Export Selected</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Selected</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl border border-gray-200 p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                    stat.trendUp
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}>
                    {stat.trendUp ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {stat.trend}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>

                {/* Mini trend line */}
                <div className="flex items-end h-8 space-x-0.5">
                  {[65, 70, 75, 80, 85, 90, 95].map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm bg-gradient-to-t ${
                        index === 0 ? "from-blue-400 to-cyan-300" :
                        index === 1 ? "from-emerald-400 to-green-300" :
                        index === 2 ? "from-amber-400 to-orange-300" : "from-violet-400 to-purple-300"
                      }`}
                      style={{ height: `${height * (stat.trendUp ? 1 : 0.8)}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm ? (
        <div className="px-6 pb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <p className="text-gray-600 mt-2">Fill in the product details below</p>
              </div>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
            </div>
            <AddProduct onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="px-6 pb-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 flex items-center space-x-4">
                  <div className="relative flex-1 max-w-lg">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products by name, description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none w-full text-gray-700 placeholder-gray-400 transition-all"
                    />
                  </div>
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-3.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                  >
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span>Filters</span>
                    {selectedCategory !== 'all' && (
                      <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                        1
                      </span>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center space-x-2 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
              
              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700"
                      >
                        <option value="all">All Categories</option>
                        {categories.filter(cat => cat !== 'all').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                      <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700">
                        <option>All Stock</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Best Seller</label>
                      <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700">
                        <option>All Products</option>
                        <option>Best Sellers Only</option>
                        <option>Non-Best Sellers</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                      <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700">
                        <option>Newest First</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Quantity: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="px-6 pb-8">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Product Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {product.image?.[0] ? (
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                      
                      {/* Quick Actions Overlay */}
                      <div className="absolute top-3 right-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleSelectProduct(product._id)}
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleClone(product)}
                          className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          title="Clone"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}>
                          {product.category || 'Uncategorized'}
                        </span>
                      </div>
                      
                      {/* Stock Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.quantity > 30 ? 'bg-emerald-100 text-emerald-800' :
                          product.quantity > 10 ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.quantity} in stock
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg truncate">{product.name}</h3>
                        {product.bestSeller && (
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Layers className="w-4 h-4 mr-1" />
                          {product.subCategory || 'No subcategory'}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <ImageIcon className="w-4 h-4 mr-1" />
                          {product.image?.length || 0} images
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(product.date).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="py-4 px-6 text-left">
                          <input
                            type="checkbox"
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onChange={handleSelectAll}
                            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-5 px-6">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product._id)}
                              onChange={() => handleSelectProduct(product._id)}
                              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                {product.image?.[0] ? (
                                  <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <ImageIcon className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex flex-col space-y-1">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)}`}>
                                {product.category || 'Uncategorized'}
                              </span>
                              <span className="text-xs text-gray-500">{product.subCategory || '-'}</span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="text-lg font-bold text-gray-900">${product.price}</div>
                            <div className="text-xs text-gray-500">per unit</div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                product.quantity > 30 ? 'bg-emerald-500' :
                                product.quantity > 10 ? 'bg-amber-500' : 'bg-red-500'
                              }`}></div>
                              <span className={`font-semibold ${
                                product.quantity > 30 ? 'text-emerald-700' :
                                product.quantity > 10 ? 'text-amber-700' : 'text-red-700'
                              }`}>
                                {product.quantity} units
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-2">
                              {product.bestSeller && (
                                <span className="inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-semibold">
                                  <Star className="w-3 h-3 mr-1 fill-current" />
                                  Best Seller
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(product.date).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleClone(product)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Clone"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchQuery || selectedCategory !== 'all' 
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "You haven't added any products yet. Start by adding your first product."
                  }
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Product</span>
                </button>
              </div>
            )}

            {/* Pagination - Can be added if needed */}
            {filteredProducts.length > 0 && (
              <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                <div>
                  Showing {filteredProducts.length} of {products.length} products
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;