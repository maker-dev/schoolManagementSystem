import UserCard from '../cards/UserCard';
import studentIC from '../../assets/icons/student_user.svg';
import profIC from '../../assets/icons/teacher_white.svg';
import adminIC from '../../assets/icons/admin.svg';



export default function UserChoice(){
    return(
        <div className='bg-blue-600 w-screen h-screen  '>
            <div className="">
                    <div className='flex flex-wrap justify-center py-14  '>
                        <UserCard link="/loginEtudiant" icon={studentIC} user="Etudiant" desc="Bienvenue dans l'espacement Etudiant."  />
                        <UserCard link="/loginProf" icon={profIC} user="Professeur" desc="Bienvenue dans l'espacement Professeur."  />
                        <UserCard link="/loginAdmin" icon={adminIC} user="Admin" desc="Bienvenue dans l'espacement Admin."  />
                    </div>
            </div>
        </div>
        
    )
}