import React, { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';
import '../style.css';
import logo from '../logo.png'
const Register = () => {
  
    const [errorMessage, setErrorMessage] = useState('Identificación, Email y/o Telefono ya existe en nuestra base de datos');
    const [datos, setDatos] = useState({
        identificacion: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        email: '',
        password: ''
    })
    const alertaSuccess = (Mensaje) => {
        store.addNotification({
            title: "Mensaje",
            message: Mensaje,
            type: "info",
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
        // console.log(datos.identificacion + ' ' + datos.nombres + ' ' + datos.apellidos
        // + datos.telefono + datos.email + datos.password)
        let Url = "http://127.0.0.1:8000/api/users/store";
        axios.post(Url, datos)
            .then(response => {
            //    console.log(response.data);
               if(response.data.status_api === "error"){
                setErrorMessage(response.data.message); //seteamos el error 
                alertaError(errorMessage)
               }else if(response.data.status_api === "InsertOk"){
                setErrorMessage(response.data.message); //seteamos el error 
                alertaSuccess(response.data.message)
                e.target.reset()
                e.target.identificacion.focus()
               }
               
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
      <ReactNotification />

                <form action="" onSubmit={enviarDatos} className="form" >
                <h3>Api React- Laravel</h3>
                    <img src={logo} />
                    <input type="number" required
                        name="identificacion" max="9999999999" min="0"
                        className=" form-control input"
                        placeholder="Identificación"  
                        onChange={capturaDatos}
                    />
                    <input type="text" required
                        name="nombres"
                        className=" form-control input"
                        placeholder="Nombres"
                        onChange={capturaDatos}
                    />
                    <input type="text" required
                        name="apellidos"
                        className=" form-control input"
                        placeholder="Apellidos"
                        onChange={capturaDatos}
                    />
                    <input type="number" required
                        name="telefono"
                        className=" form-control input"  max="9999999999" min="0"
                        placeholder="Telefono" 
                        onChange={capturaDatos}
                    />
                    <input type="email" required
                        name="email"
                        className=" form-control input"
                        onChange={capturaDatos}
                        placeholder="email"
                    />
                    <input type="password" required
                        name="password"
                        className=" form-control input"
                        onChange={capturaDatos}
                        placeholder="password"
                    />
                    <button className="btn-register" >Register</button>
                    <Link to={'/login'} className="register">Login</Link>
                </form>
              
        </>
    );
}

export default Register;







