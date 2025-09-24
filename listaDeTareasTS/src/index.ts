import promptSync from "prompt-sync";
const prompt = promptSync();

const nombre = prompt("Ingrese su nombre: ");

interface Tarea {
    titulo: string;
    descripcion: string;
    dificultad: Dificultad;
    vencimiento: Vencimiento;
    fechaCreacion: Date;
    ultimaModificacion: Date;
    estado: Estado;
}

type Dificultad = "facil" | "media" | "dificil";
type Vencimiento = string | "No especificado";
type Estado = "pendiente" | "en progreso" | "completa";

/*
Defino un objeto tarea con las propiedades necesarias
*/

const listaTareas : Tarea[] = [];
/*
Defino una lista de tareas que solo puede almacenar objetos de tipo Tarea
*/

let opcion : number = 0;

do {
  console.log(`\nHola, ${nombre}. ¿Qué te gustaría hacer?`);
  console.log("1. Ver tareas");
  console.log("2. Agregar una nueva tarea");
  console.log("3. Actualizar el estado de una tarea");
  console.log("4. Buscar una tarea por título");
  console.log("5. Eliminar una tarea");
  console.log("6. Salir");

  opcion = Number(prompt("Seleccione una opción (1-6): "));

  switch (opcion) {
    case 1:
        verTareas(listaTareas);
        break;
    case 2:
        agregarTarea(listaTareas);
        break;
    case 3:
        if (listaTareas.length) actualizarTarea(listaTareas);
        else console.log("No hay tareas disponibles para actualizar.");
        break;
    case 4:
      buscarTarea(listaTareas);
      break;
    case 5:
      if (listaTareas.length) eliminarTarea(listaTareas);
      else console.log("No hay tareas disponibles para eliminar.");
      break;
    case 6: console.log("Saliendo del programa. ¡Hasta luego!"); break;
      default: console.log("Opción inválida.");
      break;
  }
} while (opcion !== 6);

function buscarTarea(listaTareas: Tarea[]): void {
  if (!listaTareas.length) return console.log("No hay tareas disponibles.");
  const clave : string = prompt("Ingrese una palabra clave para buscar: ").toLowerCase();
  const resultados : Tarea[] = listaTareas.filter(t => t.titulo.toLowerCase().includes(clave));
  
  if (resultados.length) {
    console.log("\nTareas encontradas:");
    resultados.forEach((t, i) => {
      console.log(`${i + 1}. ${t.titulo} - ${t.descripcion} [${t.estado}]`);
    });
  } else {
    console.log("No se encontraron tareas que coincidan.");
  }
}

function agregarTarea(listaTareas: Tarea[]): void {
  const titulo = agregarTitulo();
  const descripcion = agregarDescripcion();
  const estado: Estado = "pendiente"; // Estado inicial siempre es "pendiente"
  const dificultad= agregarDificultad();
  const vencimiento= agregarVencimiento();
  
  const tarea : Tarea = { titulo, descripcion, estado, dificultad, vencimiento, fechaCreacion: new Date(), ultimaModificacion: new Date() };
  listaTareas.push(tarea);
  console.log(`Tarea "${tarea.titulo}" agregada.`);
  ordenarTareas(listaTareas);
}
/*
listaTareas: Tarea[] → aclara que el metodo recibe un array de objetos de tipo tarea.
const tarea: Tarea → obliga a que el objeto cumpla con la interfaz Tarea.
: void → indica que la función no devuelve nada.
*/


function agregarDescripcion(): string {
  let descripcion : string = prompt("Descripción: ");
  if (descripcion.length === 0) descripcion = "Sin descripción";
  else if (descripcion.length > 200) {
    console.log("La descripción no debe exceder los 200 caracteres.");
    return agregarDescripcion();
  }
  return descripcion;
}

function agregarTitulo(): string {
  let titulo : string = prompt("Título: ");
  if (titulo.length < 100 && titulo.length > 0) {
    return titulo;
  } else {
    console.log("El título debe tener entre 1 y 100 caracteres.");
    return agregarTitulo();
  }
}

