"use client";

import { useEffect, useState } from "react";

export default function CSRPage() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const body = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    const newData = await body.json();
    setData(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{data?.title}</h1>
    </div>
  );
}
