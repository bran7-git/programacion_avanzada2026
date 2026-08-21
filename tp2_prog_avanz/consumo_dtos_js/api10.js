function actualizarUsuario(usuario, cambios) {
    return Object.assign({}, usuario, cambios);
}

const usuario = {
    nombre: "Juan",
    edad: 20,
    email: "juan@email.com"
};

const cambios = {
    edad: 25,
    email: "juan25@email.com"
};

const usuarioActualizado = actualizarUsuario(usuario, cambios);

console.log("Usuario original:");
console.log(usuario);

console.log("Usuario actualizado:");
console.log(usuarioActualizado);