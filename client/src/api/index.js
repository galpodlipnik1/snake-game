import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const login = (formData) => API.post('/players/addplayer', formData);
export const signup = (formData) => API.post('/players/loginplayer', formData);
export const getPlayer = (id) => API.get(`/players/getplayer/${id}`);
export const getPlayers = () => API.get('/players/getplayers');
export const updatePlayer = (id, updatedPlayer) =>
  API.patch(`/players/updateplayer/${id}`, updatedPlayer);
export const deletePlayer = (id) => API.delete(`/players/deleteplayer/${id}`);
