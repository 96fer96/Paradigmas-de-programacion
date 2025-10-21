import type { interfazListaTareas } from "./ListaTareas";
import promptSync from "prompt-sync";
const prompt = promptSync();

export interface interfazMenu {
    menu(objetoListaTareas : interfazListaTareas) :void;
}

export function constructorMenuPrincipal(this : interfazMenu) {
}

constructorMenuPrincipal.prototype.menu = function(objetoListaTareas : interfazListaTareas) :void {
    let opcion : number = 0;
    const nombre = prompt("Ingrese su nombre: ");

    do {
        console.log(`\nHola, ${nombre}. ¿Qué te gustaría hacer?`);
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
            console.log("Saliendo del programa. ¡Hasta luego!"); break;
            default: console.log("Opción inválida.");
            break;
            }
        } while (opcion !== 4);
}
