import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import http from '../lib/http';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(12);


  useEffect(() => {
    async function fetchData() {
      const imageDomain = process.env.NODE_ENV === 'production' ? 'https://your-backend-domain.com' : 'http://localhost:5000';
      try {
        const { data } = await http.get('/posts');
        const fetchedPosts = data.data.posts.map(post => ({
          ...post,
          image: `${imageDomain}/${post.image}`
        }));
        setPosts(fetchedPosts);

        setDisplayedPosts(fetchedPosts.slice(startingIndex, endingIndex));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchData();
  }, [startingIndex, endingIndex]);
  

  const loadMorePosts = () => {
    const newStartingIndex = startingIndex + 12;
    const newEndingIndex = endingIndex + 12;
    setStartingIndex(newStartingIndex);
    setEndingIndex(newEndingIndex);
    setDisplayedPosts(posts.slice(newStartingIndex, newEndingIndex))
  }

  return (
    <div className="container">
      <div className="row">
        {displayedPosts.map((post) => (
          <div className=" col-lg-4 col-md-6" key={post._id} style={{ marginTop: "20px" }}>
            <div className="card" style={{ width: "100%", height: "550px", display: 'flex', flexDirection: "column", marginTop: "20px" }}>
              {post.image && (
                <img src={post.image} className="card-img-top" alt={`for ${post.title}`} style={{ height: "300px", objectFit: "cover" }} />
              )}
              <div className="card-body" style={{ flex: "1 1 auto" }}>
                <button className="btn btn-secondary" style={{ marginRight: "10px"}}>{post.category}</button>
                <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                <div>
                  <div>{post.content.length > 100 ? `${post.content.slice(0, 180)}...` : post.content}</div>
                  <div className="mt-2">
                    <h7 style={{ color: "brown" }}>{post.author}</h7> - <span className="text-secondary">{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {endingIndex < posts.length && (
        <div className="text-center my-4">
          <button className="btn btn-primary" onClick={loadMorePosts}>Load More</button>
      </div>
      )}
    </div>
  );
};

export default Home;
