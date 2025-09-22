import promptSync from "prompt-sync";
const prompt = promptSync();

const nombre = prompt("Ingrese su nombre: ");
const listaTareas = [];
let opcion = 0;

do {
  console.log(`\nHola, ${nombre}. ¿Qué te gustaría hacer?`);
  console.log("1. Ver todas las tareas");
  console.log("2. Agregar una nueva tarea");
  console.log("3. Actualizar el estado de una tarea");
  console.log("4. Eliminar una tarea");
  console.log("5. Salir");

  opcion = Number(prompt("Seleccione una opción (1-5): "));

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
      if (listaTareas.length) eliminarTarea(listaTareas);
      else console.log("No hay tareas disponibles para eliminar.");
      break;
    case 5: console.log("Saliendo del programa. ¡Hasta luego!"); break;
      default: console.log("Opción inválida.");
      break;
  }
} while (opcion !== 5);

function agregarTarea(listaTareas) {
  const titulo = agregarTitulo();
  const descripcion = agregarDescripcion();
  const estado = 'pendiente';
  /*
  const fija la referencia de la variable, no congela el contenido del objeto.
  Los objetos y arrays declarados con const pueden modificar sus propiedades/elementos.
  En cambio dado que el atributo de dificultad y fecha de finalizacion es indefinido, necesito
  declararlo como variable */
  
  const dificultad= agregarDificultad();
  const vencimiento= agregarVencimiento();
  
  const tarea = { titulo, descripcion, estado, dificultad, vencimiento, fechaCreacion: new Date() };
  listaTareas.push(tarea);
  console.log(`Tarea "${tarea.titulo}" agregada.`);
}

function agregarDescripcion() {
  let descripcion = prompt("Descripción: ");
  if (descripcion.length === 0) descripcion = "Sin descripción";
  else if (descripcion.length > 500) {
    console.log("La descripción no debe exceder los 200 caracteres.");
    return agregarDescripcion();
  }
  return descripcion;
}

function agregarTitulo() {
  let titulo = prompt("Título: ");
  if (titulo.length < 100 && titulo.length > 0) {
    return titulo;
  } else {
    console.log("El título debe tener entre 1 y 100 caracteres.");
    return agregarTitulo();
  }
}

function agregarVencimiento() {
  let vencimiento = "No especificado";
    let opcion=0, valido=0;
    opcion = prompt("¿Desea agregar una fecha de vencimiento? (s/n): ").toLowerCase(); //.toLowerCase() Convierte el string a minúsculas.
      if (opcion !== 's' && opcion !== 'n') console.log("Opción inválida");
      else if (opcion === 'n') {
        return vencimiento;
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
        return vencimiento;
      } while (valido===0);
    }
}

function agregarDificultad() {
  let opcion=0, valido=0;
  let dificultad = "Facil";
  
    opcion = prompt("¿Desea agregar una dificultad? (s/n): ").toLowerCase();
      if (opcion !== 's' && opcion !== 'n') console.log("Opción inválida");
      else if (opcion === 'n') {
        return dificultad;
      }
      else if (opcion === 's') {
        do {
        dificultad = prompt("Dificultad (facil/media/dificil): ");
        if (dificultad !== 'facil' && dificultad !== 'media' && dificultad !== 'dificil') {
          console.log("Dificultad inválida. Use baja, media o alta.");
        }
        else return dificultad;;
        } while (valido===0);
      }
  
}

function verTareas(listaTareas) {
  if (!listaTareas.length) return console.log("No hay tareas disponibles.");
  console.log("\nQue tareas desea ver:");
  console.log("1. Todas");
  console.log("2. Pendientes");
  console.log("3. En progreso");
  console.log("4. Completadas");
  console.log("5. volver al menú principal");  
  const opcion = Number(prompt("Seleccione una opción (1-4): "));
  switch (opcion) {
    case 1:
      ordenarTareas(listaTareas);
      listarTareas(listaTareas);
      break;
    case 2:
      const pendientes = listaTareas.filter(t => t.estado === 'pendiente');
      ordenarTareas(pendientes);
      listarTareas(pendientes);
      break;
    case 3:
      const enProgreso = listaTareas.filter(t => t.estado === 'en progreso');
      ordenarTareas(enProgreso);
      listarTareas(enProgreso);
      break;
    case 4:
      const completadas = listaTareas.filter(t => t.estado === 'completa');
      ordenarTareas(completadas);
      listarTareas(completadas);
      break;
    case 5:
      break;
    default:
      console.log("Opción inválida.");
      break;
  }
  /*listaTareas.forEach((t, i) => {
    console.log(`${i + 1}. [${t.estado}] ${t.titulo} - ${t.descripcion} (Creada: ${t.fechaCreacion.toLocaleString()}) - Vence: ${t.vencimiento} - Dificultad: ${t.dificultad}`);
  });*/
}

function ordenarTareas(tareas) {
  return tareas.sort((a, b) => a.fechaCreacion - b.fechaCreacion);
}

function listarTareas(tareas) {
  console.log("Tareas:");
  tareas.forEach((t, i) => {
    console.log(`${i + 1}. ${t.titulo}`);
  });
  console.log("Desea ver el detalle de alguna tarea?");
  const detalle = Number(prompt("Número de la tarea (0 para volver): "));
  if (detalle === 0) return;
  if (!Number.isInteger(detalle) || detalle < 1 || detalle > tareas.length) {
    console.log("Número inválido.");
    return;
  }
  const t = tareas[detalle - 1];
  console.log(`\nDetalle de la tarea "${t.titulo}":`);
  console.log(`\nEstado: ${t.estado}`);
  console.log(`\nDescripción: ${t.descripcion}`);
  console.log(`\nFecha de creación: ${t.fechaCreacion.toLocaleString()}`);
  console.log(`\nFecha de vencimiento: ${t.vencimiento}`);
  console.log(`\nDificultad: ${t.dificultad}`);
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

function actualizarTarea(listaTareas) {
  verTareas(listaTareas);
  const indice = Number(prompt("Número de la tarea a actualizar: ")) - 1;
  if (!Number.isInteger(indice) || indice < 0 || indice >= listaTareas.length) return console.log("Número inválido.");
  const nuevoEstado = prompt("Nuevo estado (pendiente/en progreso/completa): ");
  listaTareas[indice].estado = nuevoEstado;
  console.log("Estado actualizado.");
}

function eliminarTarea(listaTareas) {
  verTareas(listaTareas);
  const indice = Number(prompt("Número de la tarea a eliminar: ")) - 1;
  if (!Number.isInteger(indice) || indice < 0 || indice >= listaTareas.length) return console.log("Número inválido.");
  const [tareaEliminada] = listaTareas.splice(indice, 1);
  console.log(`Tarea "${tareaEliminada.titulo}" eliminada.`);
}
