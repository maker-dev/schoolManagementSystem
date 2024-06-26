import React from 'react';
import CountNum from '../ui/CountNum';
export default function CardInfo({ title, number, color, icon }) {
  return (
    <div className="flex items-center bg-white border rounded-lg shadow w-full ">
      <div className={`h-20 w-20 flex rounded-s-lg items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="px-4 text-gray-600 w-3/4">
        <div className="text-sm font-bold">{title}</div>
        <p className="font-semibold text-gray-800 text-xl"><CountNum number={number}/></p>
      </div>
    </div>
  );
}
