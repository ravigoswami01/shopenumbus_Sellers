import { Outlet } from "react-router-dom";
import {
  BarChart3,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Clock,
  Eye,
  ChevronRight,
  MoreVertical,
  Download,
  Filter,
  Search,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useContext, useState, useMemo } from "react";
import { SellerContext } from "../Context/SellerContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { fetchProductList, products, order, revenu, Setrevenu, getReveanu } =
    useContext(SellerContext);

  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("monthly");

  useEffect(() => {
    getReveanu();
  }, []);

  // Calculate stats with memoization
  const stats = useMemo(() => [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: "Total Orders",
      value: order?.length || 0,
      change: "+12.5%",
      changeType: "positive",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      trend: [65, 70, 75, 68, 80, 85, 90],
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      label: "Revenue",
      value: `$${
        order?.reduce((sum, order) => sum + order.amount, 0).toLocaleString() ||
        0
      }`,
      change: "+8.2%",
      changeType: "positive",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      trend: [45, 50, 55, 60, 65, 70, 75],
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: "Products",
      value: products.length || 0,
      change: "+3.1%",
      changeType: "positive",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      trend: [30, 35, 40, 38, 42, 45, 47],
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Customers",
      value: "843",
      change: "+6.7%",
      changeType: "positive",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      trend: [55, 60, 65, 70, 75, 80, 85],
    },
  ], [order, products]);

  // Enhanced recent orders with status badges
  const recentOrders = useMemo(() => 
    order?.slice(0, 5).map((order, idx) => ({
      ...order,
      id: order._id?.slice(-6).toUpperCase() || `ORD${1000 + idx}`,
      status: order.status || "processing",
      customer: `Customer ${idx + 1}`,
      items: Math.floor(Math.random() * 5) + 1,
    })) || []
  , [order]);

  // Top products by sales
  const topProducts = useMemo(() => 
    products.slice(0, 3).map((product, idx) => ({
      ...product,
      sales: product.sales || Math.floor(Math.random() * 100) + 50,
      growth: idx === 0 ? "+24%" : idx === 1 ? "+18%" : "+12%",
    }))
  , [products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Seller Portal</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-medium text-gray-900">Overview</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, products..."
                  className="pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white w-64 transition-all"
                />
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                {["overview", "analytics", "reports"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Summary with Time Range */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Performance Summary</h2>
              <p className="text-sm text-gray-600">Key metrics for your store</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                {["daily", "weekly", "monthly"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                      timeRange === range
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.bgColor} rounded-2xl border border-gray-200/50 p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      stat.changeType === "positive"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>

                  {/* Mini trend line */}
                  <div className="flex items-end h-8 space-x-0.5">
                    {stat.trend.map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm bg-gradient-to-t ${
                          idx === 0 ? "from-blue-400 to-blue-300" :
                          idx === 1 ? "from-emerald-400 to-emerald-300" :
                          idx === 2 ? "from-amber-400 to-amber-300" : "from-violet-400 to-violet-300"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                  <p className="text-sm text-gray-600">Revenue and order trends</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>

              <div className="relative h-72">
                {/* Chart Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="border-r border-gray-100" />
                      ))}
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="border-t border-gray-100" />
                      ))}
                    </div>
                    
                    {/* Chart Bars */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-8 h-48">
                      {[65, 80, 75, 90, 85, 70, 95].map((height, i) => (
                        <div key={i} className="relative group">
                          <div
                            className="w-10 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-300 hover:opacity-90"
                            style={{ height: `${height}%` }}
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            ${(height * 100).toLocaleString()}
                          </div>
                          <div className="text-center mt-2 text-sm text-gray-600">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Last updated: Just now
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <p className="text-sm text-gray-600">Latest customer orders</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, idx) => (
                <div
                  key={idx}
                  className="group p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        order.status === "completed" ? "bg-emerald-50" :
                        order.status === "processing" ? "bg-blue-50" : "bg-amber-50"
                      }`}>
                        <ShoppingCart className={`w-4 h-4 ${
                          order.status === "completed" ? "text-emerald-600" :
                          order.status === "processing" ? "text-blue-600" : "text-amber-600"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "completed" ? "bg-emerald-100 text-emerald-800" :
                      order.status === "processing" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {order.items} items • ${order.amount}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {order.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>View All Orders</span>
            </button>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <p className="text-sm text-gray-600">Best selling items</p>
              </div>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    idx === 0 ? "bg-emerald-50 text-emerald-700" :
                    idx === 1 ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {product.growth}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Revenue from Top Products</span>
                <span className="font-semibold text-gray-900">$12,459</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                <p className="text-sm text-gray-600">Store health metrics</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-emerald-600 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Good</span>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Customer Satisfaction", value: 94, color: "bg-emerald-500" },
                { label: "Order Accuracy", value: 98, color: "bg-blue-500" },
                { label: "Response Time", value: 85, color: "bg-amber-500" },
                { label: "Inventory Turnover", value: 72, color: "bg-violet-500" },
              ].map((metric, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Store health is excellent</p>
                  <p className="text-xs text-gray-600 mt-1">All metrics are above industry standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <p className="text-sm text-gray-300">Manage your store</p>
            </div>

            <div className="space-y-3">
              {[
                { icon: Package, label: "Add New Product", color: "from-blue-500 to-cyan-500" },
                { icon: ShoppingCart, label: "Process Orders", color: "from-emerald-500 to-green-500" },
                { icon: Users, label: "View Customers", color: "from-violet-500 to-purple-500" },
                { icon: BarChart3, label: "Generate Report", color: "from-amber-500 to-orange-500" },
              ].map((action, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{action.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <AlertCircle className="w-4 h-4" />
                <span>Next inventory check: Tomorrow, 9 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;