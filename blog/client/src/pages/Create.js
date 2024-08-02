import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
//import axios from 'axios';
import http from '../lib/http';

const Create = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('tags', data.tags.split(',').map((tag) => tag.trim()));
    formData.append('content', data.content);
    formData.append('image', data.image[0]);

    try {
      await http.post('/posts', { data: formData, headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <h1>Create a new Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" placeholder="Enter title" {...register('title')} />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="text" className="form-control" id="author" placeholder="Enter author" {...register('author')} />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" placeholder="Enter tags" {...register('tags')} />
          <small className="form-text text-muted">Enter them separately with ","</small>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" placeholder="Enter category" {...register('category')} />
          <small className="form-text text-muted">Enter category</small>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows={3} placeholder="Your content..." {...register('content')}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input type="file" className="form-control" id="image" {...register('image')} />
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
      <Link to="/" style={{ textDecoration: 'none' }} className="text-decoration-none">&#8592; Back to Home</Link>
    </div>
  );
};

export default Create;

