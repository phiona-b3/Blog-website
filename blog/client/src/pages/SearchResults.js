import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import http from '../lib/http';

const SearchResults = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await http.get(`/posts/search?query=${query}`);
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);
  const imageDomain = process.env.NODE_ENV === 'production' ? 'https://your-backend-domain.com' : 'http://localhost:5000';

  return (
    <div className="container mt-5">
      <h1>Search Results for "{query}"</h1>
      <div className="row">
        {posts.length === 0 ? (
          <p>No results found.</p>
        ) : (
          posts.map(post => (
            <div className="col-md-4" key={post._id} style={{ marginTop: "20px" }}>
              <div className="card" style={{ width: "100%", marginTop: "20px", gap: "20px", height: "550px" }}>
                {post.image && (
                  <img src={`${imageDomain}/${post.image}`} className="card-img-top" alt={`for ${post.title}`} style={{ width: '100%', height: '300px', objectFit: "cover" }} />
                )}
                <div className="card-body">
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
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
