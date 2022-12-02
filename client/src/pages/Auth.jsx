import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login, signup } from '../actions/players';

const Auth = () => {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const { type } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSigningUp) {
      await signup(formData);
      navigate('/');
    } else {
      await login(formData);
      navigate('/');
    }
  };

  useEffect(() => {
    if (type === 'register') {
      setIsSigningUp(true);
    } else {
      setIsSigningUp(false);
    }
  }, [type]);
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-full flex items-center justify-center">
          <div className="md:w-[40%] w-8/12 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-center items-center">
              <h1 className="text-3xl font-bold mb-2 text-white">
                {isSigningUp ? 'Register' : 'Login'}
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-3">
                <label htmlFor="username" className="font-semibold text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="p-2 rounded-lg text-black"
                  placeholder="Enter your username"
                  onChange={handleChange}
                />
              </div>
              {isSigningUp && (
                <div className="flex flex-col mb-3">
                  <label htmlFor="email" className="font-semibold text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 rounded-lg text-black"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-2 rounded-lg text-black"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="bg-gray-600 text-white font-bold py-2 px-4 rounded ml-4 hover:bg-gray-700 mt-4"
                >
                  {isSigningUp ? 'Register' : 'Login'}
                </button>
              </div>
              <p
                onClick={() => setIsSigningUp((prev) => !prev)}
                className="text-center cursor-pointer text-white"
              >
                {isSigningUp ? 'Already have an account?' : "Don't have an account?"}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
