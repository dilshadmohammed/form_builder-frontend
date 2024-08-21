'use client'

import api from "@/app/api/api"
import AddField from "@/app/components/AddField"
import EditField from "@/app/components/EditField"
import FieldSelector from "@/app/components/formfields/FieldSelector"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

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

function FormEditor() {
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative">
      <img src="https://bbdniit.ac.in/wp-content/uploads/2020/09/banner-background-without-image-min.jpg" className="h-52 w-full" alt="" />
      <div className="absolute top-[50%] left-[25%]" >


        <div className=" bg-slate-100 w-[50rem] mx-auto justify-center items-center p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-5 mt-10 text-center">{form?.title}</h1>
          <p className="text-center">{form?.description}</p>
          {(form?.form_fields || []).map((field) => (
            <div key={field.id} className="group mt-10 border-2 border-transparent bg-slate-100 p-4 rounded-lg hover:border-blue-500">
              <EditField/>
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
        </div>
        <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-xl mt-10 mb-20">
        <div className="border-t border-gray-300"></div>
        <button className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 border border-gray-300 rounded-md px-2 py-0.5 text-white">+</button>
    </div>
    <AddField/>
        </div>
      </div>
    </div>
  )
}

export default FormEditor
