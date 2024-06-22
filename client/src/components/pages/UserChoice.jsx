import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faUserShield } from '@fortawesome/free-solid-svg-icons';
import UserCard from '../cards/UserCard';

export default function UserChoice() {
    return (
        <div className='bg-blue-600 w-full md:h-lvh h-full'>
            <div className="">
                <div className='flex flex-wrap justify-center bg-blue-600'>
                    <UserCard 
                        link="/loginEtudiant" 
                        icon={<FontAwesomeIcon icon={faUserGraduate} />} 
                        user="Etudiant" 
                        desc="Bienvenue dans l'espacement Etudiant." 
                    />
                    <UserCard 
                        link="/loginProf" 
                        icon={<FontAwesomeIcon icon={faChalkboardTeacher} />} 
                        user="Professeur" 
                        desc="Bienvenue dans l'espacement Professeur." 
                    />
                    <UserCard 
                        link="/loginAdmin" 
                        icon={<FontAwesomeIcon icon={faUserShield} />} 
                        user="Admin" 
                        desc="Bienvenue dans l'espacement Administrateur." 
                    />
                </div>
            </div>
        </div>
    );
}
