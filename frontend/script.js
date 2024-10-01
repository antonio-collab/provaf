const apiBaseUrl = 'http://localhost:3333';

// Função para carregar filmes da API
const loadMovies = async () => {
  const movieList = document.getElementById('movieList');
  const movieIdSelect = document.getElementById('movieId');
  
  try {
    const res = await fetch(`${apiBaseUrl}/movies/release`);
    const movies = await res.json();
    
    movieList.innerHTML = '';
    movieIdSelect.innerHTML = '';
    
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = `${movie.title} - ${movie.duration} min - ${new Date(movie.release_date).toLocaleDateString()}`;
      movieList.appendChild(li);
      
      // Adiciona opções ao select de filmes para locação
      const option = document.createElement('option');
      option.value = movie.id;
      option.textContent = movie.title;
      movieIdSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Erro ao carregar filmes:', err);
  }
};

// Função para carregar usuários da API
const loadUsers = async () => {
  const userList = document.getElementById('userList');
  const userIdSelect = document.getElementById('userId');
  
  try {
    const res = await fetch(`${apiBaseUrl}/users`);
    const users = await res.json();
    
    userList.innerHTML = '';
    userIdSelect.innerHTML = '';
    
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
      
      // Adiciona opções ao select de usuários para locação
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      userIdSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Erro ao carregar usuários:', err);
  }
};

// Função para adicionar novo filme
const movieForm = document.getElementById('movieForm');
movieForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('movieTitle').value;
  const duration = document.getElementById('movieDuration').value;
  const releaseDate = document.getElementById('releaseDate').value;
  
  try {
    const res = await fetch(`${apiBaseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, duration, release_date: releaseDate })
    });
    
    if (res.ok) {
      movieForm.reset();
      loadMovies();
    } else {
      console.error('Erro ao adicionar filme');
    }
  } catch (err) {
    console.error('Erro:', err);
  }
});

// Função para registrar locação de filme
const movieRentForm = document.getElementById('movieRentForm');
movieRentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const userId = document.getElementById('userId').value;
  const movieId = document.getElementById('movieId').value;
  
  try {
    const res = await fetch(`${apiBaseUrl}/movies/rent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, movieId })
    });
    
    if (res.ok) {
      alert('Locação registrada com sucesso!');
    } else {
      console.error('Erro ao registrar locação');
    }
  } catch (err) {
    console.error('Erro:', err);
  }
});

// Carregar filmes e usuários ao iniciar a página
loadMovies();
loadUsers();
