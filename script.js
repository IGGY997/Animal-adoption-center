// Select DOM elements
const animalsList = document.getElementById('animals-list');
const searchInput = document.getElementById('search');
const toggleThemeButton = document.getElementById('toggle-theme');

// Fetch animal data from JSON or json-server
fetch('http://localhost:3000/animals')
  .then(response => response.json())
  .then(data => displayAnimals(data))
  .catch(error => console.error('Error fetching data:', error));

// Function to display animals
function displayAnimals(animals) {
  animalsList.innerHTML = '';

  animals.forEach(animal => {
    const animalCard = document.createElement('div');
    animalCard.classList.add('animal-card');
    animalCard.innerHTML = `
      <img src="${animal.image}" alt="${animal.name}">
      <h3>${animal.name}</h3>
      <p>Species: ${animal.species}</p>
      <p>Breed: ${animal.breed}</p>
      <p>Age: ${animal.age} years</p>
      <p>Likes: <span id="likes-${animal.id}">0</span></p>
      <button class="like-btn" onclick="likeAnimal(${animal.id})">Like</button>
      <button class="adopt-btn" onclick="adoptAnimal('${animal.name}')">Adopt</button>
    `;
    animalsList.appendChild(animalCard);
  });
}

// Search functionality: Filter animals by name
searchInput.addEventListener('input', event => {
  const query = event.target.value.toLowerCase();
  fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(data => {
      const filteredAnimals = data.filter(animal =>
        animal.name.toLowerCase().includes(query)
      );
      displayAnimals(filteredAnimals);
    });
});

// Toggle dark mode
toggleThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Like an animal
const likes = {};
function likeAnimal(id) {
  likes[id] = (likes[id] || 0) + 1;
  document.getElementById(`likes-${id}`).textContent = likes[id];
}

// Adopt an animal
function adoptAnimal(name) {
  alert(`Congratulations! You have chosen to adopt ${name}.`);
}
