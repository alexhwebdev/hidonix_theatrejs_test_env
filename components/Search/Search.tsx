'use client'; 
import { useState } from 'react';
import "./search.scss";


interface ISearchProps {
  onSearch: (query: string) => void;
}

const Search = (
  { onSearch }: ISearchProps
) => {
  const [query, setQuery] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <Image 
        src={MagGlass} 
        alt="Magnifying glass" 
        width={20}
        height={20}
      /> */}
      <div className={`img`}></div>
      <input 
        type="text" 
        value={query} 
        onChange={handleChange} 
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;