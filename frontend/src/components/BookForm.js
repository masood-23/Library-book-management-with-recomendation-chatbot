import React, { useState, useEffect } from "react";
import { createBook, updateBook } from "../api";
import { Button, Form, Card, Row, Col, InputGroup, Alert } from "react-bootstrap";

export default function BookForm({ onBookAdded, editingBook, onCancelEdit }) {
  const [form, setForm] = useState({ title: "", author: "", genre: "", year: "", copies: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(!!editingBook);

  const genreOptions = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Self-Help', 'Children', 'Poetry',
    'Drama', 'Comedy', 'Horror', 'Adventure', 'Educational'
  ];

  // Populate form when editing
  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title || "",
        author: editingBook.author || "",
        genre: editingBook.genre || "",
        year: editingBook.year || "",
        copies: editingBook.copies || ""
      });
      setShowForm(true);
      setErrors({});
    } else {
      setForm({ title: "", author: "", genre: "", year: "", copies: "" });
      setErrors({});
    }
  }, [editingBook]);

  function validateForm() {
    const newErrors = {};
    
    if (!form.title.trim()) {
      newErrors.title = 'Book title is required';
    } else if (form.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters long';
    }
    
    if (!form.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (form.author.trim().length < 2) {
      newErrors.author = 'Author name must be at least 2 characters long';
    }
    
    if (!form.genre) {
      newErrors.genre = 'Genre is required';
    }
    
    if (form.year && (form.year < 1000 || form.year > new Date().getFullYear() + 1)) {
      newErrors.year = `Year must be between 1000 and ${new Date().getFullYear() + 1}`;
    }
    
    if (form.copies && (form.copies < 0 || form.copies > 999)) {
      newErrors.copies = 'Copies must be between 0 and 999';
    }
    
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      if (editingBook) {
        await updateBook(editingBook._id, form);
        setSuccessMessage(`Successfully updated "${form.title}"!`);
      } else {
        await createBook(form);
        setSuccessMessage(`Successfully added "${form.title}" to the library!`);
      }
      
      setForm({ title: "", author: "", genre: "", year: "", copies: "" });
      onBookAdded();
      
      if (editingBook && onCancelEdit) {
        setTimeout(() => {
          onCancelEdit();
          setSuccessMessage('');
        }, 2000);
      } else {
        setShowForm(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      setErrors({ general: 'Failed to save book. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setForm({ title: "", author: "", genre: "", year: "", copies: "" });
    setErrors({});
    setShowForm(false);
    if (onCancelEdit) {
      onCancelEdit();
    }
  }

  return (
    <div className="mb-4" data-aos="fade-down">
      {/* Success Message */}
      {successMessage && (
        <Alert 
          variant="success" 
          className="d-flex align-items-center mb-3"
          style={{
            borderRadius: '15px',
            border: 'none',
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white',
            boxShadow: '0 8px 25px rgba(67, 233, 123, 0.3)'
          }}
        >
          <i className="fas fa-check-circle me-2"></i>
          {successMessage}
        </Alert>
      )}
      
      {/* Add Book Button */}
      {!showForm && !editingBook && (
        <div className="text-center mb-4">
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 30px',
              fontWeight: '600',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
            }}
          >
            <i className="fas fa-plus-circle me-2"></i>
            Add New Book
          </Button>
        </div>
      )}
      
      {/* Form */}
      {(showForm || editingBook) && (
        <Card 
          style={{
            border: 'none',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Card.Header 
            className="text-white fw-bold py-4"
            style={{
              background: editingBook 
                ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '20px 20px 0 0'
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <div 
                className="me-3"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className={`fas ${editingBook ? 'fa-edit' : 'fa-plus'}`} style={{ fontSize: '1.2rem' }}></i>
              </div>
              <div>
                <div className="fw-bold">
                  {editingBook ? 'Update Book' : 'Add New Book'}
                </div>
                {editingBook && (
                  <small style={{ opacity: 0.9 }}>Editing: "{editingBook.title}"</small>
                )}
              </div>
            </div>
          </Card.Header>
          
          <Card.Body className="p-4">
            {errors.general && (
              <Alert 
                variant="danger" 
                className="d-flex align-items-center mb-4"
                style={{ borderRadius: '15px', border: 'none' }}
              >
                <i className="fas fa-exclamation-triangle me-2"></i>
                {errors.general}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Row className="g-4">
                {/* Title Field */}
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark mb-2">
                      <i className="fas fa-book me-2" style={{ color: '#667eea' }}></i>
                      Book Title *
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          border: `2px solid ${errors.title ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                          borderRight: 'none',
                          borderRadius: '12px 0 0 12px',
                          color: errors.title ? '#dc3545' : '#667eea'
                        }}
                      >
                        <i className="fas fa-heading"></i>
                      </InputGroup.Text>
                      <Form.Control 
                        name="title" 
                        value={form.title} 
                        onChange={handleChange}
                        placeholder="Enter book title"
                        isInvalid={!!errors.title}
                        style={{
                          border: `2px solid ${errors.title ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                          borderLeft: 'none',
                          borderRadius: '0 12px 12px 0',
                          padding: '12px 16px'
                        }}
                      />
                    </InputGroup>
                    {errors.title && (
                      <Form.Text className="text-danger d-flex align-items-center mt-2">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.title}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                
                {/* Author Field */}
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark mb-2">
                      <i className="fas fa-user-edit me-2" style={{ color: '#43e97b' }}></i>
                      Author Name *
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{
                          background: 'rgba(67, 233, 123, 0.1)',
                          border: `2px solid ${errors.author ? '#dc3545' : 'rgba(67, 233, 123, 0.2)'}`,
                          borderRight: 'none',
                          borderRadius: '12px 0 0 12px',
                          color: errors.author ? '#dc3545' : '#43e97b'
                        }}
                      >
                        <i className="fas fa-pen-fancy"></i>
                      </InputGroup.Text>
                      <Form.Control 
                        name="author" 
                        value={form.author} 
                        onChange={handleChange}
                        placeholder="Enter author name"
                        isInvalid={!!errors.author}
                        style={{
                          border: `2px solid ${errors.author ? '#dc3545' : 'rgba(67, 233, 123, 0.2)'}`,
                          borderLeft: 'none',
                          borderRadius: '0 12px 12px 0',
                          padding: '12px 16px'
                        }}
                      />
                    </InputGroup>
                    {errors.author && (
                      <Form.Text className="text-danger d-flex align-items-center mt-2">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.author}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                
                {/* Genre Field */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark mb-2">
                      <i className="fas fa-tags me-2" style={{ color: '#fa709a' }}></i>
                      Genre *
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{
                          background: 'rgba(250, 112, 154, 0.1)',
                          border: `2px solid ${errors.genre ? '#dc3545' : 'rgba(250, 112, 154, 0.2)'}`,
                          borderRight: 'none',
                          borderRadius: '12px 0 0 12px',
                          color: errors.genre ? '#dc3545' : '#fa709a'
                        }}
                      >
                        <i className="fas fa-list"></i>
                      </InputGroup.Text>
                      <Form.Select 
                        name="genre" 
                        value={form.genre} 
                        onChange={handleChange}
                        isInvalid={!!errors.genre}
                        style={{
                          border: `2px solid ${errors.genre ? '#dc3545' : 'rgba(250, 112, 154, 0.2)'}`,
                          borderLeft: 'none',
                          borderRadius: '0 12px 12px 0',
                          padding: '12px 16px'
                        }}
                      >
                        <option value="">Select Genre</option>
                        {genreOptions.map((genre) => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                    {errors.genre && (
                      <Form.Text className="text-danger d-flex align-items-center mt-2">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.genre}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                
                {/* Year Field */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark mb-2">
                      <i className="fas fa-calendar-alt me-2" style={{ color: '#4facfe' }}></i>
                      Publication Year
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{
                          background: 'rgba(79, 172, 254, 0.1)',
                          border: `2px solid ${errors.year ? '#dc3545' : 'rgba(79, 172, 254, 0.2)'}`,
                          borderRight: 'none',
                          borderRadius: '12px 0 0 12px',
                          color: errors.year ? '#dc3545' : '#4facfe'
                        }}
                      >
                        <i className="fas fa-calendar"></i>
                      </InputGroup.Text>
                      <Form.Control 
                        name="year" 
                        type="number"
                        value={form.year} 
                        onChange={handleChange}
                        placeholder="e.g. 2023"
                        min="1000"
                        max={new Date().getFullYear() + 1}
                        isInvalid={!!errors.year}
                        style={{
                          border: `2px solid ${errors.year ? '#dc3545' : 'rgba(79, 172, 254, 0.2)'}`,
                          borderLeft: 'none',
                          borderRadius: '0 12px 12px 0',
                          padding: '12px 16px'
                        }}
                      />
                    </InputGroup>
                    {errors.year && (
                      <Form.Text className="text-danger d-flex align-items-center mt-2">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.year}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                
                {/* Copies Field */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-dark mb-2">
                      <i className="fas fa-copy me-2" style={{ color: '#fee140' }}></i>
                      Available Copies
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text 
                        style={{
                          background: 'rgba(254, 225, 64, 0.1)',
                          border: `2px solid ${errors.copies ? '#dc3545' : 'rgba(254, 225, 64, 0.3)'}`,
                          borderRight: 'none',
                          borderRadius: '12px 0 0 12px',
                          color: errors.copies ? '#dc3545' : '#b8860b'
                        }}
                      >
                        <i className="fas fa-layer-group"></i>
                      </InputGroup.Text>
                      <Form.Control 
                        name="copies" 
                        type="number"
                        value={form.copies} 
                        onChange={handleChange}
                        placeholder="e.g. 5"
                        min="0"
                        max="999"
                        isInvalid={!!errors.copies}
                        style={{
                          border: `2px solid ${errors.copies ? '#dc3545' : 'rgba(254, 225, 64, 0.3)'}`,
                          borderLeft: 'none',
                          borderRadius: '0 12px 12px 0',
                          padding: '12px 16px'
                        }}
                      />
                    </InputGroup>
                    {errors.copies && (
                      <Form.Text className="text-danger d-flex align-items-center mt-2">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.copies}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              
              {/* Action Buttons */}
              <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                <Button 
                  type="button" 
                  variant="outline-secondary"
                  onClick={handleCancel}
                  style={{
                    borderRadius: '12px',
                    padding: '10px 25px',
                    fontWeight: '600',
                    border: '2px solid #6c757d',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fas fa-times me-2"></i>
                  Cancel
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{
                    background: editingBook 
                      ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 25px',
                    fontWeight: '600',
                    boxShadow: editingBook 
                      ? '0 8px 25px rgba(67, 233, 123, 0.3)'
                      : '0 8px 25px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      {editingBook ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <i className={`fas ${editingBook ? 'fa-save' : 'fa-plus'} me-2`}></i>
                      {editingBook ? 'Update Book' : 'Add Book'}
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
