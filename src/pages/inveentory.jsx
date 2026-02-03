import React, { useContext, useEffect, useState } from "react";
import { SellerContext } from "../Context/SellerContext";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  RefreshCw,
  Settings,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  DollarSign,
  Tag,
  Hash,
  Calendar,
  ArrowRight,
  TrendingDown,
} from "lucide-react";

const Inventory = () => {
  const { inventoryItem: inventoryItems, fetchInventory } =
    useContext(SellerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, []);

  const refreshInventory = async () => {
    setIsLoading(true);
    await fetchInventory();
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Get unique categories
  const categories = [
    "all",
    ...new Set(inventoryItems.map((item) => item.category).filter(Boolean)),
  ];

  // Filter inventory items
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.quantity <= 10) ||
      (stockFilter === "out" && item.quantity === 0) ||
      (stockFilter === "in" && item.quantity > 10);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Calculate statistics
  const stats = [
    {
      label: "Total Products",
      value: inventoryItems.length,
      icon: Package,
      trend: "+8%",
      trendUp: true,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      label: "Total Value",
      value: `$${inventoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}`,
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    },
    {
      label: "In Stock",
      value: inventoryItems.reduce((sum, item) => sum + item.quantity, 0),
      icon: CheckCircle,
      trend: "+5.2%",
      trendUp: true,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    },
    {
      label: "Low Stock",
      value: inventoryItems.filter((item) => item.quantity <= 10).length,
      icon: AlertTriangle,
      trend: "-3%",
      trendUp: false,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
  ];

  // Get stock level color
  const getStockColor = (quantity) => {
    if (quantity === 0)
      return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
    if (quantity <= 10)
      return { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" };
    if (quantity <= 30)
      return { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" };
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    };
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      electronics: "from-blue-500 to-cyan-500",
      clothing: "from-emerald-500 to-green-500",
      home: "from-amber-500 to-orange-500",
      books: "from-violet-500 to-purple-500",
      beauty: "from-pink-500 to-rose-500",
      default: "from-gray-500 to-slate-500",
    };
    return colors[category?.toLowerCase()] || colors.default;
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
                  <span>Inventory</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">
                    Management
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  Inventory Management
                  <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {inventoryItems.length} items
                  </span>
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={refreshInventory}
                disabled={isLoading}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-5 h-5 text-gray-600 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg ${viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
                >
                  <Package className="w-5 h-5 text-gray-600" />
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
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      stat.trendUp
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {stat.trendUp ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {stat.trend}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>

                {/* Mini trend line */}
                <div className="flex items-end h-8 space-x-0.5">
                  {[65, 70, 75, 80, 85, 90, 95].map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm bg-gradient-to-t ${
                        index === 0
                          ? "from-blue-400 to-cyan-300"
                          : index === 1
                            ? "from-emerald-400 to-green-300"
                            : index === 2
                              ? "from-violet-400 to-purple-300"
                              : "from-amber-400 to-orange-300"
                      }`}
                      style={{
                        height: `${height * (stat.trendUp ? 1 : 0.8)}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 flex items-center space-x-4">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
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
                {(selectedCategory !== "all" || stockFilter !== "all") && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                    {
                      [
                        selectedCategory !== "all",
                        stockFilter !== "all",
                      ].filter(Boolean).length
                    }
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700"
                  >
                    <option value="all">All Categories</option>
                    {categories
                      .filter((cat) => cat !== "all")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Status
                  </label>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700"
                  >
                    <option value="all">All Stock Levels</option>
                    <option value="in">In Stock (&gt; 10)</option>
                    <option value="low">Low Stock (&lt;= 10)</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Quantity: High to Low</option>
                    <option>Name: A to Z</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-gray-700">
                    <option>Any Price</option>
                    <option>$0 - $50</option>
                    <option>$50 - $200</option>
                    <option>$200+</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Table/Grid */}
      <div className="px-6 pb-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const stockInfo = getStockColor(item.quantity);
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Header */}
                  <div
                    className={`p-4 bg-gradient-to-r ${getCategoryColor(item.category)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs text-white/90 font-medium uppercase tracking-wider">
                            {item.category || "Uncategorized"}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${stockInfo.bg} ${stockInfo.text}`}
                      >
                        {item.quantity} units
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 truncate">
                      {item.name}
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ${item.price?.toFixed(2) || "0.00"}
                      </div>
                      <div
                        className={`flex items-center text-sm ${stockInfo.text}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${stockInfo.dot} mr-2`}
                        ></div>
                        {item.quantity === 0
                          ? "Out of Stock"
                          : item.quantity <= 10
                            ? "Low Stock"
                            : "In Stock"}
                      </div>
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Stock Level</span>
                        <span>{item.quantity} units</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getCategoryColor(item.category)}`}
                          style={{
                            width: `${Math.min(100, (item.quantity / 50) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-medium">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
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
                      Stock Level
                    </th>
                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item) => {
                    const stockInfo = getStockColor(item.quantity);
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors group"
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getCategoryColor(item.category)} flex items-center justify-center`}
                            >
                              <Package className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                SKU: {item.sku || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(item.category)} text-white`}
                          >
                            {item.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="text-lg font-bold text-gray-900">
                            ${item.price?.toFixed(2) || "0.00"}
                          </div>
                          <div className="text-xs text-gray-500">per unit</div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>{item.quantity} units</span>
                                <span>
                                  {Math.round((item.quantity / 50) * 100)}%
                                </span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${getCategoryColor(item.category)}`}
                                  style={{
                                    width: `${Math.min(100, (item.quantity / 50) * 100)}%`,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${stockInfo.dot}`}
                            ></div>
                            <span
                              className={`text-sm font-semibold ${stockInfo.text}`}
                            >
                              {item.quantity === 0
                                ? "Out of Stock"
                                : item.quantity <= 10
                                  ? "Low Stock"
                                  : "In Stock"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="py-16 px-6 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchQuery ||
                  selectedCategory !== "all" ||
                  stockFilter !== "all"
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "Your inventory is empty. Start by adding your first product."}
                </p>
                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold">
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Product</span>
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="px-6 py-5 bg-white border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600 font-medium">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    1-{Math.min(10, filteredItems.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredItems.length}
                  </span>{" "}
                  products
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-4 py-2.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
                    1
                  </button>
                  <button className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700">
                    2
                  </button>
                  <button className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
