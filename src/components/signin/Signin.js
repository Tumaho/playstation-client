import axios from 'axios';
import { useState,useEffect } from 'react';
import cookie from 'react-cookies'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Spinner, Button } from "react-bootstrap";
import './signin.css'

function Signin() {

  
  
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // handle the LOGIN button
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        await axios
            .post("https://worker-production-87fe.up.railway.app/api/v1/users/login", data)
            .then(res => {
                console.log("RESPONSE : ", res);

                cookie.save('token', res.data.data.token,{expires: new Date(Date.now() + 86400000)});
                setLoading(false)
                navigate('/main');
            })
            .catch(err => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect',
                    text: 'The email address or password is incorrect. Please try again',

                })
                console.log("ERROR :", err);
            })
    }


    useEffect(() => {
        if (cookie.load("token")) {
          navigate("/main");
        }
      }, []);
    return (
        <div className='body'>
            <div className="container">
                <div className="form-box">
                    <div className="header-form">
                        <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i></h4>
                        <div className="image">
                        </div>
                    </div>
                    <div className="body-form">
                        <form onSubmit={(e) => { handleSubmit(e) }}>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" name='email' required />
                            </div>
                            <div className="input-group mb-3">
                                <input type='password' className="form-control" placeholder="Password" name='password' required />
                            </div>

                            {loading ? (
                                <Button variant="worning" disabled
                                    style={{
                                        marginTop: "40px",
                                        marginBottom: "40px",
                                        marginLeft: "105px"
                                    }}>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Loading...
                                </Button>
                            ) : (<button type="submit" className="btn btn-secondary btn-block" id='button'>LOGIN</button>)}
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;