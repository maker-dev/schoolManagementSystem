import dashboardIC from '../../assets/icons/dashboard.svg';
import callendarIC from '../../assets/icons/callendar.svg';
import filliereIC from '../../assets/icons/filliere.svg';
import classeIC from '../../assets/icons/class.svg';
import gradesIC from '../../assets/icons/grades.svg';
import studentPresenceIC from '../../assets/icons/student_presence.svg';
import studentIC from '../../assets/icons/student.svg';
import teacherIC from '../../assets/icons/teacher.svg';
import MenuItem from './MenuItem';


export default function SideBar(){

    return(
        
            <ul className='flex flex-col w-full p-2 bg-white'>
                <MenuItem link="/dashboard" icon={dashboardIC} content="Dashboard"/>
                <MenuItem link="/emploieTemps" icon={callendarIC} content="Emploie du temps"/>
                <MenuItem link="/fulliere" icon={filliereIC} content="Filliere"/>
                <MenuItem link="/notes" icon={gradesIC} content="Notes"/>
                <MenuItem link="/classe" icon={classeIC} content="Classe"/>
                <MenuItem link="/etudiant" icon={studentIC} content="Etudiantes"/>
                <MenuItem link="/professeur" icon={teacherIC} content="Professeures"/>
                <MenuItem link="/abscence" icon={studentPresenceIC} content="Abscence"/>
                
            </ul>
        
    )
}