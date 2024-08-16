'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import useAuth from './hooks/useAuth';
import api from './api/api';
import FormCard from './components/formcard/FormCard';
import './home.css'

type formType = {
  id:string,
  title:string,
  description:string
}

export default function Home() {
  const { isLoggedIn,loading } = useAuth();
  const [forms, setForms] = useState<formType[] | null>(null);
  const router = useRouter(); 
  useEffect(() => {

    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
    else if(isLoggedIn){
      api.get('/forms/')
  .then((response) => {
    setForms(response.data.response)
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
    }
  }, [isLoggedIn, loading, router]);

  return (
    <main>
      {isLoggedIn ? (
        <div className='card-container mx-auto'>
          {forms && forms.map((form:formType)=>(
            <FormCard key={form.id} {...form} />
          ))}
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </main>
  );
}
