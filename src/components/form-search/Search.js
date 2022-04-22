import React from 'react';

export default function Search({ onChange, onSubmit, value }) {
  return (
    <form
      data-testid="input-submit"
      className="form-search"
      onSubmit={onSubmit}
    >
      <input
        data-testid="input-search"
        onChange={onChange}
        type="text"
        name="search"
        placeholder="Search for a song"
        value={value}
        className="form-input"
      />
      <input type="submit" value="Search" className="form-submit text-white" />
    </form>
  );
}
