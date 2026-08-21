const usuarioPredefinido = {
    usuario: "admin",
    contraseña: "1234"
};

function autenticarUsuario(credenciales) {
    return (
        credenciales.usuario === usuarioPredefinido.usuario &&
        credenciales.contraseña === usuarioPredefinido.contraseña
    );
}

const credencialesCorrectas = {
    usuario: "admin",
    contraseña: "1234"
};

const credencialesIncorrectas = {
    usuario: "admin",
    contraseña: "0000"
};

console.log(autenticarUsuario(credencialesCorrectas));
console.log(autenticarUsuario(credencialesIncorrectas));