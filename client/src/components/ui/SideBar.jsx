import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalendarAlt, faUniversity, faChalkboard, faGraduationCap, faUserGraduate, faUserTie, faBook, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function SideBar() {
  const [role, ] = useState(Cookies.get("userRole"));

  return (
    <ul className='flex flex-col w-full p-2 bg-white'>
      {role === "Student" && (
        <>
          <MenuItem link="/Student/dashboard" icon={<FontAwesomeIcon icon={faTachometerAlt} className="text-xl" />} content="Dashboard" />
          <MenuItem link="/Student/emploieTemps" icon={<FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />} content="Emploie du temps" />
          <MenuItem link="/Student/notes" icon={<FontAwesomeIcon icon={faChartBar} className="text-xl" />} content="Notes" />
          
        </>
      )}
      {role === "Teacher" && (
        <>
          <MenuItem link="/Teacher/dashboard" icon={<FontAwesomeIcon icon={faTachometerAlt} className="text-xl" />} content="Dashboard" />
          <MenuItem link="/Teacher/emploieTemps" icon={<FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />} content="Emploie du temps" />
          <MenuItem link="/Teacher/abscence" icon={<FontAwesomeIcon icon={faUsers} className="text-xl" />} content="Abscence" />
          <MenuItem link="/Teacher/notes" icon={<FontAwesomeIcon icon={faChartBar} className="text-xl" />} content="Notes" />
        </>
      )}
      {role === "Admin" && (
        <>
          <MenuItem link="/Admin/dashboard" icon={<FontAwesomeIcon icon={faTachometerAlt} className="text-xl" />} content="Dashboard" />
          <MenuItem link="/filiere" icon={<FontAwesomeIcon icon={faUniversity} className="text-xl" />} content="Filliere" />
          <MenuItem link="/bac" icon={<FontAwesomeIcon icon={faGraduationCap} className="text-xl" />} content="Bac" />
          <MenuItem link="/subject" icon={<FontAwesomeIcon icon={faBook} className="text-xl" />} content="Module" />
          <MenuItem link="/class" icon={<FontAwesomeIcon icon={faChalkboard} className="text-xl" />} content="Classe" />
          <MenuItem link="/etudiants" icon={<FontAwesomeIcon icon={faUserGraduate} className="text-xl" />} content="Etudiants" />
          <MenuItem link="/professeurs" icon={<FontAwesomeIcon icon={faUserTie} className="text-xl" />} content="Professeures" />
          <MenuItem link="/Admin/emploieTemps" icon={<FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />} content="Emploie du temps" />
          <MenuItem link="/Admin/abscence" icon={<FontAwesomeIcon icon={faUsers} className="text-xl" />} content="Abscence" />
        </>
      )}
    </ul>
  );
}
