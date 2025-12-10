import ComponentD from "./ComponentD";

export default function ComponentC({ userName }) {
  return (
    <div>
      <h4>Component C</h4>
      <ComponentD userName={userName} />
    </div>
  );
}
