import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSuppliers } from '../../redux/slice/supplier'

const SupplierCRUD = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [editingSupplier, setEditingSupplier] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSuppliers());
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/suppliers');
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const createSupplier = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/suppliers', {
                name,
                address,
            });
            setSuppliers([...suppliers, response.data]);
            clearForm();
        } catch (error) {
            console.error('Error creating supplier:', error);
        }
    };

    const updateSupplier = async () => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/suppliers/${editingSupplier.id}`,
                {
                    name,
                    address,
                }
            );
            const updatedSuppliers = suppliers.map((supplier) =>
                supplier.id === response.data.id ? response.data : supplier
            );
            setSuppliers(updatedSuppliers);
            clearForm();
            setEditingSupplier(null);
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    const deleteSupplier = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/suppliers/${id}`);
            const updatedSuppliers = suppliers.filter(
                (supplier) => supplier.id !== id
            );
            setSuppliers(updatedSuppliers);
        } catch (error) {
            console.error('Error deleting supplier:', error);
        }
    };

    const clearForm = () => {
        setName('');
        setAddress('');
    };

    const startEditing = (supplier) => {
        setEditingSupplier(supplier);
        setName(supplier.name);
        setAddress(supplier.address);
    };

    return (
        <div>
            <h2>Supplier CRUD</h2>

            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {editingSupplier ? (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={updateSupplier}
                    >
                        Update Supplier
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={createSupplier}
                    >
                        Create Supplier
                    </button>
                )}

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearForm}
                >
                    Clear
                </button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id}>
                            <td>{supplier.name}</td>
                            <td>{supplier.address}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => startEditing(supplier)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger"
                                    onClick={() => deleteSupplier(supplier.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierCRUD;