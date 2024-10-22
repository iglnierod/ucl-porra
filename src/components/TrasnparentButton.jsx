export function TransparentButton({ type = "button", value, onClick }) {
  const className =
    value === "Editar"
      ? "bg-transparent hover:bg-blue-500 text-blue-700 py-1 px-4 border border-blue-500 hover:border-transparent rounded"
      : "bg-transparent hover:bg-green-500 text-green-700 py-1 px-4 border border-green-700 hover:border-transparent rounded";
  return (
    <button className={className} type={type} onClick={onClick}>
      {value}
    </button>
  );
}
