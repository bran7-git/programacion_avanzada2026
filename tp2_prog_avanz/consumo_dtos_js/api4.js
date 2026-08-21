function mapearUsuarios(usuarios) {
    return usuarios.map(usuario => {
        return {
            nombre: usuario.name,
            email: usuario.email
        };
    });
}

const usuarios = [
    {
        name: "Juan",
        email: "juan@email.com",
        edad: 20
    },
    {
        name: "Maria",
        email: "maria@email.com",
        edad: 25
    }
];

const usuariosMapeados = mapearUsuarios(usuarios);

console.log(usuariosMapeados);