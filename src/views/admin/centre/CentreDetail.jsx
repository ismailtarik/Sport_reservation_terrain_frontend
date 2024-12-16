import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CentreDetail() {
  const { id } = useParams();
  const [centre, setCentre] = useState(null);

  useEffect(() => {
    fetch(`/api/centres/${id}`)
      .then((response) => response.json())
      .then((data) => setCentre(data));
  }, [id]);
  
  if (!centre) return <p>Loading...</p>;

  return (
    <div>
      <h2>Centre Details</h2>
      <p>ID: {centre.id}</p>
      <p>Name: {centre.name}</p>
      <p>Location: {centre.location}</p>
    </div>
  );
}

export default CentreDetail;
