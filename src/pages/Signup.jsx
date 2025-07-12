import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // ✅ Import Navbar

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        fullName,
        email,
        password,
      });
      setSuccess(res.data.message);
      setError('');
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setSuccess('');
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Render Navbar */}
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7FF]">
        <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          {error && <p className="text-red-500 mb-2 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 mb-2 text-sm text-center">{success}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded"
            required
          />
          <button type="submit" className="bg-[#6C3BFF] text-white px-4 py-2 w-full rounded hover:bg-opacity-90">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
