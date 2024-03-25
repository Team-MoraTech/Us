//App.js

import Calendar from "./Components/Calendar";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import api from "./API/axiosConfig.js";
import { useState,useEffect} from "react";

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEvents = async () => {

    try{
      const response = await api.get("/events");
      console.log(response.data);
      setEvents(response.data);
    }
    catch(error){
      console.log(error);
    }

  };

    getEvents();
  }, []);

  return (
    <div className="App">

      <Header></Header>
      <Calendar events={events} setEvents={setEvents}></Calendar>
      <Footer></Footer>
      
    </div>
  );
}

export default App;