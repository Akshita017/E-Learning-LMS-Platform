import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewCourse() {

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
   const [courses, setCourses] = useState([]);
   const [description, setdescription] = useState([]);
   const [image, setimage] = useState([]);

   const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title || !price || !category || !description) {
      alert('Please fill in all fields');
      return;
    }
    console.log({ title, price, category , description , image});

    const data = { title, price, category  , description , image};
    if(title && price && category){
      try {
        const response = await axios.post('http://localhost:8000/api/addcourses', data);
        setCourses([...courses, response.data]);
        alert('Course created successfully!');
        navigate('/add-course');
      } catch (error) {
        console.error('Error adding course:', error);
        alert('Failed to add the course. Please try again.');
      }
    }


  };

  return (
    <>
    <Header/>
    <div className='min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-800 text-white p-10 mt-16'>
    <h1 className='text-2xl font-semibold mb-2 tracking-tight'>Lets add course, add some basic details for your new course</h1>
      <p className='text-gray-400 mb-6'>Fill in the details below to create your course.</p>

      <div className='mb-4'>
        <label className='block mb-2'>Title</label>
        <input
          type='text'
          placeholder='Your Course Name'
          className='w-full bg-zinc-800 text-white p-2 rounded-md'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-2'>description</label>
        <textarea
          type='text '
          placeholder='Description'
          className='w-full bg-zinc-800 text-white p-2 rounded-md'
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>


      <div className='mb-4'>
        <label className='block mb-2'>Image</label>
        <input
          type='text'
          placeholder='img link'
          className='w-full bg-zinc-800 text-white p-2 rounded-md'
          value={image}
          onChange={(e) => setimage(e.target.value)}
        />
      </div>


      <div className='mb-4'>
        <label className='block mb-2'>Price</label>
        <input
          type='text'
          placeholder='Course Price (in ₹)'
          className='w-full bg-zinc-800 text-white p-2 rounded-md'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className='mb-6'>
        <label className='block mb-2'>Category</label>
        <select
          className='w-full bg-zinc-800 text-white p-2 rounded-md'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Select a category</option>
          <option value='Development'>Development</option>
          <option value='Design'>Design</option>
          <option value='Marketing'>Marketing</option>
        </select>
      </div>

      <div className='flex gap-4'>
        <button className='bg-black text-white border px-2 py-1 rounded-md'>Cancel</button>
        <button
          onClick={handleCreate}
          className='bg-white text-black px-2 py-1 rounded-md hover:bg-gray-200'
        >
          Create
        </button>
      </div>
    </div>
    </>
  );
}

export default NewCourse;
