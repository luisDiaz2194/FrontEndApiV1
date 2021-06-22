import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalFooter, ModalBody, ModalHeader  } from 'reactstrap';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.compat.css';

const Home = () => {

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const Url = "http://127.0.0.1:8000/api/";
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [datos, setdatos] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: ''
  });
  const [identi, setidenti] = useState('')
  const [Users, setUsers] = useState([])
  const [usuarioInsert, setusuarioInsert] = useState([])
  const [usuarioseleccionado, setusuarioseleccionado] = useState({
    id: id,
    identificacion: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: ''
  });
  const [ModalEditar, setModalEditar] = useState(false)
  const [ModalAgregar, setModalAgregar] = useState(false)
  const SeleccionarUsu = (usuario, caso) => {
    setusuarioseleccionado(usuario);
    (caso === 'Editar') && setModalEditar(true)
  }
  const capturaDatos = (event) => {
    setdatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const capturaDatosAdd = (event) => {
    setusuarioInsert({
      ...usuarioInsert,
      [event.target.name]: event.target.value
    })
  }
 
  
  const obtenerDatosUpdat  = (event) => {
    setusuarioseleccionado({
      ...usuarioseleccionado,
      [event.target.name]: event.target.value
    })
  }
  /*************************************** ALERTAS*/


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

  /************************************** FIN ALERTAS */
  //Petición Get
  const peticionGet = async () => {
    await axios.get(Url + "users?parametro=" + id, { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        setdatos({
          ...datos,
          identificacion: response.data[0].identificacion,
          nombres: response.data[0].nombres,
          apellidos: response.data[0].apellidos,
          telefono: response.data[0].telefono,
          email: response.data[0].email,
          password: response.data[0].password,
        })
        setidenti(response.data[0].id)
      }).catch(error => {
        console.log(error)
      })
    //obtener todos los usuarios
    await axios.get(Url + "users", { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
        setUsers(response.data)
      }).catch(error => {
        console.log(error)
      })
  }
  /*********************** PERTICION POST */
  const perticionPost = async (e) =>{
    await axios.post(Url +"users/store", usuarioInsert)
    .then(response => {
      //  console.log(response.data);
       if(response.data.status_api === "error"){
        setErrorMessage(response.data.message);
        alertaError(response.data.message)
       }else if(response.data.status_api === "InsertOk"){
        setErrorMessage(response.data.message);
        alertaSuccess(response.data.message)
        peticionGet();
        setModalAgregar(false)
       }
       
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  /**************************FIN PETICION POST */
  /************************************************ */
  //Petición Put
  const peticionPut = async () => {
    await axios.put(Url + "users/" + usuarioseleccionado.id, usuarioseleccionado, { headers: { "Authorization": `Bearer ${token}` } })
      .then(response => {
      //  console.log(response.data);
        if (response.data.status_api === 'Error') {
          setErrorMessage(response.data.message);
          alertaError(response.data.message)
        } else {
          setErrorMessage(response.data.message);
          peticionGet();
          alertaSuccess(response.data.message)
          setModalEditar(false);

        }
      }).catch(error => {
        console.log(error);

      })
  }
  /********************************************************* */
  useEffect(async () => {
    
    if (token !== null) {
      await peticionGet();
    } else {
      history.push('/login')
    }
  }, [])

  /************************************** */

  const enviarDatos = async (e) => {
    e.preventDefault();
    if (token !== null) {
      await peticionPut();
    } else {
      history.push('/login')
    }
  }


  /*********************************** Register */

  const RegistroDatos = async (e) => {
    e.preventDefault();
    if (token != null){
        await perticionPost();
    }else{
      history.push('/login')
    }
  }

  /**************************************Fin Register */
  return (

    <React.Fragment>
      <ReactNotification />
      <div className="alert alert-info">
        <p>Bienvenido al sistema <strong>{datos.nombres} {datos.apellidos}</strong> </p> <br />
        <strong><Link to={'/logout'} className="logout" >Logout</Link></strong>{' '}
        <button className="btn-register" onClick={() => setModalAgregar(true)}>Agregar</button>
      </div>
      <hr />
      <Modal isOpen={ModalEditar}>
        <ModalHeader className="bg-primary text-light "> Edit Profile</ModalHeader>
        <ModalBody>
          <form action="" onSubmit={enviarDatos}>
            <input type="hidden" name="id" defaultValue={usuarioseleccionado && usuarioseleccionado.id} />
            <input type="number" required onChange={obtenerDatosUpdat}
              name="identificacion" defaultValue={usuarioseleccionado && usuarioseleccionado.identificacion}
              className="form-control input"
              placeholder="Identificación"

            />
            <input type="text" required onChange={obtenerDatosUpdat}
              name="nombres" defaultValue={usuarioseleccionado && usuarioseleccionado.nombres}
              className="form-control input"
              placeholder="Nombres"

            />
            <input type="text" required onChange={obtenerDatosUpdat}
              name="apellidos" defaultValue={usuarioseleccionado && usuarioseleccionado.apellidos}
              className="form-control input"
              placeholder="Apellidos"

            />
            <input type="number" required onChange={obtenerDatosUpdat}
              name="telefono" defaultValue={usuarioseleccionado && usuarioseleccionado.telefono}
              className="form-control input"
              placeholder="Telefono"

            />
            <input type="email" required onChange={obtenerDatosUpdat}
              name="email" defaultValue={usuarioseleccionado && usuarioseleccionado.email}
              className="form-control input"
              placeholder="email"
            />
            <input type="password" onChange={obtenerDatosUpdat}
              name="password" required 
              className="form-control input"
              placeholder="password"
            />
            <ModalFooter>
              <button className="btn-register">Update</button>
              <button className="btn-cancel" onClick={() => setModalEditar(false)}>Cancel</button>
            </ModalFooter>
          </form>

        </ModalBody>

      </Modal>
      <Modal isOpen={ModalAgregar}>
        <ModalHeader className="bg-primary text-light ">Register New User</ModalHeader>
        <ModalBody>
          <form action="" onSubmit={RegistroDatos}>

            <input type="number" required
              name="identificacion"
              className="form-control input"
              placeholder="Identificación"
              onChange={capturaDatosAdd}
            />
            <input type="text" required
              name="nombres"
              className="form-control input"
              placeholder="Nombres"
              onChange={capturaDatosAdd}
            />
            <input type="text" required
              name="apellidos"
              className="form-control input"
              placeholder="Apellidos"
              onChange={capturaDatosAdd}
              

            />
            <input type="number" required
              name="telefono"
              className="form-control input"
              placeholder="Telefono"
              onChange={capturaDatosAdd}
              

            />
            <input type="email" required
              name="email"
              className="form-control input"
              placeholder="email"
              onChange={capturaDatosAdd}
              

            />
            <input type="password"
              name="password" required
              className="form-control input"
              placeholder="password"
              onChange={capturaDatosAdd}
              

            />
          <button className="btn-register">Register</button>
          <button className="btn-cancel" onClick={() => setModalAgregar(false)}>Cancel</button>
          </form>

        </ModalBody>
      
      </Modal>
     
      <div className="row">
        {
        Users.map((item) => 
        <div className="col-md-3" key={item.id}>
        <div className="card">
              <div className="card-header" >
                <strong>{item.nombres} {item.apellidos}</strong>
              </div>
              <div className="card-body">
                <p> 
                  Identificación : <strong>{item.identificacion}</strong><br />
                  Telefono : <strong>{item.telefono}</strong><br />
                  Email : <strong>{item.email}</strong><br />
                </p>
              </div>
              <div className="card-footer">
              <button className="btn-register" onClick={() => SeleccionarUsu(item, 'Editar')}>Update</button>
              </div>
            </div>
        </div>
            
        )
      }
      </div>
     
      
    </React.Fragment>


  );
}

export default Home;


