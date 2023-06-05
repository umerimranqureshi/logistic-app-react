import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const ProductCRUD = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        supplier_id: "",
        warehouse_id: "",
    });

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products");
            setProducts(response.data);
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
                "http://127.0.0.1:8000/api/products",
                formData
            );
            setShowModal(false);
            setFormData({
                name: "",
                price: 0,
                supplier_id: "",
                warehouse_id: "",
            });
            fetchProducts();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Delete product by ID
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            <Button onClick={() => setShowModal(true)}>Add Product</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Supplier ID</th>
                        <th>Warehouse ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.supplier_id}</td>
                            <td>{product.warehouse_id}</td>
                            <td>
                                <Button>Edit</Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="supplier_id">
                            <Form.Label>Supplier ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplier_id"
                                value={formData.supplier_id}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="warehouse_id">
                            <Form.Label>Warehouse ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="warehouse_id"
                                value={formData.warehouse_id}
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


export default ProductCRUD