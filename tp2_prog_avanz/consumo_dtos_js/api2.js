async function obtenerUsuarios() {
    const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    return await respuesta.json();
}

async function imprimirNombresDeUsuarios() {
    const usuarios = await obtenerUsuarios();

    const nombres = usuarios.map(usuario => usuario.name);

    console.log(nombres);
}

imprimirNombresDeUsuarios();