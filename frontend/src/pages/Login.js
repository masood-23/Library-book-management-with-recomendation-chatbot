import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col, Alert, InputGroup } from "react-bootstrap";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  function validateForm() {
    const newErrors = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Successfully logged in as ${form.email}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 2000);
  }

  return (
    <div 
      style={{
        minHeight: 'calc(100vh - 100px)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        marginTop: '-24px',
        paddingTop: '60px',
        position: 'relative'
      }}
    >
      {/* Background decorative elements */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          animation: 'float 8s ease-in-out infinite 2s'
        }}
      />
      
      <Container>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <Col md={6} lg={5} xl={4}>
            <div data-aos="zoom-in" data-aos-duration="800">
              <Card 
                className="login-card"
                style={{
                  border: 'none',
                  borderRadius: '25px',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  overflow: 'hidden'
                }}
              >
                {/* Card Header */}
                <div 
                  className="text-center py-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
                  }}
                >
                  <div 
                    className="mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    <i className="fas fa-user-circle" style={{ fontSize: '2.5rem', color: 'white' }}></i>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>Welcome Back!</h2>
                  <p className="text-muted mb-0">Sign in to your Library Pro account</p>
                </div>
                
                <Card.Body className="p-5">
                  {successMessage && (
                    <Alert 
                      variant="success" 
                      className="d-flex align-items-center mb-4"
                      style={{
                        borderRadius: '15px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        color: 'white'
                      }}
                    >
                      <i className="fas fa-check-circle me-2"></i>
                      {successMessage}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold text-dark mb-2">
                        <i className="fas fa-envelope me-2" style={{ color: '#667eea' }}></i>
                        Email Address
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text 
                          style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: `2px solid ${errors.email ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                            borderRight: 'none',
                            borderRadius: '15px 0 0 15px',
                            color: errors.email ? '#dc3545' : '#667eea'
                          }}
                        >
                          <i className="fas fa-at"></i>
                        </InputGroup.Text>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={form.email} 
                          onChange={handleChange}
                          placeholder="Enter your email"
                          isInvalid={!!errors.email}
                          style={{
                            border: `2px solid ${errors.email ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                            borderLeft: 'none',
                            borderRadius: '0 15px 15px 0',
                            padding: '12px 16px',
                            fontSize: '1rem'
                          }}
                        />
                      </InputGroup>
                      {errors.email && (
                        <Form.Text className="text-danger d-flex align-items-center mt-2">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {errors.email}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold text-dark mb-2">
                        <i className="fas fa-lock me-2" style={{ color: '#667eea' }}></i>
                        Password
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text 
                          style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: `2px solid ${errors.password ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                            borderRight: 'none',
                            borderRadius: '15px 0 0 15px',
                            color: errors.password ? '#dc3545' : '#667eea'
                          }}
                        >
                          <i className="fas fa-key"></i>
                        </InputGroup.Text>
                        <Form.Control 
                          type={showPassword ? "text" : "password"} 
                          name="password" 
                          value={form.password} 
                          onChange={handleChange}
                          placeholder="Enter your password"
                          isInvalid={!!errors.password}
                          style={{
                            border: `2px solid ${errors.password ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: '0',
                            padding: '12px 16px',
                            fontSize: '1rem'
                          }}
                        />
                        <InputGroup.Text 
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            border: `2px solid ${errors.password ? '#dc3545' : 'rgba(102, 126, 234, 0.2)'}`,
                            borderLeft: 'none',
                            borderRadius: '0 15px 15px 0',
                            cursor: 'pointer',
                            color: '#667eea'
                          }}
                        >
                          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </InputGroup.Text>
                      </InputGroup>
                      {errors.password && (
                        <Form.Text className="text-danger d-flex align-items-center mt-2">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {errors.password}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Remember Me & Forgot Password */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check 
                        type="checkbox" 
                        label="Remember me"
                        className="text-muted"
                        style={{ fontSize: '0.9rem' }}
                      />
                      <Button 
                        variant="link" 
                        className="p-0 text-decoration-none"
                        style={{
                          color: '#667eea',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}
                      >
                        Forgot Password?
                      </Button>
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-100 py-3 fw-bold"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '15px',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
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
                      {isLoading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Sign In to Library Pro
                        </>
                      )}
                    </Button>
                  </Form>
                </Card.Body>
                
                {/* Footer */}
                <div 
                  className="text-center py-4"
                  style={{
                    background: 'rgba(248, 249, 250, 0.5)',
                    borderTop: '1px solid rgba(102, 126, 234, 0.1)'
                  }}
                >
                  <p className="mb-0 text-muted">
                    Don't have an account? 
                    <Button 
                      variant="link" 
                      className="p-0 ms-1 text-decoration-none fw-bold"
                      style={{ color: '#667eea' }}
                    >
                      Sign up now
                    </Button>
                  </p>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .login-card {
          transition: all 0.3s ease;
        }
        
        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 35px 60px rgba(0, 0, 0, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
