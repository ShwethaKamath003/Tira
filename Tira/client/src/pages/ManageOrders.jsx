import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Urls";
function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseUrl}/orders`);
      console.log(res.data); 
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${baseUrl}/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`${baseUrl}/orders/${id}`);
    fetchOrders();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Orders</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o._id}>
                <td>{o.user?.fullName}</td>
                <td>{o.user?.number}</td>
                <td>{o.user?.address}</td>

                <td>
                  {o.products.map((p, i) => (
                    <p key={i}>
                      {p.name} × {p.quantity}
                    </p>
                  ))}
                </td>

                <td>₹{o.totalPrice}</td>

                <td>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateStatus(o._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>
                  <button onClick={() => deleteOrder(o._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Orders Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrders;