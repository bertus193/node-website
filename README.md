# HOSTIMG


## Indice

 1. [CONFIGURACIÓN.](#1-configuraci%C3%B3n)
 2. [Framework.](#2-framework)
 2. [Historias de Usuario.](#3-historias-de-usuario)
 3. [Ejemplos de CRUD.](#4-ejemplos-de-crud)
 4. [Paginación.](#5-paginaci%C3%B3n)
 5. [Comandos utilizados.](#6-comandos-e-informaci%C3%B3n-%C3%BAtil)


----------
## 1. Configuración

***Importante:***

```Editar archivo mysql.js en framework con configuración local de la base de datos MySQL y utilizar backup.sql```

## 2. Framework

Para hacer más entendible el codigo se ha utilizado un framework para repetir en la menor medida de lo posible código además de separar todo por categorias.

### Auth

Finalidad: Controlar todo lo relacionado con los usuarios.

### Images

Finalidad: Controlar todo respecto las imagenes.

### Mysql

Finalidad: Control Base de datos.

### Paths

Finalidad: Posee todas las rutas disponibles para el usuario iniciada o sin iniciar la sesión.Finalidad


----------

## 3. Historias de usuario

*HdU1: Autentificación.*
> La autentificación se realizará desde cualquier página desde el menú `Inicar sesión` el cuál generará un HTML con React el cuál al clickear `Enviar` comprobará el usuario mediante una petición  (POST) mediante `fetch` cuya comprobación será:
 - Hay un error en la base de datos, mostrará: `Parece que ha habido algún error`.
 - El usuario no corresponde con ninguno de la base de datos mostrará el error: `Contraseña y/o login incorrectos`.
 - Todo es correcto: Guardará el token generado en `localStorage.token` y será iniciada la sesión **sin recargar** la página .

*HdU2: Perfil.*
> Una vez se ha iniciado sesión se podrá ir al perfil desde el menú superior o pulsar cerrar sesión y salir en dicho menú.
> Si se cierra sesión reenviará al usuario a la página principal.

*HdU3: Acceso no válido.*
> En caso de acceder a alguna parte de la web inexistente  o la cuál no se posee permisos mostrará un aviso de error 404.
 
*HdU4: Ver imagen.*
 > Si se desea ver la información de una imagen a detalle se deberá clickear la imagen o acceder desde la url `/images/URL-DE-IMAGEN`, una vez dentro:
 > - Si la imagen no existe: Mostrará un error `No existe dicha imagen`
 > - Si se accede a una imagen que **sí** existe mostrará la imagen y toda la información referente a dicha imagen.
 > Ejemplo:
 >> Accediendo a `/images/6lrjg` mostrará su nombre, autor, fecha **en español** y el número de *Me gusta*.

*HdU5: Subir imagen.*
>  Para subir una foto deberá clickear en el menú superior a `Subir imágenes` donde le llevará a una pagina donde subir la imagen.
>  - Si el formato del archivo no es `png` aparecerá el mensaje de error `Solo se puede utilizar el formato .png` al seleccionar el archivo.
>  - Si se sube el archivo correctamente lo subirá como anónimo a no ser que se haya iniciado sesión y deirigirá a `/images/URL-DE-IMAGEN` mostrando el mensaje éxito  `¡Enhorabuena! la imagen ha sido subida correctamente`

*HdU6: Borrar imagen.*
> Para borrar una imagen se deberá acceder al índice `/`. En la galería aparecerá un botón de borrar (Papelera). Al pulsar el botón te preguntará si estás seguro, al pulsar `Aceptar` te borrará la imagen y mostrará el mensaje de éxito `¡Enhorabuena! la imagen ha sido eliminada correctamente`.

*HdU7: Editar imagen.*
> Para borrar una imagen se deberá acceder al índice `/`. En la galería aparecerá un botón de editar (botón intermedio). Al pulsar el botón te reenviará a `/images/editar/URL-DE-IMAGEN` donde se podrá cambiar el título de la imagen pulsando `Editar`. Una vez pulsado mostrará el mensaje de éxito: `¡Enhorabuena! la imagen ha sido editada correctamente`.

## 4. Ejemplos de CRUD

Primero habrá que dirigirse a /images/upload (GET) donde mostrará un formulario que reenviará a /images/upload (POST) el cuál comprobará la imagen y la subirá (Deberá ser PNG)

Una vez subida mostrará un enlace el cuál accediendo a la url /images/:enlace (GET) podrá ser visualizada o desde /images/lib/:enlace para verla directamente (GET)

Para editar una imagen se hará uso de /images/edit/ (PUT) indicando como variables la id y el nuevo nombre a la imagen que se le desee dar (id y nombre).Para

Para eliminar una imagen se usará /images/delete/:enlace (DELETE)

## 5. Paginación

Para paginación se usará la url origen '/' el cuál mostrará todas las imagenes subidas.

## 6. Comandos e información útil

- killall -9 node
- mysql -u root
- MYSQL PASS VACIA
- mysqldump -u root hostimg > backup.sql 
- npm install x
- Tests: mocha
- [Editor Markdown](https://stackedit.io/editor)



