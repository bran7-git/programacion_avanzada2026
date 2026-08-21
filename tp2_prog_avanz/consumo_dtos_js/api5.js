function validarFormulario(formulario) {
    return (
        formulario.nombre &&
        formulario.email &&
        formulario.password
    ) ? true : false;
}

const formularioCorrecto = {
    nombre: "Juan",
    email: "juan@email.com",
    password: "123456"
};

const formularioIncorrecto = {
    nombre: "Juan",
    email: "",
    password: "123456"
};

console.log(validarFormulario(formularioCorrecto));
console.log(validarFormulario(formularioIncorrecto));