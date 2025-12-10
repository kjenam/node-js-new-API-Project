import ComponentC from "./ComponentC";

export default function ComponentB({ userName }) {
  return (
    <div>
      <h3>Component B</h3>
      <ComponentC userName={userName} />
    </div>
  );
}
