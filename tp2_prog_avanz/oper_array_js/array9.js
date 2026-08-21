const personas = [
    {
        nombre: "Juan",
        edad: 25
    },
    {
        nombre: "Maria",
        edad: 35
    },
    {
        nombre: "Pedro",
        edad: 40
    }
];

const personaEncontrada = personas.find(persona => persona.edad > 30);

console.log(personaEncontrada);