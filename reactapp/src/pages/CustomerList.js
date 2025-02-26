import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const usersOnly = data.filter(user => user.role === "USER").map(user => ({
                ...user,
                address: "Nashik"
            }));
            setCustomers(usersOnly);

        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setCustomers(customers.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const filteredCustomers = customers.filter((customer) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            customer.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            customer.phone.toLowerCase().includes(lowerCaseSearchTerm)
        );
    });

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">All Customers</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="text-center mb-3">
                <Link to="/admin" className="btn btn-primary">
                    Back to Dashboard
                </Link>
            </div>
            <div className="table-responsive d-flex justify-content-center">
                <table className="table table-bordered w-75">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(customer.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerList;