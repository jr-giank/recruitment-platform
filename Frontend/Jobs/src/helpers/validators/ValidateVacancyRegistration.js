export const validateVacancyForm = (name, value) => {

    switch(name){
        case "vacancyName":
            if(value === ""){
                return  "El nombre del puesto es requerido"
            }
            else if(value.length < 5){
                return  "Escriba un nombre de puesto válido"
            }
            break

        case "category":
            if(value === ""){
                return "Seleccione una categoría"
            }
            break

        case "jobType":
            if(value === ""){
                return "Seleccione el tipo de trabajo"
            }
            break

        case "jobWay":
            if(value === ""){
                return "Seleccione la modalidad del trabajo"
            }
            break

        case "duties":
            if(value === ""){
                return "Detalle las responsabilidades del trabajo"
            }
            break

        case "requirements":
            if(value === ""){
                return "Detalle los requisitos obligatorios de la vacante"
            }
            break
    }
    return null
}