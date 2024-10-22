export function TransparentButton({ type = "button", value, onClick }) {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
      type={type}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
