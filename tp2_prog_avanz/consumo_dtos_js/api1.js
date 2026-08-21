async function obtenerUsuarios() {
    const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const usuarios = await respuesta.json();

    console.log(usuarios);
}

obtenerUsuarios();