import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Navbar = () => {

    const [logeado, setlogeado] = useState(false)
    const style = {
        color: 'teal'
    };
    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            setlogeado(true);
        }
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" >FrontApi React</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        logeado ? (
                            <ul className="navbar-nav ">
                                <li className="nav-item ">
                                    <Link to={'/logout'} className="nav-link" style={style} >Logout</Link>
                                </li>
                                <li className="nav-item ">
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/register'} className="nav-link" >Register</Link>
                                </li>
                            </ul>
                        )
                    }

                </div>
            </nav>


        </>
    )
}

export default Navbar
