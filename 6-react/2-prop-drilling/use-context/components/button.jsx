import { useContext } from "react"
import { GlobalContext } from "../context/context"

export default function ContextButton() {
  const { theme, setTheme } = useContext(GlobalContext);

  function toggleTheme() {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }

  return (
    <>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark" : "Switch to Light"}
      </button>
    </>
  );
}
