import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    color: '',
    size: '',
    category: '',
    stock: '',
    slug: '',
    description: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = 'Product name is required';
    if (!product.price) newErrors.price = 'Price is required';
    if (!product.stock) newErrors.stock = 'Stock quantity is required';
    if (!imageFile) newErrors.image = 'Product image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const token = localStorage.getItem("adminToken");
    console.log("Auth Token:", token);
    if (!token) {
      Swal.fire('Error', 'Authentication token is missing. Please log in again.', 'error');
      return;
    }
  
    const formData = new FormData();

    // Append product data
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append image and sizes
    formData.append('image', imageFile);
    formData.append('sizes', product.size.split(',').map(num => parseInt(num.trim(), 10)));

    try {
      const response = await fetch('http://localhost:3000/apiV1/products/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('Success', 'Product created successfully!', 'success');
        // Reset form
        setProduct({
          name: '',
          title: '',
          brand: '',
          model: '',
          price: '',
          color: '',
          size: '',
          category: '',
          stock: '',
          slug: '',
          description: '',
        });
        setImageFile(null);
        setImagePreview('');
      } else {
        Swal.fire('Error', data.message || 'Failed to create product', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'An error occurred while creating the product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create New Product</h2>
        <Button as={Link} to="/admin/dashboard" variant="outline-secondary">
          Back to Dashboard
        </Button>
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
              
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={product.model}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (KSH) *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={product.color}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Available Sizes (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
                placeholder="Example: 38,40,42"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity *</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
             
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={product.slug}
                onChange={handleChange}
                placeholder="Unique product identifier"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Image *</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                isInvalid={!!errors.image}
              />
              {errors.image && (
                <Form.Text className="text-danger">{errors.image}</Form.Text>
              )}
              {imagePreview && (
                <div className="mt-3">
                  <Image src={imagePreview} alt="Preview" thumbnail style={{ maxHeight: '200px' }} />
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button 
            variant="primary" 
            type="submit" 
            size="lg"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Create Product'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateProduct;