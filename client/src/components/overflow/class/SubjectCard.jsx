import React from 'react';

export default function SubjectCard() {
  const data = [
    { id: 1, subject: 'Mathematics', teacher: 'John Doe' },
    { id: 2, subject: 'English Literature', teacher: 'Emily Davis' }
  ];

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-teal-50 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="w-1/3 py-3 px-4 text-left">Subject Name</th>
            <th className="w-1/3 py-3 px-4 text-left">Teacher Assigned</th>
            <th className="w-1/3 py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-teal-100">
              <td className="py-3 px-4 border-b border-teal-200">{item.subject}</td>
              <td className="py-3 px-4 border-b border-teal-200">{item.teacher}</td>
              <td className="py-3 px-4 border-b border-teal-200 flex items-center space-x-4">
                <button className="text-teal-600 hover:text-teal-800 focus:outline-none">
                  ✕
                </button>
                <button className="bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-teal-700 focus:outline-none">
                  Edit
                </button>
                <button className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 focus:outline-none">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
