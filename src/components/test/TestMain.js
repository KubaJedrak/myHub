import React, { useContext } from "react";
import { FirebaseContext } from "./useTest";

const TestMain = () => {
  const data = useContext(FirebaseContext);

  console.log(data);

  return (
  <div>
    {data && <p>Should work?
       {data[0].title}</p>}
  </div>
  )
};

export default TestMain;