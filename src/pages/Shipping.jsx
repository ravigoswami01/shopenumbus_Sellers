import React, { useContext, useEffect, useState } from 'react';
import { Package, Truck, Clock, MapPin, Plus, Search, Filter, Eye, Edit, Download } from 'lucide-react';
import {SellerContext} from "../Context/SellerContext"

const Shipping = () => {
    const { SetOrder, fetchOrderList, order: orders } = useContext(SellerContext);

  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      fetchOrderList();
    }, []);

   const mapOrderStatusToShipmentStatus = (orderStatus) => {
    switch (orderStatus?.toLowerCase()) {
      case 'order placed':
        return 'pending';
      case 'shipped':
      case 'out for delivery':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      default:
        return 'pending';
    }
  };

   const transformOrdersToShipments = (orders) => {
    if (!orders || !Array.isArray(orders)) return [];
    
    return orders.map((order) => ({
      id: order._id,
      customer: `${order.address?.firstName || ''} ${order.address?.lastName || ''}`.trim() || 'Unknown Customer',
      address: `${order.address?.street || ''}, ${order.address?.city || ''}, ${order.address?.state || ''} ${order.address?.zipCode || ''}`.replace(/^,\s*|,\s*$/, ''),
      items: order.items?.length || 0,
      count: `${order.items?.length || 0}`,
      status: mapOrderStatusToShipmentStatus(order.status),
      date: order.date ? new Date(order.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      carrier: order.carrier || 'TBD', 
      tracking: order.trackingNumber || 'Pending',
      amount: order.amount,
      paymentMethod: order.paymentMethode,
      payment: order.payment,
      phone: order.address?.phoneNumber,
      email: order.address?.email
    }));
  };

  const shipments = transformOrdersToShipments(orders);
  const getStats = () => {
    const stats = {
      pending: 0,
      shipped: 0,
      delivered: 0,
      totalRevenue: 0
    };

    shipments.forEach(shipment => {
      stats[shipment.status]++;
      stats.totalRevenue += shipment.amount || 0;
    });

    return stats;
  };

  const stats = getStats();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredShipments = shipments.filter(shipment => 
    (activeTab === 'all' || shipment.status === activeTab) &&
    (shipment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
     shipment.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Shipping Center</h1>
                <p className="text-sm text-gray-500">Manage your orders and shipments</p>
              </div>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Create Shipment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">{stats.shipped}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tabs and Search */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {['all', 'pending', 'shipped', 'delivered'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Shipments Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.length > 0 ? (
                  filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{shipment.id.slice(-8)}</div>
                        <div className="text-sm text-gray-500">{shipment.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{shipment.customer}</div>
                        {shipment.phone && (
                          <div className="text-sm text-gray-500">{shipment.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{shipment.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shipment.items} items</div>
                        <div className="text-sm text-gray-500">{shipment.weight}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(shipment.status)}`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{shipment.carrier}</div>
                        <div className="text-sm text-gray-500">{shipment.tracking}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 p-1" title="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1" title="Edit Order">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1" title="Download Invoice">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Package className="h-8 w-8 text-gray-400 mb-2" />
                        <p>No shipments found</p>
                        {searchQuery && (
                          <p className="text-sm">Try adjusting your search criteria</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(filteredShipments.length, 10)}</span> of{' '}
                <span className="font-medium">{filteredShipments.length}</span> results
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
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

export default Shipping;