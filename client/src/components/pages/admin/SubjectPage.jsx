import { useState } from "react";
import CrudPage from "./CrudPage";

export default function SubjectPage(){
    const [subjectColumns, ] = useState({subName:"Nom Module",numberOfExams:"Nombre des exames",labs:"Facteur"});
    return(
        <CrudPage columns={subjectColumns}
        indexApi="showSubjects"
        deleteApi="deleteSubject"
        idName="subjectId"
        title="Gestion Modules"
        objectName="Module"
        ></CrudPage>
    )

}