function agregarVencimiento() : Vencimiento {
  let vencimiento = "No especificado";
    let opcion : string , valido : number = 0;
    do {
    opcion = prompt("¿Desea agregar una fecha de vencimiento? (s/n): ").toLowerCase(); //.toLowerCase() Convierte el string a minúsculas.
        if (opcion !== 's' && opcion !== 'n') console.log("Opción inválida");
      else if (opcion === 'n') {
        return vencimiento as Vencimiento;
      }
      else if (opcion === 's') {
        do {
        vencimiento = prompt("Fecha de vencimiento (DD/MM/AAAA): ");
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20\d{2})$/;
        if (!regex.test(vencimiento)) console.log("Formato inválido. Use DD/MM/AAAA.");
        /*
        Pide al usuario una fecha.
        Usa expresiones regulares (regex) para validar el formato.
        ^(0[1-9]|[12][0-9]|3[01]) → día válido (01 a 31).
        \/(0[1-9]|1[0-2]) → barra / y mes válido (01 a 12).
        \/(20\d{2})$ → barra / y un año entre 2000 y 2099.
        Si no coincide (!regex.test(...)), muestra error y repite el bucle.
        Si es correcto, marca valido = 1 y sale.*/
        return vencimiento as Vencimiento;
      } while (valido===0);
    }
    } while (valido===0);
    return vencimiento as Vencimiento;
}

function agregarDificultad() : Dificultad {
  let opcion : string, valido : number =0;
  let dificultad : Dificultad = "facil";
  
    do {
    opcion = prompt("¿Desea agregar una dificultad? (s/n): ").toLowerCase();
      if (opcion !== 's' && opcion !== 'n') console.log("Opción inválida");
      else if (opcion === 'n') {
        return dificultad;
      }
      else if (opcion === 's') {
        do {
        let cadena : string = prompt("Dificultad (facil/media/dificil): ").toLowerCase();
        if (cadena !== 'facil' && cadena !== 'media' && cadena !== 'dificil') {
          console.log("Dificultad inválida. Use facil, media o dificil.");
        }
        else return cadena as Dificultad;;
        } while (valido===0);
      }
    } while (valido===0);
    return dificultad;
}

function verTareas(listaTareas: Tarea[]): void {
  if (!listaTareas.length) return console.log("No hay tareas disponibles.");
  console.log("\nQue tareas desea ver:");
  console.log("1. Todas");
  console.log("2. Pendientes");
  console.log("3. En progreso");
  console.log("4. Completadas");
  console.log("5. volver al menú principal");
  let opcion : number = Number(prompt("Seleccione una opción (1-5): "));
  switch (opcion) {
    case 1:
      listarTareas(listaTareas);
      break;
    case 2:
      /*El metodo filter toma todas las tareas que cumplan con la condicion solicitada y las almacena
      en una nueva lista*/
      const pendientes : Tarea[] = listaTareas.filter(t => t.estado === 'pendiente');
      listarTareas(pendientes);
      break;
    case 3:
      const enProgreso : Tarea[] = listaTareas.filter(t => t.estado === 'en progreso');
      listarTareas(enProgreso);
      break;
    case 4:
      const completadas : Tarea[] = listaTareas.filter(t => t.estado === 'completa');
      listarTareas(completadas);
      break;
    case 5:
      break;
    default:
      console.log("Opción inválida.");
      break;
  }
}

