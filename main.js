/* const app = (id) => {
  fetch(`http://localhost:1234/movies/${id}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })

    .then((data) => console.log(data));
};

app("17363a73-a85d-11ef-a3af-b42e99cb070c");
 */

console.log(process.env.DATABASE_CONFIG);
