import { useEffect, useState } from "react";
import "../style.css";
import FormInput from "../../components/FormInput/FormInput";
import Select from "react-select";
import Service from "../../services/httpService";
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const routeChange = (newPath) =>{ 
    let path = newPath; 
    navigate(path);
  }
  //LOADER
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        setLoading(true);
    }, 5000)
}, []);

  //VARIABLES
  const services = new Service();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [res, setRes]= useState("")
  const [values, setValues] = useState({
    email: "",
    password: "",
    whois: "",
  });
  
  //MODAL CSS
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      width:'35%',
      textAlign:'center',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  //INPUTS
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage:
        "Enter a valid email address",
      label: "Email",
      pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type:"password",
      placeholder: "Password",
      errorMessage:
        "Enter Password",
      label: "Password",
      required: true,
    },
  ];

  const options = [
    { value: 'mentor', label: 'Mentor' },
    { value: 'student', label: 'Student' }
  ]

  //MODAL FUNCTIONS
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  //FORM FUNCTIONS
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values)
  };

  const mentorSubmit = (e) => {
    e.preventDefault();
    services.post("api/mentor/login",values).then((res)=>{
      localStorage.setItem('authorisation',res.data.token)
      routeChange('../student')
      openModal();
    }).catch((res)=>{
      console.log(res)
     setRes(res.data.data);
      openModal();
    })
  };

  const studentSubmit = (e) => {
    e.preventDefault();
    services.post("api/student/login",values).then((res)=>{
      localStorage.setItem('authorisation',res.data.token)
      routeChange('../student')
    }).catch((res)=>{
      console.log(res)
     setRes(res.data.data);
      openModal();
    })
  };

  return (
    <div className="app">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <h2 >{res}</h2>
        <button onClick={closeModal}>close</button>

      </Modal>
      {loading?
      <form onSubmit={values.whois=='student'?studentSubmit:mentorSubmit}>
        <h1>Login</h1>
        <label>Who are you?</label>
        <Select required={true} options={options} name="whois"  onChange={(e) => {
    setValues({ ...values, whois: e.value });
  }} />
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div>
     
        </div>
        <button>Login</button>
        <Link to={localStorage.getItem('authorisation')?'/student':'/register'} style={{ textDecoration: 'none'}}>
        <h3>New User?</h3>
        </Link>
      </form>:
    <div className="scheduler"></div>}
    </div>
    
  );
};

export default Login;