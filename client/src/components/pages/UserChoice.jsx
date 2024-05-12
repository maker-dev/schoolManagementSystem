import UserCard from '../cards/UserCard';
import studentIC from '../../assets/icons/student_user.svg';
import profIC from '../../assets/icons/teacher_white.svg';
import adminIC from '../../assets/icons/admin.svg';



export default function UserChoice(){
    return(
        <div className='bg-blue-600 w-screen h-screen  '>
            <div className="">
                <div className='flex flex-wrap justify-center pt-14 '>
                    <UserCard icon={studentIC} user="Etudiant" desc="Bienvenue dans l'espacement Etudiant."  />
                    <UserCard icon={profIC} user="Professeur" desc="Bienvenue dans l'espacement Professeur."  />
                    <UserCard icon={adminIC} user="Admin" desc="Bienvenue dans l'espacement Admin."  />
                </div>
                <div>

                </div>
            </div>
        </div>
        
    )
}