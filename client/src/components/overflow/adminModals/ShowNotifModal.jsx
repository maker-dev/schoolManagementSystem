import React, { useEffect, useState } from 'react';
import api from "../../../api/apiToken";

function ShowNotifModal({ id , notifElem }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        if (id !== "") {
          const response = await api.get(`showNotif/${id}`);
          setNotification(response.data);
        }
      } catch (error) {
        console.error('Error fetching notification data', error);
      }
    };

    fetchNotif();
  }, [id]);

  if (!notification) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Notification Details</h2>
      
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900">Title</h3>
        <p className="text-gray-900 text-sm">{notification.title}</p>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900">Full Name</h3>
        <p className="text-gray-900 text-sm">{`${notification.fname} ${notification.lname}`}</p>
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900">Date</h3>
        <p className="text-gray-900 text-sm">{notification.date}</p>
      </div>
    </div>
  );
}

export default ShowNotifModal;
