import React from 'react';

export default function CardInfo({ title, number, color, icon }) {
  return (
    <div className="flex items-center bg-white border rounded-sm shadow w-full">
      <div className={`h-20 w-20 flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="px-4 text-gray-700 w-3/4">
        <h3 className="text-sm">{title}</h3>
        <p className="text-2xl">{number}</p>
      </div>
    </div>
  );
}
