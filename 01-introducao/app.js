function p(content) {
  console.log(content);
}

// Async Await
// o Await precisa sempre estar dentro de uma função assincrona
/*
  - Promise não é bloqueante
  - await é bloqueantes
*/

// Exemplo 01 - Usando promise
function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts") // retorna um readable string
    .then((response) => response.json()) // converte para json / outra promise
    .then((data) => console.log(data));
}
// getPosts()

// Exemplo 02 - Usando async / await
async function getPosts2() {
  // aqui quero esperar o resultado do fetch chegar
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  // Aqui o await trava a aplicação ate que a promise seja resolvida
  return result.json(); // retorna uma promise
}

// Usando uma função auto-invocável
(async function () {
  const posts = await getPosts2();
  // p(posts)
})();

// Exemplo 03 - Gerenciando vários requests
// Vamos buscar todos usuário e seus posts
async function getUsers() {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  return result.json();
}

// 01 - Obtendo dados dos usuários - Usando 'then()'
// getUsers().then(console.table)

async function getUserPosts(userId) {
  const posts = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );
  return posts.json(); // Retorna uma promise
}

// 02 - Obtendo dados dos usuários - Usando uma função auto-invocável
(async function () {
  const users = await getUsers();
  const posts = [];

  for (let i = 0; i < users.length; i++) {
    posts.push(getUserPosts(users[i].id));
  }

  const allPosts = await Promise.all(posts)
  console.log(allPosts);
})();

// 03 - Obtendo dados dos usuários - Iterando com map()
(async function () {
  const users = await getUsers();
  const result = await Promise.all(users.map(user => getUserPosts(user.id)))
  console.log(result);
})();

