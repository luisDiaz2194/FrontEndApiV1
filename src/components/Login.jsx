import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';
import '../style.css';
import logo from '../logo.png'
const Login = () => {



  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('Hubo un Error');
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  })
  const alertaError = (errorMessage) => {
    store.addNotification({
      title: "Mensaje",
      message: errorMessage,
      type: "danger",
      insert: "left",
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }

  const capturaDatos = (event) => {
    //  console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const enviarDatos = (e) => {
    e.preventDefault();
    let Url = "http://127.0.0.1:8000/api/login";
    axios.post(Url, datos)
      .then(response => {
        if (response.data.status_api === 'ok') {
          setErrorMessage(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          history.push('/')
        } else {
          setErrorMessage(response.data.message);
          alertaError(errorMessage)
        }

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <>
      <ReactNotification />
      <form action="" onSubmit={enviarDatos} className="form">
        <h3>Api React- Laravel</h3>
        <img src={logo} />
        <input type="email" required
          onChange={capturaDatos}
          name="email"
          className=" form-control input "
          placeholder="Email" />
        <input type="password" required
          onChange={capturaDatos}
          name="password"
          className="form-control  input "
          placeholder="password" />
        <button className="btn-login">Login</button>
        <Link to='/register' className="register">Register</Link>
      </form>

    </>
  );
}

export default Login;

