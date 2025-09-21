import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="mb-4" data-aos="fade-down" data-aos-delay="100">
      <div className="text-center mb-3">
        <h4 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
          <i className="fas fa-search me-2" style={{ color: '#667eea' }}></i>
          Find Your Perfect Book
        </h4>
        <p className="text-muted">Search through our extensive collection</p>
      </div>
      
      <Form className="search-form">
        <InputGroup 
          className="search-input-group"
          style={{
            borderRadius: '50px',
            overflow: 'hidden',
            boxShadow: isFocused 
              ? '0 10px 30px rgba(102, 126, 234, 0.2)' 
              : '0 5px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isFocused ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: isFocused ? '2px solid #667eea' : '2px solid transparent'
          }}
        >
          <InputGroup.Text 
            style={{
              background: 'transparent',
              border: 'none',
              color: isFocused ? '#667eea' : '#6c757d',
              transition: 'color 0.3s ease',
              fontSize: '1.2rem',
              padding: '15px 20px'
            }}
          >
            <i className="fas fa-search"></i>
          </InputGroup.Text>
          
          <Form.Control
            type="text"
            placeholder="Search by title, author, or genre..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1.1rem',
              padding: '15px 20px 15px 10px',
              color: '#2c3e50',
              fontWeight: '500'
            }}
            className="search-input"
          />
          
          {searchValue && (
            <InputGroup.Text 
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6c757d',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: '15px 20px'
              }}
              onClick={() => handleSearch('')}
              onMouseEnter={(e) => {
                e.target.style.color = '#dc3545';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6c757d';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="fas fa-times-circle"></i>
            </InputGroup.Text>
          )}
        </InputGroup>
        
        {/* Search suggestions or results count */}
        {searchValue && (
          <div 
            className="mt-2 text-center"
            style={{
              animation: 'fadeIn 0.3s ease'
            }}
          >
            <small className="text-muted">
              <i className="fas fa-filter me-1" style={{ color: '#667eea' }}></i>
              Searching for: <strong>{searchValue}</strong>
            </small>
          </div>
        )}
      </Form>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .search-input::placeholder {
          color: #adb5bd;
          font-weight: 400;
        }
        
        .search-input:focus {
          outline: none;
          box-shadow: none;
        }
        
        .search-form {
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
