import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0,0,0,0.75)',
    textAlign: 'center',
    width: '450px'
  }
};

// PasswordInput component
const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="password-input">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="Enter Password"
      />
      <button type="button" onClick={togglePasswordVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const [background, setBackground] = useState('red');
  const [loginmodalOpen, setLoginModalopen] = useState(false);
  const [accmodalOpen, setAccModalOpen] = useState(false);
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [pic, setPic] = useState('');
  const [logUser, setLogUser] = useState([]);
  const [signUser, setSignUser] = useState([]);
  const [name, setName] = useState('');
  // const [loginName, aetLoginName] = useState('');

  useEffect(() => {
    setBackground(location.pathname === '/' ? 'gray' : 'red');
  }, [location.pathname]);

  const loginOpen = () => {
    setLoginModalopen(true);
  };

  const accountOpen = () => {
    setAccModalOpen(true);
  };

  const loginClose = () => {
    setLoginModalopen(false);
  };

  const accountClose = () => {
    setAccModalOpen(false);
  };

  const LogOut = () => {
    googleLogout();
    setLogin(false);
    sessionStorage.clear();
  };

  const responseGoogle = response => {
    setLogin(true);
    const decode = jwtDecode(response.credential);
    setUsername(decode.given_name);
    setPic(decode.picture);
  };

  const loginApi = e => {
    e.preventDefault();
    const data = {
      email: mail,
      password: pass
    };

    axios
      .post('https://online-food-order-website-backend-1.onrender.com//signin', data)
      .then(res => {
        setLogin(true);
        sessionStorage.setItem('user', res.data.user.username);
        setLogUser(res.data.user);
        setUsername(res.data.user.username);
      })
      .catch(err => console.error('Login failed:', err));
    loginClose();
    accountClose();
  };

  const signupApi = e => {
    e.preventDefault();
    const data = {
      username: name,
      email: mail,
      password: pass
    };

    axios
      .post('https://online-food-order-website-backend-1.onrender.com/signup', data)
      .then(res => setSignUser(res.data))
      .catch(err => console.error('Signup failed:', err));
      accountClose();
      loginClose();
  };

  const targetName = e => {
    setName(e.target.value);
  };

  const targetMail = e => {
    setMail(e.target.value);
  };

  const targetPass = e => {
    setPass(e.target.value);
  };

  return (
      <div>
         {!login ? (
             <div className="sticky" style={{ backgroundColor: background }}>
             <div className="logofil">e!</div>
             <button type="button" className="btn butn" data-bs-toggle="button" onClick={loginOpen}>Login</button>
             <button type="button" className="btn btn-outline-dark but1" onClick={accountOpen}>Create an account</button>
      </div>) : 
      (<div class="container-fluid head" style={{ backgroundColor: background, height:"65px" }}>
          <div class="box">e!</div>
          <img
          className='user-info'
            src={pic}
            alt="my img"
            // height={'50px'}
            // width={'60px'}
            style={{ borderRadius: '50%', marginTop: '18px', marginRight: '50px',width:"70px" }}
          />
          <button class="btn btn-outline-danger text-white mx-2" onClick={LogOut} style={{ float: 'right',marginTop:"15px" }}>Logout</button>
          <button class="btn btn-outline-danger text-white" style={{ float: 'right',marginTop:"15px" }}>{username}</button>
        </div>
      )}
      <Modal id="login" isOpen={loginmodalOpen} style={customStyles}>
          <h1 style={{ margin: 'auto', textAlign: 'center', color: 'orange'}}><b>Login credentials</b></h1>
        <label><h3 style={{ color: 'deeppink' }}>Username :</h3></label>
        <br/>
        <input
          type="name"
          value={name}
          className="border border-3 rounded-3 shadow-lg  mb-5 bg-body"
          onChange={targetName}
          placeholder="Enter username"
        />
        <br/>
        <label><h3 style={{ color: 'deeppink' }}>Email:</h3></label>
        <br />
        <input
          type="email"
          value={mail}
          className="border border-3 rounded-3 shadow-lg  mb-5 bg-body"
          onChange={targetMail}
          placeholder="Enter a valid Email"
        />
        <br />
        <label><h3 style={{ color: 'deeppink' }}>Password:</h3></label>
        <br />
        <PasswordInput value={pass} onChange={targetPass} />
        <br />
        <button className="logins" type="login" value={username} onClick={loginApi}>Login</button>
        <br />
        <br />
        <div style={{ textAlign: 'center' }} className="px-5">
          <GoogleOAuthProvider clientId="521645102706-52e53b8ctp5vqvq4hdkhkij8dtis2kgh.apps.googleusercontent.com" >
             <div style={{marginLeft:"30px"}}><GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} /></div> 
          </GoogleOAuthProvider>
        </div>
        <br />
        <br />
        <button className="close" onClick={loginClose}>Close</button>
        <br />
      </Modal>
      <Modal isOpen={accmodalOpen} style={customStyles}>
          <form onSubmit={signupApi} >
              <h1 style={{ color: 'orange' }}>Registration Form</h1>
          <br />
          <label><h3 style={{ color: 'deeppink' }}>Username :</h3></label>
          <br />
          <input
            type="text"
            onChange={targetName}
            value={name}
            className="border border-3 rounded-3 shadow-lg  mb-5 bg-body"
            placeholder="Enter a name"
          />
          <br />
          <label><h3 style={{ color: 'deeppink' }}>Email:</h3></label>
          <br />
          <input
            type="email"
            onChange={targetMail}
            value={mail}
            className="border border-3 rounded-3 shadow-lg  mb-5 bg-body"
            placeholder="Enter a valid Email"
          />
          <br />
          <label><h3 style={{ color: 'deeppink' }}>Password:</h3></label>
          <br />
          <PasswordInput value={pass} onChange={targetPass} />
          <br />
          <a href=" ">Do you have any account.</a>
          <br />
          <br />
          <input type="submit" className="border border-3 rounded-3 submit" onClick={signupApi} value="Submit" />
          <button className="close" onClick={loginClose} style={{marginLeft:"10px"}}>Close</button>
        </form>
      </Modal>
    </div>
  );
};

export default Header;
