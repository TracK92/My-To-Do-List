import Header from "./Header";
import { useState } from 'react';
import FormArea from "./FormArea";
import List from "./List";
import Footer from "./Footer";
import Timer from "./Timer";

function App() {
  let theTime = new Date().toLocaleTimeString();
  let theDate = new Date().toLocaleDateString();

  const [items, setItems] = useState(() => {
    const localData = localStorage.getItem('todolist');
    return localData ? JSON.parse(localData) : [];
  });
  const [date, setDate] = useState(" mm/dd/yyyy")
  const [time, setTime] = useState(" 00 : 00 : 00");
  const [day, setDay] = useState('Today');
  const [item, setItem] = useState({
    activity: '', 
    date: '', 
    time: '',
    

});
  const theDayTimeHandler = () => {
    //date
    theDate = new Date().toLocaleDateString();
    setDate(theDate);              
    //time
    theTime = new Date().toLocaleTimeString();
    setTime(theTime);
    //day
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[new Date().getDay()];
    setDay(day)

}; 

  function addItem(item) {
    (setItems(prevItems => {
      item.id = Math.floor(Math.random() * 10000)
      item.checked = false
      return [...prevItems, item]
    }))
    const listItems = items.concat(item)
    localStorage.setItem('todolist', JSON.stringify(listItems))   
    console.log(JSON.parse(localStorage.getItem('todolist')))   

  }

  const delItem = (id) => {
    const listItems = items.filter((item, index) => id !== index);
    setItems(listItems);
    localStorage.setItem('todolist', JSON.stringify(listItems)) 
    console.log(JSON.parse(localStorage.getItem('todolist')))   
   
  }

  const handleCheck = (id, item) => {
    const listItems = items.map((item, index) => id === index ? {...item, checked: !item.checked } : item)
    setItems(listItems)
    localStorage.setItem('todolist', JSON.stringify(listItems))
    console.log(JSON.parse(localStorage.getItem('todolist')))   

    
  }

  
    return (
    <div className="App">
      <Header />
      <Timer 
        date={date}
        time={time}
        day={day}
        setDay={setDay}
        setDate={setDate}
        setTime={setTime}
        theDayTimeHandler={theDayTimeHandler}
      />
      <FormArea 
        addItem={addItem}
        item={item}
        setItem={setItem}
      />
      {items.length ? (items.map((item, index ) => (
        <List 
          key={item.id}
          id={index}
          delItem={delItem}
          activity={item.activity} 
          date={item.date}
          time={item.time}
          handleCheck={handleCheck}
          checked={item.checked}
          item={item}
          
          
        />
      ))) : (<p className="noActs">Your List is Empty!!!</p>)}
      <Footer />
    </div>
  );
}

export default App;
