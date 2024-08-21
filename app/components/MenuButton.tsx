type menuButtonType = {
    onClick: () => void
}
function MenuButton ({onClick}:menuButtonType) {
  return (
    <button onClick={onClick} type="button" className="group hidden -m-2 group-hover:flex rounded-md border float-end bg-blue-500 backdrop-blur-lg w-6 h-3 justify-center items-center">
      <div className="w-3 flex justify-between items-end transition-transform duration-400 group-hover:scale-105">
        <span className="w-[3px] h-[3px] rounded-sm bg-white"></span>
        <span className="w-[3px] h-[3px] rounded-sm bg-white"></span>
        <span className="w-[3px] h-[3px] rounded-sm bg-white"></span>
      </div>
    </button>
  );
};

export default MenuButton;
