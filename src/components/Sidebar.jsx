import React, { useState } from "react";
import {
  Store,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  BarChart3,
  DollarSign,
  Truck,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "products", icon: Package, label: "Products" },
    { id: "orders", icon: ShoppingCart, label: "Orders" },
    { id: "inventory", icon: Store, label: "Inventory" },
    { id: "analytics", icon: TrendingUp, label: "Analytics" },
    { id: "revenue", icon: DollarSign, label: "Revenue" },
    { id: "shipping", icon: Truck, label: "Shipping" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } min-h-screen bg-white border-r border-gray-200 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b">
        {!isCollapsed && (
          <h1 className="text-lg font-semibold text-gray-900">
            Seller Dashboard
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <NavLink
            key={id}
            to={`/${id}`}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {/* Active Indicator */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r 
              bg-gray-900 opacity-0 group-[.active]:opacity-100`}
            />

            <Icon size={18} className="shrink-0" />

            {!isCollapsed && <span>{label}</span>}

            {/* Tooltip when collapsed */}
            {isCollapsed && (
              <span className="absolute left-full ml-3 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                {label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
