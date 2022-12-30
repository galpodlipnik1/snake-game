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
export const updatePlayerStats = (id, updatedStats, type, playerNumber) =>
  API.patch(`/players/updateplayer/${id}/${type}`, { updatedStats, playerNumber });
export const changeUsername = (id, username) =>
  API.patch(`/players/changeusername/${id}`, { username });
export const changePassword = (id, password) =>
  API.patch(`/players/changepassword/${id}`, { password });
export const changeEmail = (id, email) => API.patch(`/players/changeemail/${id}`, { email });
