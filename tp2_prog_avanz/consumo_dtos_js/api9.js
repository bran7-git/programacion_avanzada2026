function generarToken(usuario) {
    const datos = JSON.stringify(usuario);

    const datosCodificados = btoa(datos);

    return `JWT-${datosCodificados}`;
}

const usuario = {
    id: 1,
    nombre: "Juan",
    email: "juan@email.com"
};

const token = generarToken(usuario);

console.log("Token generado:");
console.log(token);