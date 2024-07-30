import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/posts/search?query=${query}`);
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="container mt-5">
      <h1>Search Results for "{query}"</h1>
      <div className="row">
        {posts.length === 0 ? (
          <p>No results found.</p>
        ) : (
          posts.map(post => (
            <div className="col-md-4" key={post._id} style={{ marginTop: "20px" }}>
              <div className="card" style={{ width: "100%", marginTop: "20px", gap: "20px" }}>
                {post.image && (
                  <img src={`http://localhost:5000/${post.image}`} className="card-img-top" alt={`for ${post.title}`} style={{ height: "300px" }} />
                )}
                <div className="card-body">
                  <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                  <div>
                    <div>{post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}</div>
                    {post.author} - <span className="text-secondary">{new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
