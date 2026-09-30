import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState("");

  const navigate = useNavigate();

  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
         "https://brewhouse-backend.onrender.com/api/orders",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);

      const token = localStorage.getItem("adminToken");

      const response = await axios.patch(
        "https://brewhouse-backend.onrender.com/api/orders/" +
          orderId +
          "/status",
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.success) {
        setOrders((currentOrders) =>
          currentOrders.map((order) => {
            if (order._id === orderId) {
              return {
                ...order,
                status: newStatus,
              };
            }

            return order;
          })
        );
      }
    } catch (error) {
      console.error("Update Status Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Status update failed");
      }
    } finally {
      setUpdatingId("");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const customerName = order.customerName || "";
    const phone = order.phone || "";

    const matchesSearch =
      customerName.toLowerCase().includes(searchText) ||
      phone.includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================
  // ORDER COUNTS
  // =========================

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">
          Loading orders...
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <section className="min-h-screen bg-stone-100 px-4 py-8 md:px-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-700">
              BrewHouse
            </p>

            <h1 className="mt-2 text-3xl font-bold text-stone-900 md:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-stone-600">
              Manage customer orders
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>

        {/* SUMMARY */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-stone-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold">
              {orders.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-stone-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingOrders}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-stone-500">
              Confirmed
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {confirmedOrders}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-stone-500">
              Preparing
            </p>

            <p className="mt-2 text-3xl font-bold text-purple-600">
              {preparingOrders}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-stone-500">
              Delivered
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {deliveredOrders}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-stone-500">
              Cancelled
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {cancelledOrders}
            </p>
          </div>

        </div>

        {/* SEARCH + FILTER */}

        <div className="mb-6 rounded-xl bg-white p-5 shadow">

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Search Orders
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search customer name or phone..."
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Filter by Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-amber-600"
              >
                <option value="All">All Orders</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

          </div>

          <p className="mt-4 text-sm text-stone-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>

        </div>

        {/* ORDERS */}

        {filteredOrders.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-lg text-stone-600">
              No orders found.
            </p>
          </div>

        ) : (

          <div className="space-y-6">

            {filteredOrders.map((order) => (

              <div
                key={order._id}
                className="rounded-2xl bg-white p-6 shadow-lg"
              >

                {/* CUSTOMER */}

                <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row">

                  <div>

                    <h2 className="text-xl font-bold text-stone-900">
                      {order.customerName}
                    </h2>

                    <p className="mt-1 text-stone-600">
                      📞 {order.phone}
                    </p>

                    {/* WHATSAPP */}

                    <a
                      href={
                        "https://wa.me/91" +
                        order.phone +
                        "?text=" +
                        encodeURIComponent(
                          "Hello " +
                            order.customerName +
                            ", your BrewHouse order status is " +
                            order.status +
                            ". Order Total: ₹" +
                            order.totalAmount +
                            "."
                        )
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      WhatsApp Customer
                    </a>

                    <p className="mt-2 text-stone-600">
                      📍 {order.deliveryAddress}
                    </p>

                  </div>

                  {/* PRICE + STATUS */}

                  <div className="text-left md:text-right">

                    <p className="text-2xl font-bold text-amber-700">
                      ₹{order.totalAmount}
                    </p>

                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) => {
                        updateStatus(
                          order._id,
                          e.target.value
                        );
                      }}
                      className="mt-2 rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold outline-none focus:border-amber-600 disabled:opacity-50"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Preparing">
                        Preparing
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                    {updatingId === order._id && (
                      <p className="mt-2 text-xs text-stone-500">
                        Updating...
                      </p>
                    )}

                  </div>

                </div>

                {/* ITEMS */}

                <div className="mt-5">

                  <h3 className="mb-3 font-bold">
                    Ordered Items
                  </h3>

                  <div className="space-y-2">

                    {order.items &&
                      order.items.map((item, index) => (

                        <div
                          key={item._id || index}
                          className="flex justify-between rounded-lg bg-stone-100 px-4 py-3"
                        >

                          <span>
                            {item.name} × {item.quantity}
                          </span>

                          <span className="font-semibold">
                            ₹{item.price * item.quantity}
                          </span>

                        </div>

                      ))}

                  </div>

                </div>

                {/* ORDER INFO */}

                <p className="mt-5 text-sm text-stone-500">
                  Order ID: {order._id}
                </p>

                <p className="text-sm text-stone-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}