

type FileType = {
    id: string,
    label: string,
    value: File | null,
    onChange: (fieldId: string, value: File | null) => void;
}

function FileUpload({ id, label, value, onChange }: FileType) {


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onChange(id, e.target.files[0]);
        }
    };

    const handleAddFileClick = () => {
        document.getElementById(`fileInput-${id}`)?.click();
    };


    return (
        <div>
            <label className="block mb-2 text-md font-medium text-gray-900">
                {label}
            </label>
            <button
                className="flex items-center gap-3 px-6 py-3 mt-2 bg-blue-600 text-white text-xs font-bold uppercase rounded-md shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 focus:opacity-85 focus:shadow-none active:opacity-85 active:shadow-none transition-all duration-600 ease"
                onClick={handleAddFileClick}
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
                {value ? value.name : 'ADD FILE'}
            </button>
            <input
                id={`fileInput-${id}`}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    )
}

export default FileUpload