import dashboardIC from '../../assets/icons/dashboard.svg';
import callendarIC from '../../assets/icons/callendar.svg';
import filliereIC from '../../assets/icons/filliere.svg';
import classeIC from '../../assets/icons/class.svg';
import gradesIC from '../../assets/icons/grades.svg';
import studentPresenceIC from '../../assets/icons/student_presence.svg';
import studentIC from '../../assets/icons/student.svg';
import teacherIC from '../../assets/icons/teacher.svg';
import BacIc from '../../assets/icons/bac.svg';
import MenuItem from './MenuItem';
import subjectIC from "../../assets/icons/subject.svg"
import Cookies from 'js-cookie';
import { useState } from 'react';


export default function SideBar(){

    const [role,] = useState(Cookies.get("userRole"));

    return(
        
            <ul className='flex flex-col w-full p-2 bg-white'>
                {role === "Student" &&
                    <>
                    <MenuItem link="/Student/dashboard" icon={dashboardIC} content="Dashboard"/>
                    <MenuItem link="/Student/emploieTemps" icon={callendarIC} content="Emploie du temps"/>
                    </>
                }
                {role === "Teacher" &&
                    <>
                    <MenuItem link="/Teacher/dashboard" icon={dashboardIC} content="Dashboard"/>
                    <MenuItem link="/Teacher/emploieTemps" icon={callendarIC} content="Emploie du temps"/>
                    </>
                }
                {role === "Admin" && 
                    <>
                        <MenuItem link="/Admin/dashboard" icon={dashboardIC} content="Dashboard"/>
                        <MenuItem link="/filiere" icon={filliereIC} content="Filliere"/>
                        <MenuItem link="/bac" icon={BacIc} content="Bac"/>
                        <MenuItem link="/subject" icon={subjectIC} content="Module"/>
                        <MenuItem link="/class" icon={classeIC} content="Classe"/>
                        <MenuItem link="/etudiants" icon={studentIC} content="Etudiants"/>
                        <MenuItem link="/professeurs" icon={teacherIC} content="Professeures"/>
                        <MenuItem link="/Admin/emploieTemps" icon={callendarIC} content="Emploie du temps"/>
                        <MenuItem link="/notes" icon={gradesIC} content="Notes"/>
                        <MenuItem link="/abscence" icon={studentPresenceIC} content="Abscence"/>
                        <MenuItem link="/profile" icon={studentPresenceIC} content="Profile"/>
                    </>
                }
            </ul>
        
    )
}