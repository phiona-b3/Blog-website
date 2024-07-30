import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [startingIndex, setStartingIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(12);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('http://localhost:5000/posts');
        console.log('Fetched posts:', data); // Log fetched data for debugging
        // Assuming data.data.posts contains an array of posts with `image` field as "uploads/image-1721135981072.png"
        const fetchedPosts = data.data.posts.map(post => ({
          ...post,
          image: `http://localhost:5000/${post.image}` // Constructing full image URL
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
                  {post.author} - <span className="text-secondary">{new Date(post.createdAt).toLocaleString()}</span>
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


/*

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import logo from '../images/logo.png';
//import http from '../lib/http';

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://localhost:5000/posts')
      setPosts(data.data.posts)
    }
    fetchData();
  }, [])

  return (
    <div className="container">
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id} style={{ marginTop: "20px" }}>
            <div className="card" style={{ width: "100%", marginTop: "20px", gap: "20px" }}>
              <img src={post.imageUrl} className="card-img-top" alt={`${post.title}`} />
              <div className="card-body">
                <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>{post.title}</Link>
                <div>
                  <div>{post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content}</div>
                  {post.author} - <span className="text-secondary">{post.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    //<div className="container" style={{ maxWidth: '800px' }}>
      //<ul className="list-group list-group-flush" >
        //{posts.map((post) => (
          //<li className="list-group-item" key={post._id}>
            //<div className="fw-bold h3">
              //<Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
                //{post.title}
              //</Link>
            //</div>
            //<div>
              //{post.author} - <span className="text-secondary">{post.createdAt}</span>
            //</div>
          //</li>
        //))}
      //</ul>
    //</div>
  )
}

export default Home

 
*/
