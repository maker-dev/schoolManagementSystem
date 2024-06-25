import React from 'react';

export default function CardInfo({ title, number, color, icon }) {
  return (
    <div className="flex items-center bg-white border rounded-lg shadow w-full ">
      <div className={`h-20 w-20 flex rounded-s-lg items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="px-4 text-gray-600 w-3/4">
        <div className="text-sm font-bold">{title}</div>
        <p className="text-xl">{number}</p>
      </div>
    </div>
  );
}
