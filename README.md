# Ghost-Test

En este repositorio se encuentran centralizado los escenario de pruebas para ambas versiones de ghost: 5.18 y 3.42 cada uno modificado para tomar y guardar screenshot en cada paso.

Los escenarios de prueba y las pruebas VRT se encuentran en el repo https://github.com/alvarez-alberto/Ghost-Test.git. Lo primero que se debe hacer es clonar este repositorio.

Nota: Todas las rutas mencioonadas se indican a partir del directorio donde se descargó  el repo

**1. Pruebas Kraken**

   **Ghost v3.42**
  - **Configuración**: En el archivo Ghost-test-kraken\Ghost-3.42\properties.json se define las propiedades usuario, password y url del ambiente donde se ejecutaran los escenarios de prueba
  - **Escenarios de pruebas** : Se encuentran en la ruta Ghost-Test\Ghost-test-kraken\Ghost-3.42\features. Nota: Para ejecutar el escenario solo debe existir un archivo .feature en ese directorio
  - **Screenshots**: Se encuentran en la ruta Ghost-3.42\screenshot\ donde podra encontrar una carpeta por módulo que reune varios escenarios de prueba
  
  **Ghost v5.18**
  - **Configuración**: En el archivo Ghost-test-kraken\Ghost-5.18\properties.json se define las propiedades usuario, password y url del ambiente donde se ejecutaran los escenarios de prueba
  - **Escenarios de pruebas** : Se encuentran en la ruta Ghost-Test\Ghost-test-kraken\Ghost-5.18\features 
  - **Screenshots**: Se encuentran en la ruta Ghost-5.18\screenshot\ donde podra encontrar una carpeta por módulo que reune varios escenarios de prueba
  
  
**2. Pruebas Playwright**
  
  **Ghost v3.42**
  - **Configuración**: En el archivo Ghost-test-Playwright\Ghost-3.42\config.cjs se define las propiedades usuario, password y url del ambiente donde se ejecutaran los escenarios de prueba
  - **Escenarios de pruebas** : Se encuentran en la ruta Ghost-Test\Ghost-test-Playwright\Ghost-3.42\ 
  - **Screenshots**: Se encuentran en la ruta Ghost-3.42\resultado\ donde podra encontrar una carpeta por módulo que reune varios escenarios de prueba
  
**Ghost v5.18**
  - **Configuración**: En el archivo Ghost-test-Playwright\Ghost-5.18\config.cjs se define las propiedades usuario, password y url del ambiente donde se ejecutaran los escenarios de prueba
  - **Escenarios de pruebas** : Se encuentran en la ruta Ghost-Test\Ghost-test-Playwright\Ghost-5.18\ 
  - **Screenshots**: Se encuentran en la ruta Ghost-5.18\resultado\ donde podra encontrar una carpeta por módulo que reune varios escenarios de prueba
  

**3. Pruebas VRT**

**3.1 Tags**
- En una consola de comando ubicarse en la ruta Ghost-Test\Ghost-PruebasDeRegresion desde el directorio utilizado en el punto anterior
- Ejecutar el comando npm install
- Ejecutar el comado node TagCrearNegativoVRTPlaywright.js (y TagCrearPositivoVRTPlaywright.js)
- Cuando finalice la ejecución ubicarse en la siguiente ruta Ghost-Test\Ghost-PruebasDeRegresion\results\playwright\
- Abrir la ultima carpeta generada - Validar que corresponda a la fecha de ejecución
- Dentro de esta carpeta se ubican las imagenes generadas resultado de la comparación
- Dentro de esa carpeta encontrará una carpeta report que contiene el reporte en html donde se muestraslas imagenes objetos de la comparación, la imagen resultante y la información resultado de la comparación usando Resemblejs
