'use client'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import './login.css'
import Link from 'next/link';
import api from '../api/api';
import useAuth from '../hooks/useAuth';

function Login() {
    const router = useRouter();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const {login} = useAuth(); 


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        };

        api.post('/user/auth/', data)
            .then(response => {
                setSuccess('Registration successful!');
                login(response.data.response.accessToken,response.data.response.refreshToken)
                setError(null);
                console.log('Login successful:', response.data);
                router.push('/')
                // handle successful registration (e.g., show a success message, redirect, etc.)
            })
            .catch(error => {
                setError('Error during login. Please try again.');
                setSuccess(null); // Clear any previous successes
                console.error('Error during login:', error);
                // handle registration error (e.g., show an error message)
            });
    };

    return (
        <div className='form-container'>

        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-column">
            <label>Username</label>
          </div>
          <div className="inputForm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

            <input placeholder="Enter your username" className="input" type="text" onChange={(e)=>setUsername(e.target.value)} value={username} />
          </div>
    
          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
            </svg>
            <input placeholder="Enter your Password" className="input" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
          </div>
    
          <div className="flex-row">
            <span className="span">Forgot password?</span>
          </div>
          <button className="button-submit" type='submit'>Sign In</button>
          <p className="p">
            Don't have an account? <Link className="span" href={'/register'}>Sign Up</Link>
          </p>
          <p className="p line">Or With</p>
    
          <div className="flex-row">
            <button className="btn google">
              <svg xmlSpace="preserve" viewBox="0 0 512 512" y="0px" x="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="20" version="1.1">
                <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z" style={{ fill: '#FBBB00' }}></path>
                <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535 c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{ fill: '#518EF8' }}></path>
                <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{ fill: '#28B446' }}></path>
                <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0 C318.115,0,375.068,22.126,419.404,58.936z" style={{ fill: '#F14336' }}></path>
              </svg>
              Google
            </button>
          </div>
        </form>
        </div>
      );
}

export default Login
