Second = () => {
    const date = new Date();
    const second = String(date.getSeconds()).padStart(2, '0');
    document.getElementById('Second').innerHTML = second;
  }
  Minute = () =>{
    const date = new Date();
    const minute = String(date.getMinutes()).padStart(2, '0');
     document.getElementById('Minute').innerHTML = minute;
  }
  Hour = () =>{
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, '0');
    document.getElementById('Hour').innerHTML = hour > 12 ? String(hour - 12).padStart(2, '0') : hour;
  }
  Set =() =>{
    setInterval(Second, 1000);
    setInterval(Minute, 1000);
    setInterval(Hour, 1000);
  }
  call = () =>{
    Second();
    Minute();
    Hour();
  }
  Set();
  call();
         // Initial call to run function immiediately
