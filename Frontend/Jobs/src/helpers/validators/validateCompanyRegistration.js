import validator from "validator";

export const validateCompanyRegistrationForm = (name, value) => {

    switch(name){
        case "companyName":
            if(value === ""){
                return  "El nombre de la empresa es requerido"
            }
            break;

        case "email":
        case "emailVacancies":
            if(value === ""){
                return "El email es requerido"
            }
            if(!validator.isEmail(value)){
                return "Este email es inválido"
            }
            break;

        case "password":
            if(value.length < 7){
                return "La contraseña debe tener al menos 7 caracteeres"
            }
            break;

        case "description":
            if(value === ""){
                return "Agregue una descripción para la empresa"
            }
            if(value.length < 10){
                return "Descripción inválida"
            }
            break;

        case "phoneNumber":
            if(value !== "" && !validator.isMobilePhone(value)){
                return "El número de teléfono proporcionado no es válido"
            }
            break;

        case "address":
            if(value === ""){
                return "Agregue la dirección de la empresa"
            }
            break;

        case "webUrl":
        case "instagramUrl":
        case "twitterUrl":
        case "facebookUrl":
            if(value !== "" && !validator.isURL(value)){
                return "Agregue una URL válida"
            }
            break;
    }
    return null
}