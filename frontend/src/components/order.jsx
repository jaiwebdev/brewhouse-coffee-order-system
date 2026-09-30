import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const menuItems = [
  { name: "Cappuccino", price: 140 },
  { name: "Classic Latte", price: 160 },
  { name: "Cold Coffee", price: 180 },
  { name: "Club Sandwich", price: 190 },
];

export default function Order() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Add item / increase quantity
  const addItem = (item) => {
    const existing = selectedItems.find(
      (selected) => selected.name === item.name
    );

    if (existing) {
      setSelectedItems(
        selectedItems.map((selected) =>
          selected.name === item.name
            ? {
                ...selected,
                quantity: selected.quantity + 1,
              }
            : selected
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  // Decrease quantity
  const decreaseItem = (itemName) => {
    setSelectedItems(
      selectedItems
        .map((item) =>
          item.name === itemName
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total
  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Place order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      setMessage("Please select at least one item.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "https://brewhouse-backend.onrender.com/api/orders",
        {
          customerName,
          phone,
          items: selectedItems,
          totalAmount,
          deliveryAddress,
        }
      );

      if (response.data.success) {
        const orderId = response.data.order._id;

        // Save Order ID
        localStorage.setItem("customerOrderId", orderId);

        // Save Customer Phone
        localStorage.setItem("customerPhone", phone);

        // Go directly to Track Order page
        navigate("/track-order");
      }
    } catch (error) {
      console.error("Order Error:", error);

      setMessage(
        error.response?.data?.message ||
          "Order failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="order"
      className="bg-stone-100 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
            Order Online
          </p>

          <h2 className="text-4xl font-bold text-stone-900">
            Place Your Order
          </h2>

          <p className="mt-3 text-stone-600">
            Choose your favourite coffee and food.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-xl md:p-10"
        >

          {/* Customer Details */}
          <div className="grid gap-5 md:grid-cols-2">

            {/* Name */}
            <div>
              <label className="mb-2 block font-semibold text-stone-700">
                Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
                placeholder="Enter your name"
                required
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block font-semibold text-stone-700">
                Phone
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Enter phone number"
                required
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

          </div>

          {/* Address */}
          <div className="mt-5">
            <label className="mb-2 block font-semibold text-stone-700">
              Delivery Address
            </label>

            <textarea
              value={deliveryAddress}
              onChange={(e) =>
                setDeliveryAddress(e.target.value)
              }
              placeholder="Enter your delivery address"
              rows="3"
              required
              className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
            />
          </div>

          {/* Menu Items */}
          <div className="mt-8">
            <h3 className="mb-5 text-2xl font-bold text-stone-900">
              Select Items
            </h3>

            <div className="grid gap-4 md:grid-cols-2">

              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-stone-200 p-5"
                >
                  <div>
                    <h4 className="font-bold text-stone-900">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-amber-700">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => addItem(item)}
                    className="rounded-lg bg-stone-900 px-5 py-2 text-white hover:bg-amber-700"
                  >
                    Add
                  </button>
                </div>
              ))}

            </div>
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <div className="mt-8">

              <h3 className="mb-4 text-2xl font-bold">
                Your Order
              </h3>

              <div className="space-y-3">

                {selectedItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl bg-stone-100 p-4"
                  >

                    <div>
                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p className="text-sm text-stone-600">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          decreaseItem(item.name)
                        }
                        className="h-8 w-8 rounded-full bg-stone-300"
                      >
                        −
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => addItem(item)}
                        className="h-8 w-8 rounded-full bg-stone-900 text-white"
                      >
                        +
                      </button>

                    </div>

                  </div>
                ))}

              </div>

              {/* Total */}
              <div className="mt-6 flex justify-between border-t pt-5">

                <span className="text-xl font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold text-amber-700">
                  ₹{totalAmount}
                </span>

              </div>

            </div>
          )}

          {/* Message */}
          {message && (
            <div className="mt-6 rounded-lg bg-stone-100 p-4 text-center font-semibold">
              {message}
            </div>
          )}

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-amber-700 px-6 py-4 text-lg font-bold text-white hover:bg-amber-800 disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>
      </div>
    </section>
  );
}