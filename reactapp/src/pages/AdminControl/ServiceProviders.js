
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ServiceProviders = () => {
    const [providers, setProviders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editProvider, setEditProvider] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("http://localhost:8080/api/serviceProviders/all");
                setProviders(response.data);
            } catch (err) {
                console.error("Error fetching providers:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    const handleModalOpen = (provider = null) => {
        setEditProvider(provider);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setEditProvider(null);
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newProvider = {
            name: formData.get("name"),
            mobileNumber: formData.get("mobileNumber"),
            services: formData.get("services"),
        };

        try {
            const response = await axios.post("http://localhost:8080/api/serviceProviders/add", newProvider);
            setProviders((prevProviders) => [...prevProviders, response.data]);
            handleModalClose();
            event.target.reset();

        } catch (error) {
            console.error("Error creating provider:", error);
            alert("Error creating provider: " + (error.response?.data?.error || error.message));
        }
    };

    const deleteProvider = async (id) => {
      if (window.confirm("Are you sure you want to delete this provider?")) {
          try {
              const response = await axios.delete(`http://localhost:8080/api/serviceProviders/${id}`); // Correct URL with port 8080
              setProviders(providers.filter((provider) => provider.id !== id));
              alert(response.data.message); // Optional: Show success message
          } catch (error) {
              console.error("Error deleting provider:", error);
              alert("Error deleting provider: " + (error.response?.data?.error || error.message));
          }
      }
  };

    const filteredProviders = providers.filter((provider) =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="text-center">Loading service providers...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>;
    }

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4">👨‍🔧 Service Providers</h2>
            <Link to="/admin" className="btn btn-primary">
                Back to Dashboard
            </Link>
            <Row className="mb-3">
                <Col md={6}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="🔍 Search providers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={6} className="text-end">
                    <Button variant="success" onClick={() => handleModalOpen()}>
                        ➕ Add Provider
                    </Button>
                </Col>
            </Row>

            <Card className="shadow-sm">
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>mobileNumber</th>
                                <th>Services</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProviders.map((provider, index) => (
                                <tr key={provider.id}>
                                    <td>{index + 1}</td>
                                    <td>{provider.name}</td>
                                    <td>{provider.mobileNumber}</td>
                                    <td>{provider.services}</td>
                                    <td>
                                        <span className={provider.status === "Active" ? "text-success" : "text-danger"}>
                                            {provider.status}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="primary"
                                            className="me-2"
                                            onClick={() => handleModalOpen(provider)}
                                        >
                                            ✏️ Edit
                                        </Button>
                                        <Button size="sm" variant="danger" className="me-2" onClick={() => deleteProvider(provider.id)}>
                                            🗑️ Delete
                                        </Button>
                                        <Button size="sm" variant="success" href={`tel:${provider.mobileNumber}`}>
                                            📞 Contact
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editProvider ? "Edit Provider" : "Add New Provider"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" defaultValue={editProvider?.name || ""} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>mobileNumber</Form.Label>
                            <Form.Control type="text" name="mobileNumber" defaultValue={editProvider?.mobileNumber || ""} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Services Provided</Form.Label>
                            <Form.Control type="text" name="services" defaultValue={editProvider?.services || ""} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name="status" defaultValue={editProvider?.status || "Active"}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editProvider ? "Update Provider" : "Add Provider"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ServiceProviders;