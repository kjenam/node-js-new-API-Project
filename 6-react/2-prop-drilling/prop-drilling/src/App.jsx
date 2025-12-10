/* eslint-disable no-unused-vars */
import { useState } from "react";
import ComponentA from "../components/componentA";

export default function App() {
  const [userName, setUserName] = useState("Abhinav");

  return (
    <div>
      <h1>Prop Drilling Example</h1>
      <ComponentA userName={userName} />
    </div>
  );
}
