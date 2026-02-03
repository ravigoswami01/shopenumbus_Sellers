import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, MoreVertical, Users, TrendingUp, Eye, Edit, Trash2, Star } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredRow, setHoveredRow] = useState(null);

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      avatar: 'JD',
      lastSeen: '2 hours ago',
      orders: 12,
      value: '$2,450',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      status: 'Inactive',
      avatar: 'JS',
      lastSeen: '3 days ago',
      orders: 8,
      value: '$1,680',
      rating: 4.2
    },
    {
      id: 3,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 456-7890',
      status: 'Active',
      avatar: 'AJ',
      lastSeen: '1 hour ago',
      orders: 23,
      value: '$4,280',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 (555) 321-0987',
      status: 'Pending',
      avatar: 'SW',
      lastSeen: '30 minutes ago',
      orders: 5,
      value: '$890',
      rating: 4.1
    }
  ];

  const stats = [
    { label: 'Total Customers', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Users', value: '1,943', change: '+8%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'New This Month', value: '184', change: '+23%', icon: Star, color: 'bg-purple-500' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || customer.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Customer Management
              </h1>
              <p className="text-slate-600 text-lg">Manage and track your customer relationships</p>
            </div>
            <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Plus size={20} />
              Add Customer
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
                    <p className="text-green-600 text-sm font-semibold mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          {/* Search and Filters */}
          <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white/50 to-slate-50/50">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-200 flex items-center gap-2">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 border-b border-slate-200/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Orders</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Value</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                    onMouseEnter={() => setHoveredRow(customer.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                          {customer.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{customer.name}</p>
                          <p className="text-sm text-slate-500">Last seen {customer.lastSeen}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={14} />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone size={14} />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">{customer.orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-green-600">{customer.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="font-semibold text-slate-800">{customer.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 transition-all duration-200 ${hoveredRow === customer.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-600">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-green-100 rounded-lg transition-colors duration-200 text-green-600">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200 text-red-600">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-50/50 to-white/50 border-t border-slate-200/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold">1</span> to <span className="font-semibold">{filteredCustomers.length}</span> of{' '}
                <span className="font-semibold">{customers.length}</span> results
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm font-medium">
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                  1
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm font-medium">
                  2
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 text-sm font-medium">
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

export default Customers;