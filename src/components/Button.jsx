export function Button({ type, value, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" border-none px-3 py-1 border rounded-lg bg-cyan-700 hover:bg-cyan-900"
    >
      {value}
    </button>
  );
}
