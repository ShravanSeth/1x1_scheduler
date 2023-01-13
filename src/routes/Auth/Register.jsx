import { useEffect, useState } from "react";
import "../style.css";
import FormInput from "../../components/FormInput/FormInput";
import Select from "react-select";
import Service from "../../services/httpService";
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
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
    first_name: "",
    last_name: "",
    gender: "",
    email:"",
    area_of_interest:"",
    work_experience:"",
    password:"",
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
  const studentInput = [
    {
        id: 1,
        name: "first_name",
        type: "name",
        placeholder: "First Name",
        errorMessage:
          "Enter your First Name",
        label: "First Name",
        required: true,
    },
    {
        id: 2,
        name: "last_name",
        type: "text",
        placeholder: "Last Name",
        errorMessage:
          "Enter your Last Name",
        label: "Last Name",
        required: true,
    },
    {
        id: 3,
        name: "gender",
        type: "gender",
        placeholder: "Gender",
        errorMessage:
          "Enter your Gender",
        label: "Gender",
        required: true,
    },
    {
      id: 4,
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
      id: 5,
      name: "password",
      type:"password",
      placeholder: "Password",
      errorMessage:
        "Enter Password",
      label: "Password",
      required: true,
    },
  ];

  const mentorInput = [
    {
        id: 1,
        name: "first_name",
        type: "name",
        placeholder: "First Name",
        errorMessage:
          "Enter your First Name",
        label: "First Name",
        required: true,
    },
    {
        id: 2,
        name: "last_name",
        type: "text",
        placeholder: "Last Name",
        errorMessage:
          "Enter your Last Name",
        label: "Last Name",
        required: true,
    },
    {
        id: 3,
        name: "gender",
        type: "gender",
        placeholder: "Gender",
        errorMessage:
          "Enter your Gender",
        label: "Gender",
        required: true,
    },
    {
      id: 4,
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
      id: 5,
      name: "password",
      type:"password",
      placeholder: "Password",
      errorMessage:
        "Enter Password",
      label: "Password",
      required: true,
    },
    {
        id: 6,
        name: "area_of_interest",
        type:"text",
        placeholder: "Area Of interest",
        errorMessage:
          "Enter Area of Interest",
        label: "Area of Interest",
        required: true,
      },
      {
        id: 7,
        name: "work_experience",
        type:"text",
        placeholder: "Work Experience",
        errorMessage:
          "Enter Work Experience",
        label: "Work Expirience",
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
    services.post("api/mentor",values).then((res)=>{
      routeChange('../login')
      openModal();
    }).catch((res)=>{
      console.log(res)
     setRes(res.data.data);
      openModal();
    })
  };

  const studentSubmit = (e) => {
    e.preventDefault();
    services.post("api/student",values).then((res)=>{
      routeChange('../login')
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
        <h1>Register</h1>
        <label>Who are you?</label>
        <Select required={true} options={options} name="whois"  onChange={(e) => {
    setValues({ ...values, whois: e.value });
  }} />
    {values.whois == 'student'?
        studentInput.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        )): mentorInput.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))
        
    }
        <div>
     
        </div>
        <button>Register</button>
        <Link to={localStorage.getItem('authorisation')?'/mentor':'/login'} style={{ textDecoration: 'none'}}>
        <h3>Already a User?</h3>
        </Link>
      </form>:
    <div className="scheduler"></div>}
    </div>
    
  );
};

export default Register;