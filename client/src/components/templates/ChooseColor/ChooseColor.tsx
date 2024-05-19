import React from 'react'
import useCubeStore from '../../../store/cube.zustand'

function ChooseColor() {
    const storeCube = useCubeStore();
    
 
    return (
    <div>
        <div style={{
            display : "flex",
            gap : "2px",
            justifyContent : "center"
        }}>
            <button onClick={() => storeCube.setColor("yellow")}>yellow</button>
            <button onClick={() => storeCube.setColor("green")}>green</button>
            <button onClick={() => storeCube.setColor("red")}>red</button>
        </div>
    </div>
  )
}

export default ChooseColor