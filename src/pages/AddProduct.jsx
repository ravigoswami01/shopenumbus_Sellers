import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { SellerContext } from "../Context/SellerContext";

const CategoryOptions = [
  { name: "Fashion", subcategories: ["Men", "Women", "Kids", "Accessories"] },
  {
    name: "Books",
    subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics"],
  },
  {
    name: "Beauty & Personal Care",
    subcategories: ["Skincare", "Haircare", "Makeup", "Fragrances"],
  },
  {
    name: "Toys",
    subcategories: [
      "Soft Toys",
      "Learning Toys",
      "Outdoor Toys",
      "Action Figures",
    ],
  },
  {
    name: "Sports",
    subcategories: [
      "Fitness Equipment",
      "Athletic Wear",
      "Sports Accessories",
      "Outdoor Gear",
    ],
  },
  {
    name: "Grocery",
    subcategories: [
      "Fruits & Vegetables",
      "Dairy Products",
      "Snacks",
      "Beverages",
    ],
  },
  {
    name: "Electronics",
    subcategories: [
      "Smartphones & Accessories",
      "Computers & Laptops",
      "Gaming Devices",
      "Home Automation",
      "Audio & Entertainment",
      "Wearables & Smart Gadgets",
    ],
  },
  {
    name: "Home & Kitchen",
    subcategories: [
      "Kitchen Appliances",
      "Cleaning Devices",
      "Cooking Essentials",
      "Furniture & Décor",
      "Storage & Organization",
      "Lighting & Home Improvement",
    ],
  },
];

const AddProductForm = () => {
  const { BackendURL } = useContext(SellerContext);
  const [token] = useState(localStorage.getItem("token"));
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [sizeWithQty, setSizeWithQty] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat.name);
    setSubCategory(cat.subcategories[0]);
    setSizeWithQty([]);
    setQuantity("");
  };

  const handleSizeChange = (s, qty) => {
    const existing = sizeWithQty.filter((item) => item.size !== s);
    if (qty > 0) {
      setSizeWithQty([...existing, { size: s, quantity: qty }]);
    } else {
      setSizeWithQty(existing);
    }
  };

  const resetForm = () => {
    setImages([null, null, null, null]);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSubCategory("");
    setBestSeller(false);
    setSizeWithQty([]);
    setQuantity("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller);

      if (category === "Fashion") {
        formData.append("size", JSON.stringify(sizeWithQty));
      } else {
        formData.append("quantity", quantity);
      }

      images.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      const res = await axios.post(`${BackendURL}/api/Seller/add_Product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-500">Update and add new product</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <div className="relative w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:border-gray-400 transition-all duration-200">
                      <input
                        id={`file-input-${i}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, i)}
                      />
                      {img ? (
                        <div className="relative w-full h-full">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`preview-${i}`}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById(`file-input-${i}`)
                                ?.click()
                            }
                          >
                            <span className="text-white text-xs font-medium">
                              Change
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="cursor-pointer w-full h-full flex flex-col items-center justify-center"
                          onClick={() =>
                            document.getElementById(`file-input-${i}`)?.click()
                          }
                        >
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                            <span className="text-gray-500 text-xl">+</span>
                          </div>
                          <span className="text-gray-400 text-xs">
                            Add Image
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Select Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {CategoryOptions.map((cat) => (
                  <button
                    type="button"
                    key={cat.name}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-2 rounded-lg border font-medium ${
                      category === cat.name
                        ? "bg-indigo-100 text-indigo-700 border-indigo-400"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {category && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Subcategory
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none"
                >
                  {CategoryOptions.find(
                    (c) => c.name === category
                  )?.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {category === "Fashion" ? (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Sizes & Quantity
                </label>
                <div className="space-y-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((s) => {
                    const qty =
                      sizeWithQty.find((item) => item.size === s)?.quantity ||
                      "";
                    return (
                      <div key={s} className="flex items-center gap-3">
                        <label className="w-10">{s}</label>
                        <input
                          type="number"
                          placeholder="Qty"
                          min={0}
                          value={qty}
                          onChange={(e) =>
                            handleSizeChange(s, Number(e.target.value))
                          }
                          className="px-3 py-2 border border-gray-300 rounded-md w-24"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Quantity in Stock
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none"
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={(e) => setBestSeller(e.target.checked)}
                id="bestseller"
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="bestseller" className="text-gray-700 font-medium">
                Mark as Bestseller
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? "Creating Product..." : "Create Product"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
