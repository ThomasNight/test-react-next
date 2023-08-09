import { memo, useEffect, useState } from "react";

const Child = ({ title }: { title: string }) => {
  console.log(`rerendering...`);

  return <span>{title}</span>;
};

const MemoChild = memo(Child);

const RerenderingPage = () => {
  const [title, setTitle] = useState("");
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setClock((prevClock) => prevClock + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1>Clock: {clock}</h1>
      <label>Title</label>
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <MemoChild title={title} />
    </div>
  );
};

export default RerenderingPage;
