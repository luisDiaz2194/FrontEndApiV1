import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';
import '../style.css';

const Profile = () => {
   const token = localStorage.getItem("token");
   const Url = "http://127.0.0.1:8000/api/";
   const queryParams = new URLSearchParams(window.location.search);
   const id = queryParams.get('id');
   const history = useHistory();
   const [errorMessage, setErrorMessage] = useState('');

   const [display, setdisplay] = useState(false)

   const [datos, setdatos] = useState({
      id: id,
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
      setdatos({
         ...datos,
         [event.target.name]: event.target.value
      })
   }
   const enviarDatos = (e) => {
      e.preventDefault();
      //  console.log(datos)

      axios.put(Url + "users/" + datos.id, datos, { headers: { "Authorization": `Bearer ${token}` } })
         .then(response => {
            console.log(response.data);
            if (response.data.status_api === 'Identificación Repetida') {
               setErrorMessage(response.data.message);
               alertaError(response.data.message)
            } else if (response.data.status_api === 'Email Repetido') {
               setErrorMessage(response.data.message);
               alertaError(response.data.message)
            } else if (response.data.status_api === 'Telefono Repetida') {
               setErrorMessage(response.data.message);
               alertaError(response.data.message)
            } else {
               setErrorMessage(response.data.message);
               alertaSuccess(response.data.message)

            }
         }).catch(error => {
            console.log(error);
         })
   }


   useEffect(() => {
      if (datos.id !== localStorage.getItem("id")) {
         setdisplay(true)
         history.push('/')
      }
      if (token) {
         axios.get(Url + "users/" + datos.id, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
               //   console.log(response.data.identificacion) 

               setdatos({
                  ...datos,
                  identificacion: response.data.identificacion,
                  nombres: response.data.nombres,
                  apellidos: response.data.apellidos,
                  telefono: response.data.telefono,
                  email: response.data.email,
                  password: response.data.password,
               });

            }).catch(error => {
               console.log(error)
            })
      } else {
         history.push('/login');
      }
   }, [])
   return (
      <>

         <ReactNotification />
         <div className="alert alert-info">
            <p>Bienvenido al sistema <strong>{datos.nombres} {datos.apellidos}</strong> </p> <br />
            <div className="btn-group">
                <strong><Link to={'/logout'} className="logout mx-2" >Logout</Link></strong>
            <strong><Link to={'/'} className="logout" >Home</Link></strong>
            </div>
           
         </div>
         <div className="container">

            <form action="" className="form" onSubmit={enviarDatos} >
               <h4>Edit Profile</h4>
               <input type="hidden" name="id" defaultValue={datos.id} />
               <input type="text" required
                  name="identificacion" defaultValue={datos.identificacion}
                  className="form-control input" onChange={capturaDatos}
                  placeholder="Identificación"

               />
               <input type="text" required
                  name="nombres" defaultValue={datos.nombres}
                  className="form-control input" onChange={capturaDatos}
                  placeholder="Nombres"

               />
               <input type="text" required
                  name="apellidos" defaultValue={datos.apellidos}
                  className="form-control input" onChange={capturaDatos}
                  placeholder="Apellidos"

               />
               <input type="text" required
                  name="telefono" defaultValue={datos.telefono}
                  className="form-control input" onChange={capturaDatos}
                  placeholder="Telefono"

               />
               <input type="email" required
                  name="email" defaultValue={datos.email}
                  className="form-control input" onChange={capturaDatos}

                  placeholder="email"
               />
               <input type="password"
                  name="password" required
                  className="form-control input" onChange={capturaDatos}

                  placeholder="password"
               />
               <button className="btn-register" disabled={display} >Update</button>
            </form>

         </div>

      </>
   );
}

export default Profile;