import { useState } from "react";

export function CounterComponent({
  initialCounter,
}: {
  initialCounter: number;
}): JSX.Element {
  const [counter, setCounter] = useState(initialCounter);
  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Counter plus</button>
      <button onClick={() => setCounter(counter - 1)}>Counter minus</button>
      <br />
      <div>{counter}</div>
    </div>
  );
}
