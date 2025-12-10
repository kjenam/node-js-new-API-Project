import { GlobalContext } from "../context/context";
import { useContext } from "react";

export default function ContextWriteUp() {
  // const getThemeFromContext = useContext(GlobalContext)
  // console.log(getThemeFromContext)

  const { theme } = useContext(GlobalContext);

  return (
    <>
      <h1
        style={{
          backgroundColor: theme === "light" ? "#fff" : "#000",
          color: theme === "light" ? "#000" : "#fff",
        }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ipsa
        deleniti, assumenda dignissimos saepe tenetur sunt non, repellat aliquid
        ut dolorum ex quos, facere iste vero veniam libero! Eaque, excepturi.
      </h1>
    </>
  );
}
