import * as api from '../api';

export const login = async (formData) => {
  try {
    const { data } = await api.login(formData);
    localStorage.setItem('profile', JSON.stringify({ ...data }));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData) => {
  try {
    const { data } = await api.signup(formData);
    localStorage.setItem('profile', JSON.stringify({ ...data }));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayerStatsSingle = async (stats, playerNumber) => {
  try {
    const id = JSON.parse(localStorage.getItem('profile')).result._id;

    const { data } = await api.updatePlayerStats(id, stats, 'singleplayer', playerNumber);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePlayerStats = async (stats, playerNumber) => {
  try {
    const id = JSON.parse(localStorage.getItem('profile')).result._id;

    const { data } = await api.updatePlayerStats(id, stats, 'multiplayer', playerNumber);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlayers = async () => {
  try {
    const { data } = await api.getPlayers();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changeEmail = async (email) => {
  try {
    const id = JSON.parse(localStorage.getItem('profile')).result._id;

    const { data } = await api.changeEmail(id, email);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changeUsername = async (username) => {
  try {
    const id = JSON.parse(localStorage.getItem('profile')).result._id;

    const { data } = await api.changeUsername(id, username);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (password) => {
  try {
    const id = JSON.parse(localStorage.getItem('profile')).result._id;

    const { data } = await api.changePassword(id, password);
    return data;
  } catch (error) {
    console.log(error);
  }
};
