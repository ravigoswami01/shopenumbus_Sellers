import React, { useState } from 'react';
import { Bell, Package, CreditCard, Truck, Star, X, Check, AlertCircle, ShoppingCart, Heart, Gift, Percent } from 'lucide-react';

const NotificationShowPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and is on its way!',
      timestamp: '2 hours ago',
      read: false,
      icon: Truck,
      color: 'blue'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Your payment of $299.99 has been processed successfully.',
      timestamp: '5 hours ago',
      read: false,
      icon: CreditCard,
      color: 'green'
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Package Delivered',
      message: 'Your order #12344 has been delivered to your address.',
      timestamp: '1 day ago',
      read: true,
      icon: Package,
      color: 'emerald'
    },
    {
      id: 4,
      type: 'review',
      title: 'Review Request',
      message: 'How was your recent purchase? Leave a review and earn points!',
      timestamp: '2 days ago',
      read: false,
      icon: Star,
      color: 'yellow'
    },
    
  ]);

  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconColor = (color, read) => {
    const opacity = read ? 'opacity-60' : '';
    const colorMap = {
      blue: `text-blue-500 bg-blue-50 ${opacity}`,
      green: `text-green-500 bg-green-50 ${opacity}`,
      emerald: `text-emerald-500 bg-emerald-50 ${opacity}`,
      yellow: `text-yellow-500 bg-yellow-50 ${opacity}`,
      red: `text-red-500 bg-red-50 ${opacity}`,
      purple: `text-purple-500 bg-purple-50 ${opacity}`,
      orange: `text-orange-500 bg-orange-50 ${opacity}`,
      pink: `text-pink-500 bg-pink-50 ${opacity}`
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="h-8 w-8 text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">Stay updated with your orders and activities</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                disabled={unreadCount === 0}
              >
                Mark All Read
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-xl shadow-sm border mb-6 p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Order Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Payment Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Promotions</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="flex border-b">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'read', label: 'Read', count: notifications.length - unreadCount }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 px-6 py-4 text-center font-medium border-b-2 transition duration-200 ${
                  filter === tab.key
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    filter === tab.key 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : filter === 'read'
                  ? "No read notifications to show."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm border transition duration-200 hover:shadow-md ${
                    !notification.read ? 'ring-2 ring-blue-100' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 rounded-full ${getIconColor(notification.color, notification.read)}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </h3>
                            <p className={`mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                            <p className="mt-2 text-sm text-gray-500">
                              {notification.timestamp}
                            </p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                                title="Mark as read"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                              title="Delete notification"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationShowPage;