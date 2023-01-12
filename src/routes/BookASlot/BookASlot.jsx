import { useEffect, useState } from "react";
import "../style.css";
import Select from "react-select";
import Service from "../../services/httpService";
import Modal from 'react-modal';

const BookASlot = () => {

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
    username: "",
    age: "",
    feesOfMonth: new Date(),
    criteria: "",
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
  const options = [
    { value: 'areaOfInterest', label: 'Area of Interest'},
    { value: 'mentor', label: 'Specific Mentor (Premium)' },
  ]
  const duration = [
    { value: '30', label: '30 Minutes'},
    { value: '45', label: '45 Minutes' },
    { value: '60', label: '60 Minutes' },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    services.post("/fees/payfees",values).then((res)=>{
      setRes(res.data.message);
      openModal();
    }).catch((res)=>{
      setRes(res.data.message);
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
      <form onSubmit={handleSubmit}>
        <h1>Book an Interview</h1>
        <h3>30 Minutes - ₹2000 <br/> 45 Minutes - ₹3000 <br/>60Minutes - ₹4000 <br/> Additional Premium Charges - ₹1000</h3>
        
        <label>Criteria of Selection</label>
        <Select required={true} options={options} name="criteria"  onChange={(e) => {
    setValues({ ...values, criteria: e.value });
  }} />
        
        {
        values.criteria == 'mentor' ? 
          <label>Select Mentor</label>:
          <label>Select Area of Interest</label>
        }
        {values.criteria =='mentor'?
        <Select required={true} options={options} name="criteria"  onChange={(e) => {
        setValues({ ...values, criteria: e.value });
          }} />
          :
          <Select required={true} options={options} name="criteria"  onChange={(e) => {
            setValues({ ...values, criteria: e.value });
              }} />
        }

        <label>Duration</label>
        <Select required={true} options={duration} name="criteria"  onChange={(e) => {
    setValues({ ...values, criteria: e.value });
  }} />
        <div> 
        </div>
        <button>Book a Slot</button>
      </form>:
    <div className="yoga"></div>}
    </div>
    
  );
};

export default BookASlot;