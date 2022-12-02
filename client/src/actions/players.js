import * as api from '../api';

export const login = async (formData) => {
  try {
    const { data } = await api.login(formData);
    localStorage.setItem('profile', JSON.stringify({ ...data }));
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData) => {
  try {
    const { data } = await api.signup(formData);
    localStorage.setItem('profile', JSON.stringify({ ...data }));
  } catch (error) {
    console.log(error);
  }
};
