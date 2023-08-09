import { memo, useCallback, useEffect, useMemo, useState } from "react";

const Child = ({
  title,
  onTitleChange,
}: {
  title: string;
  onTitleChange: (value: string) => void;
}) => {
  console.log(`rerendering...`);

  return (
    <>
      <label>Title</label>
      <input
        name="title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
    </>
  );
};

// Library containing only 3 books
const library = [
  {
    id: 1,
    title: `Livre de Thomas`,
    author: `Thomas Michel`,
  },
  {
    id: 2,
    title: `Livre de Maxime`,
    author: `Maxime Denuit`,
  },
  {
    id: 3,
    title: `Un autre livre`,
    author: `Anonyme`,
  },
];

const BadMemoizationPage = () => {
  const [title, setTitle] = useState("");
  const [clock, setClock] = useState(0);
  const [formattedTitle, setFormattedTitle] = useState("");

  // 3 books -> calculation can be done for every render -> Should not use useMemo here
  const selectedBooks = useMemo(() => {
    return library.filter((book) => book.title.startsWith(title));
  }, [title]);

  // Child component is not memoized -> useCallback not needed here since the child re-render anyway
  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
    },
    [setTitle]
  );

  // UseEffect not needed here, can be done on action -> in the handleTitleChange function
  useEffect(() => {
    setFormattedTitle(title.toUpperCase());
  }, [title]);

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

      <h3>Title: {formattedTitle}</h3>

      <h3>Selected books</h3>
      <ul>
        {selectedBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>

      <Child title={title} onTitleChange={handleTitleChange} />
    </div>
  );
};

export default BadMemoizationPage;
