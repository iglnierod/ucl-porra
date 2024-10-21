import React from "react";

export function MenuItem({ value }) {
  return (
    <span className="text-lg cursor-pointer p-2 rounded-md hover:bg-slate-700">
      {value}
    </span>
  );
}
