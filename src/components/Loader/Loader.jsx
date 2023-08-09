
import { useState, useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


const override ={
  position: "relative",
  margin: 'auto',
  borderColor: "red",
};


function Loader() {
  let [color, setColor] = useState(`rgb(203,23,23)`);

  useEffect(() => {
    const generate =()=>{
      const red = Math.floor(Math.random()* 255)
      const green = Math.floor(Math.random()* 255)
      const blue = Math.floor(Math.random()* 255)
      setColor(`rgb(${red},${green},${blue})`);
    }

    generate();
    const interval = setInterval(generate, 625);
    return () => clearInterval(interval)

  }, []);

  return (
      <ClimbingBoxLoader
        color={color}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  );
}

export default Loader;