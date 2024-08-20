'use client'

import api from "@/app/api/api"
import Button from "@/app/components/Button"
import FieldSelector from "@/app/components/formfields/FieldSelector"
import { useParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

type choiceType = {
  id: string,
  text: string
}

type formFieldType = {
  id: string,
  is_required: boolean,
  type: string,
  label: string,
  choices: choiceType[],
  upi_id: string,
  amount: string,
  qr_code: string
}

type formType = {
  id: string,
  form_fields: formFieldType[],
  title: string,
  description: string
}

type FormData = Record<string, any>;

function Form() {
  const { id } = useParams()
  const [form, setForm] = useState<formType | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/forms/${id}`);
        setForm(response.data.response);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch form data");
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('form', id);

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value instanceof FileList) {
        // If it's a file input (multiple files), append each file
        Array.from(value).forEach((file, index) => {
          data.append(`form_fields[${key}]`, file);
        });
      } else {
        // For normal inputs, append the value
        data.append(`form_fields[${key}]`, value);
      }
    });

    try {
      const response = await api.post(`/forms/view/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle the successful response
      console.log(response.data); // Log the response data if needed
    } catch (error) {
      // Handle errors
      console.error('Error occurred while posting data:', error);
      // Optionally, display an error message to the user
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>

      <img src="https://bbdniit.ac.in/wp-content/uploads/2020/09/banner-background-without-image-min.jpg" className="h-52 w-full" alt="" />
      <form onSubmit={handleSubmit}
        className="absolute z-10 bg-slate-100 w-[50rem] mx-auto justify-center items-center p-6 rounded-lg shadow-lg"
        style={{
          top: '50%',
          left: '25%',
        }}
      >
        <h1 className="text-3xl mb-5 mt-10 text-center">{form?.title}</h1>
        <p className="text-center">{form?.description}</p>
        {(form?.form_fields || []).map((field) => (
          <div key={field.id} className="mt-10 border-slate-700 bg-slate-100 p-4 rounded-lg">
            <FieldSelector
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              choices={field.choices}
              is_required={field.is_required}
              upi_id={field.upi_id}
              amount={field.amount}
              qr_code={field.qr_code}
              value={formData[field.id] || ''}
              onChange={handleFieldChange}
            />
          </div>
        ))}
        <div className="float-end my-10">
          <Button text="Submit" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Form
