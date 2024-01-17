//Permite definir a cuál altura se encuentra la carpeta.

import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

//Trae la ruta exacta donde se encuentra el archivo