"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objetoListaTareas = void 0;
//aca voy a instanciar los objetos de tipo tarea usando import
var ListaTareas_1 = require("./ListaTareas");
var MenuPrincipal_1 = require("./MenuPrincipal");
//creo un arreglo de objetos de tipo Tarea
exports.objetoListaTareas = new ListaTareas_1.constructorListaTareas();
var menuPrincipal = new MenuPrincipal_1.constructorMenuPrincipal();
menuPrincipal.menu(exports.objetoListaTareas);
/*
Pendiente:
-gestionar mediante acoplamiento los metodos del prototipo instanciado: lista de tareas usando el menu principal
del archivo menuPrincipal
*/
/*import { Menu } from './menuPrincipal.ts';

/*
Problemas:
-Tengo un problema en la importacion y exportacion de objetos entre clases, pues no me reconoce el archivo de
index.ts los metodos del objeto Tarea. Noto qeu importe la interfaz de Tarea, pero no la funcion constructora


La IA indica: "círculo de imports y confusión tipo vs valor. Estás importando menuPrincipal ↔ index ↔ Tarea,
y además usás el mismo nombre Tarea para tipo e instanciador. Resultado: el array contiene literales o tipos,
no instancias con prototipo.
Arreglo en 4 pasos:
Renombrá el tipo y separá el constructor.
Mover la listaTareas a un nuevo archivo para romper el ciclo.
Importa tipos como tipos y el constructor como valor.
"
*/ 
