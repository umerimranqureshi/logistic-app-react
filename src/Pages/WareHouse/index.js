import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const WarehouseCRUD = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        supplier_id: "",
        address: "",
    });

    // Fetch warehouses on component mount
    useEffect(() => {
        fetchWarehouses();
    }, []);

    // Fetch all warehouses
    const fetchWarehouses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/warehouses");
            setWarehouses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Handle form field changes
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/warehouses",
                formData
            );
            setShowModal(false);
            setFormData({ supplier_id: "", address: "" });
            fetchWarehouses();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Delete warehouse by ID
    const deleteWarehouse = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/warehouses/${id}`);
            fetchWarehouses();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Warehouse List</h1>
            <Button onClick={() => setShowModal(true)}>Add Warehouse</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Supplier ID</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map((warehouse) => (
                        <tr key={warehouse.id}>
                            <td>{warehouse.id}</td>
                            <td>{warehouse.supplier_id}</td>
                            <td>{warehouse.address}</td>
                            <td>
                                <Button>Edit</Button>{" "}
                                <Button variant="danger" onClick={() => deleteWarehouse(warehouse.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Warehouse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="supplier_id">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplier_id"
                                value={formData.supplier_id}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};


export default WarehouseCRUD
