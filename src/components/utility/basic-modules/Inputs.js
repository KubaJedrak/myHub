import { useState } from "react"

export const StringInput = ({value, func}) => {
  return (
    <div>
      <input 
        type="text"
        name={value} 
        value={value}
        onChange={func} 
        required 
      />
    </div>
  )
}

export const CheckboxInputSingle = ({legend, value, functionPassed:functionPassedFromParent}) => {
  
  const handleChange = () => {
    functionPassedFromParent()
  }
  
  return (
    <div>
      <div> 
        <input
          type="checkbox"
          checked={value}
          value={value}
          onChange={handleChange} 
        />
        <label>{legend}</label>
      </div>
    </div>
  )
}




// WIPS!

export const CheckboxInputMultiple = ({legend, options}) => {
  // DOESNT WORK YET
  
  const [checkedState, setCheckedState] = useState(
    new Array(options.length).fill(false)
  )

  const handleOnChange = (position) => {
    console.log(position);
    const updatedCheckedState = checkedState.map((value, index) => {
      if (index === position) {
        console.log("PING");
        value = true
      } 
      
      else value = false
    })
    console.log(updatedCheckedState);

    setCheckedState(updatedCheckedState)
  }

  
  // NEEDS SEPARATE CHECKBOX ELEMENTS WITH SEPARATE LOGIC?

  return (
    <fieldset>
      <legend>{legend}</legend>
      {options.map((value, index) => {
        return(
          <div key={index}> 
            <input 
              type="checkbox" 
              name={value} 
              value={value}
              id={index} 
              checked={checkedState[index]}
              onChange={handleOnChange} 
            />
            <label for={value}>{value}</label>
          </div>
        )
      })}
    </fieldset>
  )
}