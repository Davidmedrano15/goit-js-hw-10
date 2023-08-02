import axios from 'axios';

// Configura la clave de acceso para todas las solicitudes
axios.defaults.headers.common['x-api-key'] =
  'live_CvtsRJbfzHxRfBa9SYKne5hRg1q5e0uNH5sOYHlhQZDVlEBNCehxzNBu24Jn5CHp';

// Función para hacer una petición HTTP a la colección de razas
export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return axios.get(url).then(response => response.data);
}

// Función para hacer una petición HTTP y obtener información sobre un gato por ID de raza
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url).then(response => response.data);
}
