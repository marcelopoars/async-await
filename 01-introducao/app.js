function p(content) {
  console.log(content);
}

// Async Await
// o Await precisa sempre estar dentro de uma função assincrona
/*
  - Promise não é bloqueante
  - await é bloqueantes
*/


// Usando promise
function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then(console.log)
}
// getPosts()


// Usando async / await
async function getPosts2() {
  // aqui quero esperar o resultado do fetch chegar
  const result = await fetch('https://jsonplaceholder.typicode.com/posts')
  // Aqui o await trava a aplicação ate que a promise seja resolvida
  return result.json()
}

(async function() {
  const posts = await getPosts2()
  // p(posts)
}())

// ou
// getPosts2().then(console.log)



//************************************
// Exemplo 2
async function getNumbers() {
  return await 10
}

getPosts2().then(console.log)
getNumbers().then(console.log)
