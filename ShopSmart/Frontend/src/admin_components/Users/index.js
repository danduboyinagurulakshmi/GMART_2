import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import AdminNavabar from '../AdminNavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  // ✅ Fetch Users
  useEffect(() => {
    axios.get(`http://localhost:5100/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // ✅ Close Modal
  const closeModal = () => {
    setShowDetails(false);
    setSelectedUser(null);
    setUserOrders([]);
  };

  // ✅ Delete User
  const deleteData = (userId) => {
    if (!window.confirm("Delete this user?")) return;

    axios.delete(`http://localhost:5100/userdelete/${userId}`)
      .then(() => {
        alert("User deleted successfully");
        setUsers(prev => prev.filter(user => user._id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  // ✅ Delete Order
  const deleteOrder = (orderId) => {
    if (!window.confirm("Delete this order?")) return;

    axios.delete(`http://localhost:5100/userbookingdelete/${orderId}`)
      .then(() => {
        alert("Order deleted");
        setUserOrders(prev => prev.filter(order => order._id !== orderId));
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  // ✅ View User + Orders
 const viewUserDetails = (user) => {
  console.log("User clicked:", user._id); // ✅ ADD

  setSelectedUser(user);

  axios.get(`http://localhost:5100/getbookings/${user._id}`)
    .then((response) => {
      console.log("Orders response:", response.data); // ✅ ADD
      setUserOrders(response.data);
      setShowDetails(true);
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      setUserOrders([]);
      setShowDetails(true);
    });
};
  // ✅ Status
  const calculateStatus = (date) => {
    const currentDate = new Date();
    const bookingDate = new Date(date);
    return bookingDate >= currentDate ? "Upcoming" : "Completed";
  };

  return (
    <div>
      <AdminNavabar />
      <br />
      <h1 className='text-center'>Users</h1>
      <br />

      {/* ================= USERS TABLE ================= */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table striped bordered hover variant="dark" style={{ width: "70%" }}>
          <thead>
            <tr>
              <th>Sl/No</th>
              <th>UserId</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Operation</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  {/* Delete */}
                  <button
                    onClick={() => deleteData(item._id)}
                    style={{
                      border: 'none',
                      color: 'red',
                      background: 'none',
                      marginRight: '10px',
                      fontSize: '18px'
                    }}>
                    <FaTrash />
                  </button>

                  {/* View */}
                  <Button
                    size="sm"
                    onClick={() => viewUserDetails(item)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* ================= MODAL ================= */}
      {showDetails && selectedUser && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          
          {/* overlay */}
          <div
            className="position-absolute w-100 h-100"
            style={{ background: "rgba(0,0,0,0.6)" }}
          ></div>

          {/* modal */}
          <div
            className="bg-white p-4 rounded position-relative"
            style={{
              width: "90%",
              maxHeight: "85vh",
              overflowY: "auto",
              zIndex: 10
            }}
          >
            <h3 className='text-center text-primary'>User Details</h3>
            <hr />

            {/* USER INFO */}
            <p><strong>User ID:</strong> {selectedUser._id}</p>
            <p><strong>User Name:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>

            <hr />
            <h4 className="text-center">User Orders</h4>
            <br />

            {/* ORDERS */}
          {/* ORDERS */}
{userOrders.length === 0 ? (
  <p className="text-center">No Orders Found</p>
) : (
  userOrders.map((item) => (
    <Card key={item._id} style={{ marginBottom: "15px", padding: "15px" }}>
      
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* ✅ PRODUCT IMAGE */}
        <div style={{ width: "120px" }}>
          <img
            src={item.productImage}
            alt={item.productName}
            style={{ width: "100px", borderRadius: "8px" }}
          />
        </div>

        {/* ✅ ORDER DETAILS */}
        <div style={{ flex: 1 }}>
          <p><strong>Product:</strong> {item.productName}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Payment:</strong> {item.paymentMethod}</p>
          <p><strong>Address:</strong> {item.address}</p>
        </div>

        {/* ✅ PRICE */}
        <div style={{ textAlign: "right" }}>
          <p><strong>Total:</strong> ₹{item.price}</p>

          <button
            onClick={() => deleteOrder(item._id)}
            style={{ border: "none", color: "red", background: "none" }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </Card>
  ))
)}

            <div className="text-center mt-3">
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;