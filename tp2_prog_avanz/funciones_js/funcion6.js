function factorial(numero) {
    if (numero === 0 || numero === 1) {
        return 1;
    }

    return numero * factorial(numero - 1);
}

console.log("Factorial de 5:", factorial(5));
console.log("Factorial de 6:", factorial(6));