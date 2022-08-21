import React, { useState } from 'react';
import './SearchTask.scss';

function SearchTask({ setFilterName }) {
  const [taskNameInput, setTaskNameInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterName(taskNameInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && taskNameInput) {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo__search search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        value={taskNameInput}
        onChange={(e) => setTaskNameInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search task..."
      />
      <button type="submit" className="search__button">
        Search
      </button>
    </form>
  );
}

export default SearchTask;
