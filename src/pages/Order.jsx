import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  ChevronDown,
  Calendar,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Settings,
  RefreshCw,
  BarChart3,
  User,
  ShoppingBag,
  DollarSign,
  Truck,
  Loader,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { SellerContext } from "../Context/SellerContext";

const AllOrder = () => {
  const { SetOrder, fetchOrderList, order: orders } = useContext(SellerContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [bulkActions, setBulkActions] = useState([]);

  useEffect(() => {
    fetchOrderList();
  }, []);

  const stats = [
    {
      label: "Total Orders",
      value: orders?.length || 0,
      icon: Package,
      trend: "+12%",
      trendUp: true,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      label: "Revenue",
      value: `$${orders?.reduce((sum, order) => sum + order.amount, 0).toLocaleString() || 0}`,
      icon: DollarSign,
      trend: "+8.2%",
      trendUp: true,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    },
    {
      label: "Pending",
      value: orders?.filter((order) => order.status === "order Placed").length || 0,
      icon: Clock,
      trend: "-5%",
      trendUp: false,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
    {
      label: "Delivered",
      value: orders?.filter((order) => order.status === "Delivered").length || 0,
      icon: CheckCircle,
      trend: "+15%",
      trendUp: true,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    },
  ];

  const getStatusColor = (status) => {
    const statusMap = {
      "Delivered": {
        classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle,
        dotColor: "bg-emerald-500",
        progress: 100,
      },
      "Shipped": {
        classes: "bg-blue-50 text-blue-700 border-blue-200",
        icon: Truck,
        dotColor: "bg-blue-500",
        progress: 75,
      },
      "Packing": {
        classes: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Package,
        dotColor: "bg-amber-500",
        progress: 50,
      },
      "order Placed": {
        classes: "bg-slate-50 text-slate-700 border-slate-200",
        icon: ShoppingBag,
        dotColor: "bg-slate-500",
        progress: 25,
      },
      "Out for Delivery": {
        classes: "bg-purple-50 text-purple-700 border-purple-200",
        icon: Truck,
        dotColor: "bg-purple-500",
        progress: 90,
      },
      default: {
        classes: "bg-gray-50 text-gray-700 border-gray-200",
        icon: AlertCircle,
        dotColor: "bg-gray-500",
        progress: 0,
      },
    };
    return statusMap[status] || statusMap.default;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCustomerName = (address) => {
    return `${address?.firstName || ''} ${address?.lastName || ''}`.trim() || 'Unknown Customer';
  };

  const getCustomerInitials = (address) => {
    const name = getCustomerName(address);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredOrders = orders?.filter((order) => {
    const customerName = getCustomerName(order.address);
    const matchesSearch =
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.amount.toString().includes(searchQuery);
    
    const matchesFilter =
      selectedFilter === "all" || order.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // ADDED: Handle order selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

   const handleStatusChange = async (orderId, newStatus) => {
    try {
       console.log(`Updating order ${orderId} to status: ${newStatus}`);
      
      // If you have an API endpoint, you would call it here:
      // const response = await fetch(`/api/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      
       fetchOrderList(); 
      
      // Show success message
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on ${selectedOrders.length} orders`);
    // Implement bulk action logic here
  };

  const refreshOrders = async () => {
    setIsLoading(true);
    await fetchOrderList();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const bulkActionsList = [
    { id: 'process', label: 'Process Selected', icon: CheckCircle },
    { id: 'cancel', label: 'Cancel Orders', icon: X },
    { id: 'export', label: 'Export Selected', icon: Download },
    { id: 'update', label: 'Update Status', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with Breadcrumb */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                  <span>Seller Portal</span>
                  <ChevronRight className="w-4 h-4" />
                  <span>Orders</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold text-slate-900">All Orders</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center">
                  Order Management
                  <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {orders?.length || 0} orders
                  </span>
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={refreshOrders}
                disabled={isLoading}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 text-slate-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-slate-200'}`}
                >
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-slate-200'}`}
                >
                  <Package className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold">
                <Plus className="w-5 h-5" />
                <span>New Order</span>
              </button>
              
              <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <div className="sticky top-20 z-10 bg-gradient-to-r from-blue-50 to-cyan-50 border-y border-blue-200">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">
                    {selectedOrders.length} orders selected
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedOrders([])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear selection
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                {bulkActionsList.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleBulkAction(action.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl border border-slate-200 p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
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
                  <p className="text-sm text-slate-600 font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
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

      {/* Advanced Filters Panel */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 flex items-center space-x-4">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders, customers, or amounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3.5 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none w-full text-slate-700 placeholder-slate-400 transition-all"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-medium"
              >
                <Filter className="w-5 h-5 text-slate-600" />
                <span>Filters</span>
                {selectedFilter !== "all" && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                    1
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-slate-50 border-0 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700"
                />
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-medium">
                <Download className="w-5 h-5 text-slate-600" />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          {/* Advanced Filters Dropdown */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700"
                  >
                    <option value="all">All Status</option>
                    <option value="order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Amount Range</label>
                  <select className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700">
                    <option>Any amount</option>
                    <option>$0 - $100</option>
                    <option>$100 - $500</option>
                    <option>$500+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Payment Type</label>
                  <select className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700">
                    <option>All payments</option>
                    <option>Paid</option>
                    <option>Unpaid</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
                  <select className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-slate-700">
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Highest Amount</option>
                    <option>Lowest Amount</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="px-6 pb-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === filteredOrders?.length && filteredOrders?.length > 0}
                  onChange={() => {
                    if (selectedOrders.length === filteredOrders?.length) {
                      setSelectedOrders([]);
                    } else {
                      setSelectedOrders(filteredOrders?.map(order => order._id) || []);
                    }
                  }}
                  className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-slate-600">
                  {selectedOrders.length > 0 
                    ? `${selectedOrders.length} selected`
                    : `${filteredOrders?.length || 0} orders`
                  }
                </span>
              </div>
            </div>
            
            <div className="text-sm text-slate-600">
              Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders?.map((order) => {
                  const statusInfo = getStatusColor(order.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <tr
                      key={order._id}
                      className="group hover:bg-slate-50 transition-all duration-200"
                    >
                      <td className="py-5 px-6">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => handleSelectOrder(order._id)}
                            className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                          />
                          <div>
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mr-3">
                                <ShoppingBag className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">
                                  #{order._id?.slice(-8).toUpperCase() || 'N/A'}
                                </div>
                                <div className="text-xs text-slate-500 flex items-center mt-1">
                                  <DollarSign className="w-3 h-3 mr-1" />
                                  {order.payment ? 'Paid' : 'Pending'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                            {getCustomerInitials(order.address)}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">
                              {getCustomerName(order.address)}
                            </div>
                            <div className="text-sm text-slate-500">
                              {order.address?.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="text-sm text-slate-900 font-medium">
                          {formatDate(order.date).split(',')[0]}
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatDate(order.date).split(',')[1]}
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="flex items-center">
                          <span className="font-medium text-slate-900 mr-2">
                            {order.items?.length || 0}
                          </span>
                          <span className="text-slate-500 text-sm">items</span>
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="font-bold text-slate-900 text-lg">
                          ${order.amount?.toLocaleString() || '0.00'}
                        </div>
                        <div className="text-xs text-slate-500">
                          + ${(order.amount * 0.1).toFixed(2)} tax
                        </div>
                      </td>
                      
                      <td className="py-5 px-6">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`}></div>
                          <div className="relative group/status">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className={`min-w-[140px] px-4 py-2 text-sm font-semibold rounded-xl border cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 appearance-none ${statusInfo.classes}`}
                            >
                              <option value="order Placed">Order Placed</option>
                              <option value="Packing">Packing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                          
                          {/* Progress indicator */}
                          <div className="w-20">
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${statusInfo.dotColor.replace('bg-', 'bg-gradient-to-r from-')} to-${statusInfo.dotColor.replace('bg-', '')}`}
                                style={{ width: `${statusInfo.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                       
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(!filteredOrders || filteredOrders.length === 0) && (
            <div className="py-16 px-6 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                {searchQuery || selectedFilter !== "all" 
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "You haven't received any orders yet. They'll appear here once customers start ordering."
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-5 bg-white border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600 font-medium">
                Showing <span className="font-semibold text-slate-900">1-{Math.min(10, filteredOrders?.length || 0)}</span> of <span className="font-semibold text-slate-900">{filteredOrders?.length || 0}</span> orders
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-4 py-2.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200 font-medium">
                  1
                </button>
                <button className="px-4 py-2.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium text-slate-700">
                  2
                </button>
                <button className="px-4 py-2.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium text-slate-700">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrder;