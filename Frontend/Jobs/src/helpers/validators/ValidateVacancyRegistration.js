export const validateVacancyForm = (name, value, value2) => {

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

        case "salario_max":
        case "salario_min":
            if(value && value2 && (value >= value2)){
                return "El salario máximo no puede ser menor ni igual al salario mínimo"
            }
            break

        case "hora_entrada":
        case "hora_salida":
            if(!value || !value2){
                return "La hora de entrada y de salida son requeridas" 
            }
            
            // Comparacion de horarios (el horario final debe ser mayor al horario de entrada)
            const hEntrada = new Date()
            const hInicio = value.split(":")
            const hSalida = new Date()
            const hFinal = value2.split(":")

            hEntrada.setTime(hInicio[0], hInicio[1])
            hSalida.setTime(hFinal[0], hFinal[1])

            if(hEntrada.getTime() >= hSalida.getTime()){
                return "El horario de trabajo es inválido"
            }

            break
    }
    return null
}