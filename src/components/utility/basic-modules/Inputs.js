import { useEffect, useState } from "react"
import { ContainerBig, ContainerMedium, ContainerSmall, ContainerWide, ContainerTall } from "./Containers"

export const StringInput = ({value, func, inputType}) => {
  return (
    <div>
      <input 
        type="text"
        name={value} 
        value={value}
        placeholder={inputType}
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
      <input
        type="checkbox"
        checked={value}
        value={value}
        onChange={handleChange} 
      />
      <label>{legend}</label>
    </div>
  )
}


export const ImageInput = ({functionPassed:functionPassedFromParent, value}) => {


  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpdate = (e) => {
    functionPassedFromParent(file)
  }

  useEffect(() => {
    if (file) {
      console.log("PING");
      handleUpdate(file)
    }
  }, [file])

  return (
    <ContainerBig>
      <ContainerWide>
        <h5>Please select your profile image</h5>
        <input 
          type="file" 
          value={value}
          onChange={handleChange} 
        />
      </ContainerWide>     
    </ContainerBig>
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