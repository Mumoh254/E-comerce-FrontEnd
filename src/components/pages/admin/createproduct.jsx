import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const CreateProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    brand: '',
    price: '',
    color: '',
    category: '',
    quantity: '',
    sizes: [],
    slug: '',
    description: '',
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!product.title.trim()) newErrors.title = 'Product title is required';
    if (!product.price) newErrors.price = 'Price is required';
    if (!product.quantity) newErrors.quantity = 'Quantity is required';
    if (imageFiles.length === 0) newErrors.images = 'At least one image is required';
    
    // Validate sizes
    if (product.sizes.length === 0) {
      newErrors.sizes = 'At least one size is required';
    } else if (product.sizes.some(size => isNaN(size))) {
      newErrors.sizes = 'Sizes must be numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'sizes' 
        ? value.split(',')
              .map(s => s.trim())
              .filter(s => s !== '')
              .map(Number)
              .filter(n => !isNaN(n))
        : value,
      slug: name === 'title' ? slugify(value) : prev.slug,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
      setErrors(prev => ({ ...prev, images: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('brand', product.brand);
    formData.append('price', product.price);
    formData.append('color', product.color);
    formData.append('category', product.category);
    formData.append('quantity', product.quantity);
    formData.append('description', product.description);
    formData.append('slug', product.slug);
    
    // Add multiple images
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    // Add sizes correctly
    product.sizes.forEach(size => {
      formData.append('sizes', size);
    });

    try {
      const response = await fetch('https://majestycollections.onrender.com/products/create', {
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
          title: '',
          brand: '',
          price: '',
          color: '',
          category: '',
          quantity: '',
          sizes: [],
          slug: '',
          description: '',
        });
        setImageFiles([]);
        setImagePreviews([]);
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
              <Form.Label>Product Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
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
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                isInvalid={!!errors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Available Sizes * (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="sizes"
                value={product.sizes.join(', ')}
                onChange={handleChange}
                placeholder="E.g., 38, 40, 42"
                isInvalid={!!errors.sizes}
              />
              <Form.Text className="text-muted">
                Enter numbers separated by commas (e.g., 38, 40, 42)
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.sizes}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Images *</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                isInvalid={!!errors.images}
              />
              {errors.images && (
                <Form.Text className="text-danger">{errors.images}</Form.Text>
              )}
              {imagePreviews.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <Image 
                      key={index}
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      thumbnail 
                      style={{ height: '100px', width: '100px', objectFit: 'cover' }} 
                    />
                  ))}
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

        <Button variant="primary" type="submit" size="lg" disabled={loading}>
          {loading ? 'Uploading...' : 'Create Product'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProduct;