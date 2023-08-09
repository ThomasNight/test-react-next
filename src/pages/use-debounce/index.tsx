import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export const UseDebouncePage = () => {
  const [search, setSearch] = useState("");
  const [catFacts, setCatFacts] = useState<any>([]);

  const debounceSearch = useDebounce(search, 300);

  function handleSearchChange(value: string) {
    setSearch(value);
  }

  async function fetchCatFacts(search?: string) {
    try {
      if (search) {
        const response = await axios.get(
          `https://cat-fact.herokuapp.com/facts/${search}`
        );
        setCatFacts(
          response?.data
            ? [{ id: response.data._id, text: response.data.text }]
            : []
        );
        return;
      }

      const response = await axios.get(`https://cat-fact.herokuapp.com/facts`);
      setCatFacts(
        response?.data?.map((fact: any) => ({
          id: fact._id,
          text: fact.text,
        })) ?? []
      );
    } catch (err) {
      // Don't care
    }
  }

  useEffect(() => {
    fetchCatFacts(debounceSearch);
  }, [debounceSearch]);

  return (
    <div>
      <h2>Search with fact id</h2>
      <input
        name="search"
        value={search}
        onChange={(e) => handleSearchChange(e.currentTarget.value)}
      />

      <div style={{ marginTop: `20px` }}>
        {catFacts.map((fact: any) => (
          <ul
            key={fact.id}
            style={{
              marginBottom: `10px`,
            }}
          >
            <li>ID: {fact.id}</li>
            <li>TEXT: {fact.text}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default UseDebouncePage;
