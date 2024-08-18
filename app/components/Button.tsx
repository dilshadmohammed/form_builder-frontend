type buttonType = {
    text:string,
    type: "button" | "reset" | "submit" | undefined
}
const Button = ({text,type}:buttonType) => {
    return (
      <button type={type} className="relative flex justify-center items-center rounded-md bg-[#183153] shadow-lg overflow-hidden cursor-pointer border-none hover:bg-[#ffd401] group">
        <span className="relative z-20 text-white text-lg font-bold tracking-wider px-4 py-2 group-hover:text-[#183153] transition-colors duration-300 ease-in-out">
          {text}
        </span>
        <div className="absolute inset-0 bg-[#ffd401] w-0 group-hover:w-full transition-all duration-400 ease-in-out"></div>
      </button>
    );
  };
  
  export default Button;
  