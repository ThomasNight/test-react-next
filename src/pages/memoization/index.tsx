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

const MemoChild = memo(Child);

// Library containing thousands of books
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
  // ...
];

const MemoizationPage = () => {
  const [title, setTitle] = useState("");
  const [clock, setClock] = useState(0);

  // Thousands of books -> expensive calculations -> need useMemo
  const selectedBooks = useMemo(() => {
    return library.filter((book) => book.title.startsWith(title));
  }, [title]);

  // Here we can just pass the setTitle to the child, but if we realy need to create an handleTitleChange function with more complex logic,
  // you should wrap it with useCallback to avoid re-rendering the child component
  const handleTitleChange = useCallback(
    (value: string) => {
      setTitle(value);
    },
    [setTitle]
  );

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

      <h3>Title: {title}</h3>

      <h3>Selected books</h3>
      <ul>
        {selectedBooks.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>

      <MemoChild title={title} onTitleChange={handleTitleChange} />
    </div>
  );
};

export default MemoizationPage;
