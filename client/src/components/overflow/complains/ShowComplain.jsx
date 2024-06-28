import React from "react";

export default function ShowComplain({ complain }) {
  const { subject, details, createdAt, complainant } = complain;
  const complainantRole = complainant.model === "Teacher" ? "Professeur" : "Étudiant"; // Convert model names

  return (
    <div className="bg-white">
      <div className="space-y-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Nom d'Utilisateur :
          </label>
          <div className="bg-gray-100 p-2 rounded-lg">{complainant.name}</div>
        </div>
        <div>
          <label htmlFor="complainantRole" className="block text-sm font-medium text-gray-700">
            Rôle d'Utilisateur :
          </label>
          <div className="bg-gray-100 p-2 rounded-lg">{complainantRole}</div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Sujet :
          </label>
          <div className="bg-gray-100 p-2 rounded-lg">{subject}</div>
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Détails :
          </label>
          <div className="bg-gray-100 p-2 rounded-lg">{details}</div>
        </div>
        <div>
          <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
            Date de création :
          </label>
          <div className="bg-gray-100 p-2 rounded-lg">{new Date(createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
