import React, { useState } from 'react'
import './Login.css'
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const INITIAL = {
    email: "",
    password: "",
};

const Login = () => {
    const [form, setForm] = useState(INITIAL);
    const [errorUI, setErrorUI] = useState({});
    const [passVisible, setPassVisible] = useState(false);
    const navigate = useNavigate();

    const togglePassVisibility = () => {
        setPassVisible((prevVisisble) => !prevVisisble);
    };

    const VALIDATION = {
        email: [
            {
              isValid: (value) => !!value,
              message: "Is required.",
            },
            {
              isValid: (value) => /\S+@\S+\.\S+/.test(value),
              message: "Not an email.",
            },
        ],
      
        password: [
            {
              isValid: (value) => !!value,
              message: "Is required.",
            },
            {
              isValid: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value),
              message:
                "Requires 6+ characters, Uppercase, Lowercase letters, numeric digit (0-9) and a special character.",
            },
        ],
    };

    const getErrorFields = (form) =>
    Object.keys(form).reduce((acc, key) => {
      if (!VALIDATION[key]) return acc;

      const errorsPerField = VALIDATION[key]
        .map((validation) => ({
          isValid: validation.isValid(form[key]),
          message: validation.message,
        }))
        .filter((errorPerField) => !errorPerField.isValid);

      return { ...acc, [key]: errorsPerField };
    }, {});

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (errorUI) setErrorUI({});
        setForm((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        console.log({ id, value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const errorFields = getErrorFields(form);
      const hasErrors = Object.values(errorFields).flat().length > 0;
      if (hasErrors) return setErrorUI({ ...errorFields });
      setForm(INITIAL);
      // setLoading(true);
      console.log("Form submitted");


      // Extract email and password from the form state
      const { email, password } = form;
      // Check if the email and password are valid
      if (!email || !password) {
        setErrorUI({
        email: [{ message: "Email and password are required." }],
        });
      return;
      }
      //Then create user with email and password
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User logged in successfully:", userCredential);
          navigate('/home')
        }).catch((error) => {
          console.log("Firebase authentication error:", error);
          // Update the errorUI state to display the error message
          setErrorUI({
            email: [{ message: "This user is not registered" }],
          });
        })
    }

  return (
    <div className='login_container'>
        <div className='login_left'>
            <div className='left_content'>
                <div className='signup_header'>
                    <h1>Welcome back</h1>
                    <p>Welcome back! please enter your details</p>
                </div>

                <form onSubmit={handleSubmit} className='login_form'>
                    <div className='login_input_divs'>
                        <div className='login_input'>
                            <label htmlFor="email">Username or Email</label>
                            <input type="text" id="email" value={form.email} onChange={handleChange} placeholder='Enter Username or Email'/>
                            <p className='error'>
                                {errorUI?.email?.length ? (
                                    <span style={{ color: "red" }}>
                                    {errorUI.email[0].message}
                                    </span>
                                ) : null}
                            </p>
                        </div>

                        <div className='login_input'>
                            <label htmlFor="password">Password</label>
                            <input type={passVisible ? 'text' : 'password'} id="password" value={form.password} onChange={handleChange} placeholder='Password'/>
                            {passVisible ? (<AiOutlineEye className='passOpeneye' onClick={togglePassVisibility}/>) 
                            : (<AiOutlineEyeInvisible className='passOpeneye' onClick={togglePassVisibility}/>)}
                            <p className='error'>
                                {errorUI?.password?.length ? (
                                    <span style={{ color: "red" }}>
                                    {errorUI.password[0].message}
                                    </span>
                                ) : null}
                            </p>
                        </div>
                    </div>

                    <a href="/" className='login_forgot'>Forgot Password?</a>

                    <div className='login_btns'>
                        <button className='signin_btn'>Login</button>
                        <button><FcGoogle />  Sign in with Google</button>
                        <p className='login_text'>Dont have an account? <Link to='/signup'>Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login;