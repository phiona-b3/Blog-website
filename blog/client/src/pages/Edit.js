import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
//import axios from 'axios';
import http from '../lib/http';


const Edit = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/posts/${postId}`)
      reset(data.data.post)
    }
    fetchData()
  }, [postId, reset])

  const onSubmit = async ({ title, content, author, tags }) => {
    const tagsString = tags ? String(tags) : '';
    const tagsArray = tagsString.split(',').map((tag) => tag.trim());

    const payload = {
      title,
      content,
      author,
      tags: tagsArray,
    }
    await http.put(`/posts/${postId}`, { data: payload })
    navigate(`/posts/${postId}`)
  }

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <h1>Edit your Post</h1>
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
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows={3} placeholder="Your content..." {...register('content')}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      <Link to="/" style={{ textDecoration: 'none' }} className="text-decoration-none">&#8592; Back to Home</Link>
    </div>
  )
}

export default Edit

