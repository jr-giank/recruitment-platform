export const validateVacancyForm = (name, value) => {

    switch(name){
        case "nombre_puesto":
            if(value === ""){
                return  "El nombre del puesto es requerido"
            }
            else if(value.length < 5){
                return  "Escriba un nombre de puesto válido"
            }
            break

        case "categoria":
            if(value === ""){
                return "Seleccione una categoría"
            }
            break

        case "tipo_trabajo":
            if(value === ""){
                return "Seleccione el tipo de trabajo"
            }
            break

        case "forma_trabajo":
            if(value === ""){
                return "Seleccione la modalidad del trabajo"
            }
            break

        case "responsabilidades_puesto":
            if(value === ""){
                return "Detalle las responsabilidades del trabajo"
            }
            break

        case "requisitos_obligatorios":
            if(value === ""){
                return "Detalle los requisitos obligatorios de la vacante"
            }
            break
    }
    return null
}