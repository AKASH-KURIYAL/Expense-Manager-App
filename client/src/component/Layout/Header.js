import React, {useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [loginUser,setLoginUser] = useState('');
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setLoginUser(user);
    }
  },[]);
  const logoutHandler = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className = "titles">
    <nav className="navbar navbar-expand-lg navbar-light bg-lighter">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1>Expense Management</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-0 mb-lg-0">
            <li className="nav-item">  
            <p className = "nav-link cursor-pointer" style={{fontSize:'18px'}}>{loginUser && loginUser.name}</p>
            </li> 
            <button className = "btn btn-primary" style = {{height:'40px'}} onClick={logoutHandler}>
             Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Header;