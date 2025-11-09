import { type interfazListaTareas } from "./ListaTareas";
import type { interfazTarea , Estado, Dificultad, Vencimiento} from "./Tarea";
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
            /*gestiono todas la acciones que generan efectos secundarios desde el borde, es decir este menu,
            manteniendo funciones puras y evitando mutaciones en la lsita de tareas, ya que simplemente hago
            una copia de la lista y devuelvo una nueva lista con el nuevo objeto insertado*/
            objetoListaTareas.agregarTarea();
            //Una vez insertada la tarea en la lista ordeno una copia de la lista y la reasigno a la lista original
            objetoListaTareas.listaTareas = objetoListaTareas.ordenarTareas();
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
