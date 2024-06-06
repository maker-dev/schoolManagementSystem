import { useState } from "react";
import CrudPage from "./CrudPage";

export default function ClassPage(){
    const [classColumns, ] = useState({className:"Nom Classe","field.fieldName":"Filière"});
    return(
        <CrudPage columns={classColumns}
        indexApi="showClasses"
        deleteApi="deleteClass"
        idName="classId"
        title="Gestion Classes"
        objectName="Classe"
        ></CrudPage>
    )

}