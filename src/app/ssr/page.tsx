export default async function SSRPage() {
  const body = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  const data = await body.json();

  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
