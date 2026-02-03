import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SellerContext = createContext();

const SellerContextProvider = ({ children }) => {
  const BackendURL = import.meta.env.VITE_BAVKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [products, setProducts] = useState([]);
  const [order, SetOrder] = useState([]);
  const [inventoryItem, setInventryItem] = useState([]);
  const [profile, SetProfile] = useState([]);
  const [revenu, Setrevenu] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.post(
        `${BackendURL}/api/Seller/list_Product`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.products);
      return response.data;
    } catch (error) {
      console.error("Fetch Product List Error:", error.message);
    }
  };

  const fetchOrderList = async () => {
    try {
      const response = await axios.get(`${BackendURL}/api/Seller/Order_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("this is response ", response.data);

      SetOrder(response.data.orders);
    } catch (error) {
      console.error("Fetch Order List Error:", error.message);
    }
  };
  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/api/Seller/list_inventory_product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInventryItem(response.data.productInventory);
    } catch (error) {
      console.error("Fetch Product List Error:", error.message);
    }
  };

  // for profile

  const SellerProfile = async () => {
    try {
      const response = await axios.get(
        `${BackendURL}/api/Seller/Seller_Profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      SetProfile(response.data.profile);
    } catch (error) {
      console.error("Fetch Product List Error:", error.message);
    }
  };

  // for Seller profile upadete

  const updateSellerProfile = async (editableData) => {
    try {
      const response = await axios.put(
        `${BackendURL}/api/Seller/update_profileSeller`,
        editableData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Update Seller Profile Error:", error.message);
    }
  };

  /// for revenu
  const getReveanu = async () => {
    try {
      const response = await axios.get(BackendURL + "/api/Seller/Analitics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Setrevenu(response.data.revenue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    BackendURL,
    fetchProductList,
    token,
    setToken,
    products,
    setProducts,
    order,
    SetOrder,
    fetchOrderList,
    fetchInventory,
    inventoryItem,
    setInventryItem,
    SellerProfile,
    profile,
    SetProfile,
    revenu,
    Setrevenu,
    getReveanu,
    updateSellerProfile,
  };
  useEffect(() => {
    fetchProductList();
    fetchOrderList();
  }, []);

  return (
    <SellerContext.Provider value={value}>{children}</SellerContext.Provider>
  );
};

export default SellerContextProvider;
