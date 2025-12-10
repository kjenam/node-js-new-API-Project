import ComponentB from "./ComponentB";

export default function ComponentA({ userName }) {
  return (
    <div>
      <h2>Component A</h2>
      <ComponentB userName={userName} />
    </div>
  );
}
