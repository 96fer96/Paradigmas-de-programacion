//aca voy a instanciar los objetos de tipo tarea usando import
import { constructorListaTareas } from './ListaTareas';
import { constructorMenuPrincipal } from './MenuPrincipal';
//creo un arreglo de objetos de tipo Tarea
export const objetoListaTareas = new (constructorListaTareas as any)();
const menuPrincipal = new (constructorMenuPrincipal as any) ();

menuPrincipal.menu(objetoListaTareas);


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