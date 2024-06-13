import { useState } from "react";
import CrudPage from "./CrudPage"

export default function TeacherPage(){
    
    const [professeurColumns, ] = useState({email:"Email", firstName:"Nom", lastName:"Prénom"});

    return(
        <CrudPage columns={professeurColumns}
        indexApi="showAllTeachers"
        deleteApi="deleteTeacher"
        idName="teacherId"
        title="Gestion Professeurs"
        objectName="Professeur"
        ></CrudPage>
    )
}