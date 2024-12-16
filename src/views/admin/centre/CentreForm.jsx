import React, { useState } from "react";

function CentreForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState(initialData.name || "");
  const [location, setLocation] = useState(initialData.location || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, location });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CentreForm;
