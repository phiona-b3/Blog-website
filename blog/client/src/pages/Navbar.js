import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../images/logo.png';


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ textAlign: "center" }}>
      <div className="container-fluid">
        <img src={logo} alt="logo" className="logo-img" style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" activeClassName="active" aria-current="page" to="/">BlogPosts</Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link" activeClassName="active">New</Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link" activeClassName="active">Profile</Link>
            </li>
            <li>
              <Link to='/signin' className="nav-link" activeClassName="active">SignIn</Link>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
