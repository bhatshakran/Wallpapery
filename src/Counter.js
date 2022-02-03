import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./redux/features/counter/main";

export const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>Count: {count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};
