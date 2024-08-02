import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
//import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import http from '../lib/http';

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { user } = useUser();
  const [visibleContent, setVisibleContent] = useState('');
  const [blurredContent, setBlurredContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http.get(`/posts/${postId}`);
        setPost(data.data.post);

        const commentsResponse = await http.get(`/posts/${postId}/comments`);
        console.log('Comments response:', commentsResponse.data.data.comments);
        setComments(commentsResponse.data.data.comments);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    fetchData();
  }, [postId]);

  const deletePost = async () => {
    try {
      await http.delete(`/posts/${postId}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (post.content) {
      const visibleLength = Math.floor(post.content.length / 4);
      setVisibleContent(post.content.substring(0, visibleLength));
      setBlurredContent(post.content.substring(visibleLength));
    }
  }, [post.content]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.error('User email is not available');
      return;
    }
  
    try {
      const payload = {
        content: newComment,
        author: user.primaryEmailAddress.emailAddress,
      }
      const { data } = await http.post(`/posts/${postId}/comments`,  {
        data: payload
      });
      console.log(data.comment)
      setComments((prevComments) => [...prevComments, data.comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  

  const renderContentWithParagraphs = (content) => {

    if (typeof content !== 'string') {
      content = ''; 
    }
  
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));

  }

  const imageDomain = process.env.NODE_ENV === 'production' ? 'https://your-backend-domain.com' : 'http://localhost:5000';

  return (
    <div className="container text-justified my-5" style={{ maxWidth: '800px' }}>
      <h1>{post.title}</h1>
      <div className="text-secondary mb-4">{new Date(post.createdAt).toLocaleDateString()}</div>
      <button className="btn btn-secondary">{post.category}</button>
      <div className="w-100">
        {post.tags?.map((tag, index) => (
          <span key={index} className="badge bg-primary me-1">#{tag}</span>
        ))}
      </div>
      {/* Display image */}
      {post.image && (
        <div className="my-4">
          <img src={`${imageDomain}/${post.image}`} alt={post.title} style={{ width: '100%', height: '500px', objectFit: "cover" }} />
        </div>
      )}
      <div className="p mt-5">
        {user ? (
          <div>{renderContentWithParagraphs(post.content)}</div>
        ) : (
          <div style={{ position: 'relative' }}>
            <div>
              {visibleContent}
              <span style={{ filter: 'blur(10px)', marginLeft: '5px' }}>{blurredContent}</span>
              <div>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backdropFilter: 'blur(10px)',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  zIndex: 1
                }}
              >
                <p>Do you want to read more?
                  <Link to='/signin'> Sign in</Link>
                  {' '}or{' '}
                  <Link to="/signin">Register</Link>
                </p>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
      <div className="mb-5" style={{ color: "brown" }}>- {post.author}</div>
      <div className="mb-5">
        <button className="btn bg-warning text-center"><Link to={`/posts/${postId}/edit`} className="text-decoration-none">Edit</Link></button>
        <button className="btn btn-danger ms-3" onClick={deletePost}>Delete</button>
      </div>
      <Link to='/' style={{ textDecoration: 'none' }} className="text-decoration-none">&#8592; Back to Home</Link>
      {/* comment section */}
      <div className="comments-section mt-5">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((addcomment, index) => (
            <div key={index} className="comment mb-3">
              <p><strong>{addcomment.author || 'unknown'}</strong></p>
              <p>{addcomment.content || 'N0 content'}</p>
            </div>
          ))
        )}
        {user && (
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Post;
