import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AdminNavabar from '../AdminNavbar'


// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 5vh auto;
  padding: 20px;
  text-align: start;

  
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: rgb(62, 62, 62);
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
//   border:1px solid red;
background-color:skyblue;

`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display:flex;
  flex-direction:column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width:100%;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;


const Button = styled.button`
  background-color: teal;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: blue;
  }
`;

const ImagePreviewContainer = styled.div`
  margin-top: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 4px;
  object-fit: cover;
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const InputRowsContainer = styled.div`
    display:flex;
    width:100;
    align-items:center;
    @media screen and (max-width:768px){
        flex-direction:column;
    }
`

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch available categories from your API
    axios.get('http://localhost:5100/api/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const { productname, description, price, image, category, countInStock, rating } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the category state directly
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size must be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress image if it's too large
        const base64String = reader.result;
        if (base64String.length > 5 * 1024 * 1024) {
          // Image is too large, compress it
          compressImage(file);
        } else {
          setImagePreview(base64String);
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: base64String,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (file) => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Reduce dimensions if image is too large
      if (width > 1200 || height > 1200) {
        const ratio = Math.min(1200 / width, 1200 / height);
        width = width * ratio;
        height = height * ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Compress to JPEG with reduced quality
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: reader.result,
          }));
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.8);
    };
    
    img.src = URL.createObjectURL(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!productname || !description || !price || !image || !category || !countInStock || !rating) {
        return alert('Please fill in all required fields');
      }

      // Log the image size to help debug
      const imageSizeMB = (image.length * 0.75) / (1024 * 1024);
      console.log(`Image size: ${imageSizeMB.toFixed(2)} MB`);

      const response = await axios.post('http://localhost:5100/add-products', {
        productname,
        description,
        price: Number(price),
        image,
        category,
        countInStock: Number(countInStock),
        rating: Number(rating),
      }, {
        timeout: 30000, // 30 second timeout
      });
      
      alert('Product added successfully');
      console.log('Product added:', response.data);

      // Clear the form fields
      setFormData({
        productname: '',
        description: '',
        price: '',
        image: '',
        category: '',
        countInStock: '',
        rating: '',
      });
      setImagePreview('');

    } catch (error) {
      console.error('Error adding product:', error);
      
      let errorMessage = 'Failed to add product';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText;
      } else if (error.request) {
        errorMessage = 'No response from server. Make sure backend is running.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert('Error: ' + errorMessage);
    }
  };

  return (
   <div>
    <AdminNavabar/>
    <h1>Add Product</h1>
     <Container>
      <Form onSubmit={handleSubmit} className='shadow p-3'>
        <InputRowsContainer style={{gap:'10px'}} >
        <FormGroup className='w-100'>
          <Label htmlFor="productname">Product Name</Label>
          <Input
            type="text"
            name="productname"
            value={productname}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </FormGroup>
        <FormGroup className='w-100'>
          <Label htmlFor="rating">Rating</Label>
          <Input
            type="number"
            name="rating"
            value={rating}
            onChange={handleChange}
            placeholder="Enter product rating"
          />
        </FormGroup>
        
        <FormGroup className='w-100'>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </FormGroup>
        </InputRowsContainer>
        <InputRowsContainer style={{gap:'10px'}} >
        <FormGroup className='w-100'>
          <Label htmlFor="image">Product Image</Label>
          <FileInput
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <ImagePreviewContainer>
              <p style={{marginBottom: '10px', fontSize: '14px', color: '#666'}}>Image Preview:</p>
              <ImagePreview src={imagePreview} alt="Product preview" />
            </ImagePreviewContainer>
          )}
        </FormGroup>
        <FormGroup className='w-100'>
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            id="category"
            value={category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="snacks">snacks</option>
            <option value="dryfruits">Dry Fruits</option>
            <option value="Beverages">Beverages</option>
            <option value="Meat and Seafood">Meat and Seafood</option>
          </Select>
        </FormGroup>
        <FormGroup className='w-100'>
          <Label htmlFor="countInStock">Count in Stock</Label>
          <Input
            type="number"
            name="countInStock"
            value={countInStock}
            onChange={handleChange}
            placeholder="Enter count in stock"
          />
        </FormGroup>
        </InputRowsContainer>
        <FormGroup className='w-100'>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </FormGroup>
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
   </div>
  );
};

export default AddProduct;
