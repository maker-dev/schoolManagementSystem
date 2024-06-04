import { useState } from "react";
import CrudPage from "./CrudPage";

export default function FilierePage(){
    const [bacColumns, ] = useState({typeName:"Type du Bac"});
    return(
        <CrudPage columns={bacColumns}
        indexApi="typesOfBac"
        deleteApi="deleteType"
        idName="typeId"
        title="Gestion Bac"
        objectName="Bac"
        ></CrudPage>
    )

}