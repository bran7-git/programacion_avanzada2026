function buscarUsuarioPorEmail(usuarios, email) {
    return usuarios.find(usuario => usuario.email === email);
}

const usuarios = [
    {
        nombre: "Juan",
        email: "juan@email.com"
    },
    {
        nombre: "Maria",
        email: "maria@email.com"
    },
    {
        nombre: "Pedro",
        email: "pedro@email.com"
    }
];

const usuarioEncontrado = buscarUsuarioPorEmail(
    usuarios,
    "maria@email.com"
);

console.log(usuarioEncontrado);