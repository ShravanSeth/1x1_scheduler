import { useEffect, useState } from "react";
import "../style.css";
import Select from "react-select";
import Service from "../../services/httpService";
import Modal from 'react-modal';

const Slots = () => {

  //LOADER
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        setLoading(true);
    }, 5000)
}, []);

  //VARIABLES
  const services = new Service();
  const [values, setValues] = useState({
    username: "",
    age: "",
    feesOfMonth: new Date(),
    criteria: "",
  });
  




  return (
    <div className="app">
      {loading?
      <form >
        <h1>Your Slots</h1>
        <h3>For {new Date().toDateString()}</h3>
        
        
        <div> 
        </div>
      </form>:
    <div className="scheduler"></div>}
    </div>
    
  );
};

export default Slots;