function ordenarTareas(tareas : Tarea[]): Tarea[] {
  tareas.sort((a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime());
  return tareas;
}

/*
a.fechaCreacion es un objeto Date.
.getTime() devuelve un number con la cantidad de milisegundos desde 1/1/1970.
Asi la resta es válida y ordena cronológicamente.
sort() compara pares de elementos y si uno es mas antiguo que otro intercambia posiciones, ord. burbuja.
La resta de fechas se traduce a números (timestamps).
Eso determina el orden cronológico de las tareas. Si la diferencia es negativa, significa que a fue
creado antes que b → a va primero. Si es positiva, a fue creado después → va después.
*/

function listarTareas(tareas : Tarea[]): void {
  console.log("Tareas:");
  tareas.forEach((t, i) => {
    console.log(`${i + 1}. ${t.titulo}`);
  });
  console.log("Desea ver el detalle de alguna tarea?");
  let detalle : number = Number(prompt("Número de la tarea (0 para volver): "));
  if (detalle === 0) return;
  if (!Number.isInteger(detalle) || detalle < 1 || detalle > tareas.length) {
    console.log("Número inválido.");
    return;
  }
  let t : Tarea = tareas[detalle - 1];
  console.log(`\nDetalle de la tarea "${t.titulo}":`);
  console.log(`\nEstado: ${t.estado}`);
  console.log(`\nDescripción: ${t.descripcion}`);
  console.log(`\nFecha de creación: ${t.fechaCreacion.toLocaleString()}`);
  console.log(`\nFecha de vencimiento: ${t.vencimiento}`);
  console.log(`\nDificultad: ${t.dificultad}`);
  console.log(`\nÚltima modificación: ${t.ultimaModificacion.toLocaleString()}`);

  let editar : string = prompt("¿Desea editar esta tarea? (s/n): ").toLowerCase();
  if (editar === 's') {
    editarTarea(tareas, detalle - 1);
  } else if (editar !== 'n') {
    console.log("Opción inválida.");
  }
}

/*
Esto es un template literal (comillas invertidas ` `).
Permite interpolar variables con ${...}.
${i + 1} → muestra el número de tarea empezando en 1 (porque los arrays empiezan en 0).
[${t.estado}] → muestra el estado de la tarea entre corchetes.
${t.titulo} → el título de la tarea.
${t.descripcion} → la descripción de la tarea.
${t.fechaCreacion.toLocaleString()} → convierte la fecha guardada en el objeto
t.fechaCreacion a un string legible según la configuración local de tu Windows
(ejemplo: 22/9/2025 18:35:12).
*/

function editarTarea(listaTareas : Tarea[], indiceTarea : number): void {
  const tarea = listaTareas[indiceTarea];
  console.log(`\nQue campo desea editar?`);
  console.log("1. Título");
  console.log("2. Descripción");
  console.log("3. Estado");
  console.log("4. Dificultad");
  console.log("5. Fecha de vencimiento");
  console.log("6. Volver al menú principal");
  const opcion = Number(prompt("Seleccione una opción (1-6): "));
  switch (opcion) {
    case 1:
      tarea.titulo = agregarTitulo();
      console.log("Título actualizado.");
      tarea.ultimaModificacion = new Date();
      break;
    case 2:
      tarea.descripcion = agregarDescripcion();
      console.log("Descripción actualizada.");
      tarea.ultimaModificacion = new Date();
      break;
    case 3:
      let entrada = prompt("Nuevo estado (pendiente/en progreso/completa): ")?.toLowerCase();
        if (entrada === "pendiente" || entrada === "en progreso" || entrada === "completa" ) {
        let nuevoEstado: Estado = entrada; // ✅ ahora TS sabe que es un Estado
        tarea.estado = nuevoEstado;
        console.log("Estado actualizado.");
        } else {
        console.log("Estado inválido");
        }      
      tarea.ultimaModificacion = new Date();
      break;
    case 4:
      tarea.dificultad = agregarDificultad();
      console.log("Dificultad actualizada.");
      tarea.ultimaModificacion = new Date();
      break;
    case 5:
      tarea.vencimiento = agregarVencimiento();
      console.log("Fecha de vencimiento actualizada.");
      tarea.ultimaModificacion = new Date();
      break;
    case 6:
      break;
    default:
      console.log("Opción inválida.");
      break;
  }
}

/*
los cambios se implementan directamente en el objeto dentro del arreglo, porque en JavaScript los 
objetos no se copian por valor, sino por referencia.
*/

function actualizarTarea(listaTareas: Tarea[]) : void {
  verTareas(listaTareas);
  const indice = Number(prompt("Número de la tarea a actualizar: ")) - 1;
  if (!Number.isInteger(indice) || indice < 0 || indice >= listaTareas.length) return console.log("Número inválido.");
  const nuevoEstado = prompt("Nuevo estado (pendiente/en progreso/completa): ");
  if (nuevoEstado !== "pendiente" && nuevoEstado !== "en progreso" && nuevoEstado !== "completa") {
    return console.log("Estado inválido.");
  } else {
    listaTareas[indice].estado = nuevoEstado as Estado;
    listaTareas[indice].ultimaModificacion = new Date();
    console.log("Estado actualizado.");
  }
}

function eliminarTarea(listaTareas: Tarea[]) : void {
  verTareas(listaTareas);
  let indice : number = Number(prompt("Número de la tarea a eliminar: ")) - 1;
  if (!Number.isInteger(indice) || indice < 0 || indice >= listaTareas.length) return console.log("Número inválido.");
  let [tareaEliminada] : (Tarea | undefined)[] = listaTareas.splice(indice, 1);
  /*
splice(indice, 1) modifica el array original y devuelve un array con los elementos eliminados.
En este caso, como pedís 1, siempre devuelve un array de 1 elemento.
La desestructuración con [ ] extrae ese único objeto y lo asigna a tareaEliminada, haciendo que tareaEliminada sea
directamente una Tarea, no un array.
tareaEliminada es del tipo Tarea | undefined.
Tarea si realmente se eliminó una.
undefined si no había nada en esa posición (aunque la validación ya evite esto, ts necesita asegurarse).
*/
  console.log(`Tarea "${tareaEliminada.titulo}" eliminada.`);
  }

