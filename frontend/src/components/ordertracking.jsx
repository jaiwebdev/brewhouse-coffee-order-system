import { useEffect, useState } from "react";
import axios from "axios";

function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const statuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Delivered",
  ];

  const trackOrder = async (id, customerPhone) => {
    try {
      setLoading(true);
      setMessage("");

      const url =
        "http://localhost:5000/api/orders/track/" +
        id +
        "?phone=" +
        customerPhone;

      const response = await axios.get(url);

      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.log(error);

      setOrder(null);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Order not found.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedOrderId =
      localStorage.getItem("customerOrderId");

    const savedPhone =
      localStorage.getItem("customerPhone");

    if (savedOrderId) {
      setOrderId(savedOrderId);
    }

    if (savedPhone) {
      setPhone(savedPhone);
    }

    if (savedOrderId && savedPhone) {
      trackOrder(savedOrderId, savedPhone);
    }
  }, []);

  useEffect(() => {
    if (!orderId || !phone) {
      return;
    }

    const interval = setInterval(() => {
      trackOrder(orderId, phone);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [orderId, phone]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderId || !phone) {
      setMessage("Please enter Order ID and Phone Number.");
      return;
    }

    localStorage.setItem("customerOrderId", orderId);
    localStorage.setItem("customerPhone", phone);

    trackOrder(orderId, phone);
  };

  return (
    <section className="min-h-screen bg-stone-100 px-6 py-16">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-stone-900">
            Track Your Order
          </h1>

          <p className="mt-2 text-stone-500">
            Enter your Order ID and phone number
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow"
        >
          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-semibold">
                Order ID
              </label>

              <input
                type="text"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value);
                }}
                placeholder="Enter Order ID"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Phone Number
              </label>

              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Enter Phone Number"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
          >
            {loading ? "Checking..." : "Track Order"}
          </button>

          {message && (
            <p className="mt-4 text-center text-red-600">
              {message}
            </p>
          )}
        </form>

        {/* Order Details */}
        {order && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow">

            <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row">

              <div>
                <h2 className="text-2xl font-bold">
                  Order Details
                </h2>

                <p className="mt-1 break-all text-sm text-stone-500">
                  Order ID: {order._id}
                </p>
              </div>

              <div className="h-fit rounded-full bg-amber-100 px-4 py-2 font-bold text-amber-800">
                {order.status}
              </div>

            </div>

            {/* Customer */}
            <div className="mt-6">
              <p className="text-sm text-stone-500">
                Customer
              </p>

              <p className="font-semibold">
                {order.customerName}
              </p>

              <p className="text-sm text-stone-500">
                {order.phone}
              </p>
            </div>

            {/* Items */}
            <div className="mt-6">
              <h3 className="font-bold">
                Ordered Items
              </h3>

              <div className="mt-3 space-y-3">

                {order.items &&
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded-lg bg-stone-50 p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.name}
                        </p>

                        <p className="text-sm text-stone-500">
                          ₹{item.price} x {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}

              </div>
            </div>

            {/* Address */}
            <div className="mt-6">
              <p className="text-sm text-stone-500">
                Delivery Address
              </p>

              <p className="font-medium">
                {order.address}
              </p>
            </div>

            {/* Total */}
            <div className="mt-6 flex justify-between border-t pt-5">
              <span className="font-bold">
                Total Amount
              </span>

              <span className="text-xl font-bold text-amber-700">
                ₹{order.totalAmount}
              </span>
            </div>

            {/* Status */}
            <div className="mt-10 border-t pt-8">

              <h3 className="text-xl font-bold">
                Order Status
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Your order progress
              </p>

              {order.status === "Cancelled" ? (

                <div className="mt-6 rounded-lg bg-red-50 p-5">
                  <p className="font-bold text-red-700">
                    Order Cancelled
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    Your order has been cancelled.
                  </p>
                </div>

              ) : (

                <div className="mt-6 space-y-5">

                  {statuses.map((status, index) => {

                    const currentIndex =
                      statuses.indexOf(order.status);

                    const isCompleted =
                      index < currentIndex;

                    const isCurrent =
                      index === currentIndex;

                    return (
                      <div
                        key={status}
                        className="flex items-center gap-4"
                      >

                        <div
                          className={
                            "flex h-10 w-10 items-center justify-center rounded-full font-bold " +
                            (
                              isCompleted || isCurrent
                                ? "bg-amber-700 text-white"
                                : "bg-stone-200 text-stone-500"
                            )
                          }
                        >
                          {isCompleted
                            ? "✓"
                            : index + 1}
                        </div>

                        <div>
                          <p
                            className={
                              "font-bold " +
                              (
                                index <= currentIndex
                                  ? "text-stone-900"
                                  : "text-stone-400"
                              )
                            }
                          >
                            {status}
                          </p>

                          <p className="text-sm text-stone-500">
                            {isCompleted
                              ? "Completed"
                              : isCurrent
                              ? "Current Status"
                              : "Waiting"}
                          </p>
                        </div>

                      </div>
                    );
                  })}

                </div>
              )}

              {/* Auto Refresh */}
              {order.status !== "Delivered" &&
                order.status !== "Cancelled" && (

                  <div className="mt-6 rounded-lg bg-stone-100 p-3 text-center text-sm text-stone-600">
                    Order status updates automatically
                  </div>

                )}

              {/* Delivered */}
              {order.status === "Delivered" && (

                <div className="mt-6 rounded-lg bg-green-50 p-4 text-center font-semibold text-green-700">
                  Your order has been delivered. Enjoy your coffee!
                </div>

              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default OrderTracking;