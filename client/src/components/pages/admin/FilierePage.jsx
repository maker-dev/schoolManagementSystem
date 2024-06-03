import { useState } from "react";
import CrudPage from "./CrudPage";

export default function FilierePage(){
    const [filiereColumns, ] = useState({fieldName:"Nom filière"});
    return(
        <CrudPage columns={filiereColumns}
        indexApi="showFields"
        deleteApi="deleteField"
        idName="fieldId"
        title="Gestion Filière"
        objectName="Filière"
        ></CrudPage>
    )

}