"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorMenuPrincipal = constructorMenuPrincipal;
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)();
function constructorMenuPrincipal() {
}
constructorMenuPrincipal.prototype.menu = function (objetoListaTareas) {
    var opcion = 0;
    var nombre = prompt("Ingrese su nombre: ");
    do {
        console.log("\nHola, ".concat(nombre, ". \u00BFQu\u00E9 te gustar\u00EDa hacer?"));
        console.log("1. Ver tareas");
        console.log("2. Agregar una nueva tarea");
        console.log("3. Buscar una tarea por título");
        console.log("4. Salir");
        opcion = Number(prompt("Seleccione una opción (1-4): "));
        switch (opcion) {
            case 1:
                objetoListaTareas.verTareas();
                break;
            case 2:
                objetoListaTareas.agregarTarea();
                break;
            case 3:
                objetoListaTareas.buscarTarea();
                break;
            case 4:
                console.log("Saliendo del programa. ¡Hasta luego!");
                break;
            default:
                console.log("Opción inválida.");
                break;
        }
    } while (opcion !== 4);
};
