// src/index.ts
import { constructorListaTareas } from './ListaTareas';
import { constructorMenuPrincipal } from './MenuPrincipal';
//creo un arreglo de objetos de tipo Tarea
const objetoListaTareas = new (constructorListaTareas as any)();
const menuPrincipal = new (constructorMenuPrincipal as any) ();

menuPrincipal.menu(objetoListaTareas);
