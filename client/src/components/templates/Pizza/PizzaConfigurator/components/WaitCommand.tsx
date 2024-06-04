import React from 'react';
import useStorePizza from "./../../Store/pizza.zustand";

function WaitCommand() {
const storePizza = useStorePizza();

  return (
    <div>WaitCommand</div>
  )
}

export default WaitCommand