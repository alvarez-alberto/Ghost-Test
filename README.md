# Ghost-Test

En este repositorio se encuentran centralizado los escenario de pruebas para ambas versiones de ghost: 5.18 y 3.42 cada uno modificado para tomar y guardar screenshot en cada paso.



**Ejecución de las pruebas VRT para Tags**
1. Clonar el repositorio https://github.com/alvarez-alberto/Ghost-Test.git
2. En una consola de comando ubicarse en la ruta Ghost-Test\Ghost-PruebasDeRegresion desde el directorio utilizado en el punto anterior
3. Ejecutar el comando npm install
4. Ejecutar el comado node TagCrearNegativoVRTPlaywright.js
5. Cuando finalice la ejecución ubicarse en la siguiente ruta Ghost-Test\Ghost-PruebasDeRegresion\results\playwright\
6 Abrir la ultima carpeta generada - Validar que corresponda a la fecha de ejecución
7. Dentro de esta carpeta se ubican las imagenes generadas resultado de la comparación
8. Dentro de esa carpeta encontrará una carpeta report que contiene el reporte en html donde se muestraslas imagenes objetos de la comparación, la imagen resultante y la información resultado de la comparación usando Resemblejs
