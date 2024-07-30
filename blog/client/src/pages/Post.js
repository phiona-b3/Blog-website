import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { user } = useUser();
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visibleContent, setVisibleContent] = useState('');
  const [blurredContent, setBlurredContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:5000/posts/${postId}`);
        setPost(data.data.post);
        const commentsResponse = await axios.get(`http://localhost:5000/posts/${postId}/comments`);
        setComments(commentsResponse.data.data.comments);
      } catch (error) {
        console.error('Error fetching post:', error);
      }

      // Check if the user is authenticated
     // const token = localStorage.getItem('token');
      //setIsAuthenticated(!!token);
    }
    fetchData();
  }, [postId]);

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
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
    //if (!newComment.trim()) return;

   
    const { data } = await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
      content: newComment,
      author: user.primaryEmailAddress.emailAddress,
    });
    console.log('Response:', data);
    setComments([...comments, data.comment]);
    setNewComment('')
    
  }

  const renderContentWithParagraphs = (content) => {

    if (typeof content !== 'string') {
      content = ''; // Provide a default value or handle the error accordingly
    }
  
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));

  }

  return (
    <div className="container text-justified my-5" style={{ maxWidth: '800px' }}>
      <h1>{post.title}</h1>
      <div className="text-secondary mb-4">{new Date(post.createdAt).toLocaleDateString()}</div>
      {post.tags?.map((tag, index) => (
        <span key={index} className="badge bg-primary me-1">#{tag}</span>
      ))}
      <button className="btn btn-secondary">{post.category}</button>
      {/* Display image */}
      {post.image && (
        <div className="my-4">
          <img src={`http://localhost:5000/${post.image}`} alt={post.title} style={{ width: '60%', height: '480px' }} />
        </div>
      )}
      <div className="h4 mt-5">
        {user ? (
          <div className="text-secondary">{renderContentWithParagraphs(post.content)}</div>
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
      <div className="text-secondary mb-5">- {post.author}</div>
      <div className="mb-5">
        <Link to={`/posts/${postId}/edit`} style={{ marginRight: "30px" }}>Edit</Link>
        <button className="btn btn-danger" onClick={deletePost}>Delete</button>
      </div>
      <Link to='/' style={{ textDecoration: 'none' }} className="text-decoration-none">Back to Home</Link>
      {/* comment section */}
      <div className="comments-section mt-5">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="comment mb-3">
              <p><strong>{comment.author}</strong></p>
              <p>{comment.content}</p>
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
