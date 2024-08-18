'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'

type UpiType = {
  id: string,
  label: string,
  upi_id: string,
  amount: string,
  qr_code: string,
  value: File | null,
  onChange: (fieldId: string, value: any) => void;
}

function UpiPay({ id, label, upi_id, amount, qr_code, value, onChange }: UpiType) {

  const [showQr, setShowQr] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(id, e.target.files[0]);
    }
  };

  const handleAddFileClick = () => {
    document.getElementById(`fileInput-${id}`)?.click();
  };

  return (
    <>
      <label className="block mb-2 text-md font-medium text-gray-900">
        {label}
      </label>
      {isMobile ? (
        <>
          <div className='grid grid-cols-2 gap-2 mb-2'>
            <button
              className="flex items-center gap-3 px-6 py-3 mt-2 bg-blue-600 text-white text-xs font-bold rounded-md shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none transition-all duration-600 ease"
              onClick={handleAddFileClick}
              type='button'
            >
              <svg
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  strokeWidth="2"
                  stroke="#ffffff"
                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="#ffffff"
                  d="M17 15V18M17 21V18M17 18H14M17 18H20"
                ></path>
              </svg>
              {value ? value.name : 'ADD SCREENSHOT'}
            </button>
            <input
              id={`fileInput-${id}`}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              className="flex items-center gap-3 px-6 py-3 mt-2 bg-green-600 text-white text-xs font-bold rounded-md shadow-md shadow-green-600/20 hover:shadow-lg hover:shadow-green-600/30 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none transition-all duration-600 ease"
              onClick={() => setShowQr(!showQr)}
              type='button'
            >
              SHOW QR
            </button>
          </div>
          {showQr ? <img src={`http://localhost:8000${qr_code}`} alt="QR Code" className="mt-4 mx-auto h-[30rem]" /> : (
            <Link href={`upi://pay?pa=${upi_id}&tn=Registerationfee&am=${amount}&cu=INR`}>
              <div className='flex justify-center w-fit px-4 items-center gap-4 bg-slate-200 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" fillRule="evenodd"><path d="M95.678 42.9L110 29.835l-6.784-13.516z" fill="#097939" /><path d="M90.854 42.9l14.322-13.065-6.784-13.516z" fill="#ed752e" /><path d="M22.41 16.47l-6.03 21.475 21.407.15 5.88-21.625h5.427l-7.05 25.14c-.27.96-1.298 1.74-2.295 1.74H12.31c-1.664 0-2.65-1.3-2.2-2.9l6.724-23.98zm66.182-.15h5.427l-7.538 27.03h-5.58zM49.698 27.582l27.136-.15 1.81-5.707H51.054l1.658-5.256 29.4-.27c1.83-.017 2.92 1.4 2.438 3.167L81.78 29.49c-.483 1.766-2.36 3.197-4.19 3.197H53.316L50.454 43.8h-5.28z" fill="#747474" /></svg>
                <span className='italic'>{upi_id}</span>
                <span className='font-semibold'>₹{amount}</span>
              </div>
            </Link>
          )}
        </>
      ) : (
        <>
          

          <button
            className="flex items-center gap-3 px-6 py-3 mt-2 bg-blue-600 text-white text-xs font-bold uppercase rounded-md shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none transition-all duration-600 ease"
            onClick={handleAddFileClick}
            type='button'
          >{!value && (
            <svg
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <path
                strokeWidth="2"
                stroke="#ffffff"
                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="#ffffff"
                d="M17 15V18M17 21V18M17 18H14M17 18H20"
              ></path>
            </svg>)}
            {value ? value.name : 'ADD SCREENSHOT'}
          </button>
          <input
            id={`fileInput-${id}`}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
            <img src={`http://localhost:8000${qr_code}`} alt="QR Code" className="mt-4 mx-auto h-[30rem]"  />
        </>
      )}
    </>
  );
}

export default UpiPay;
