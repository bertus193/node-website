# HOSTIMG

## Indice

 1. CONFIGURACIÓN.
 2. Framework.
 2. Historias de Usuario.
 3. Ejemplos de CRUD.
 4. Paginación.
 5. Comandos utilizados.


----------
## 1. Configuración

***Importante:***

```Editar archivo mysql.js en framework con configuración local de la base de datos MySQL y utilizar backup.sql```

## 2. Framework

Para hacer más entendible el codigo se ha utilizado un framework para repetir en la menor medida de lo posible código además de separar todo por categorias.Para

### Auth

Finalidad: Controlar todo lo relacionado con los usuarios.

### Images

Finalidad: Controlar todo respecto las imagenes.
  - Portada: Las imagenes no superarán los 300px ni el 100% del ancho.
  - Detalle de imagen: Las imagenes no superarán los 370px ni el 100% del ancho.
  - Subir imagen: Solo se aceptará el formato PNG.

### Mysql

Finalidad: Control Base de datos.

### Paths

Finalidad: Posee todas las rutas disponibles para el usuario iniciada o sin iniciar la sesión.Finalidad


----------

## 3. Historias de usuario

Historia de usuario 1:
> La autentificación se realizará mediante la url /login (GET) que mostrará un formulario de acceso que enviará al usuario a /checkLogin (POST) cuya comprobación será:
 - Se genera un error en la base de datos: Error `Parece que ha habido algún error` y volverá a la pantalla de login.
 - El usuario no corresponde con ninguno de la base de datos: Error `Contraseña y/o login incorrectos` y volverá a la pantalla de login.
 - Todo es correcto: Guardará el token generado en `localStorage.token` y enviará al usuario a perfil.

Historia de usuario 2:
> Una vez se ha iniciado sesión se podrá ir al perfil desde el menú superior o pulsar cerrar sesión y salir en dicho menú.
> Si se cierra sesión reenviará a el formulario de inicio de sesión mostrando un mensaje de Éxito: `Has cerrado sesión correctamente` sobreescribiendo `localStorage.token` a null.

Historia de usuario 3:
> Si se desea acceder a parte privada o a sitios inexistentes:
 - En caso de intentar acceder a Perfil **sin haber iniciado sesión**  o cualquier otra parte de la web no autorizada renviará a login indicando en un error `Necesitas iniciar sesión`
 - En caso de acceder a alguna parte de la web inexistente mostrará un aviso de error 404.
 
Historia de usuario 4:
 > Si se desea ver la información de una imagen a detalle se deberá clickear la imagen o acceder desde la url `/images/URL-DE-IMAGEN`, una vez dentro:
 > - Si la imagen no existe: Mostrará un error `No existe dicha imagen`
 > - Si se accede a una imagen que ***sí*** existe mostrará la imagen y toda la información referente a dicha imagen.
 > Ejemplo:
 >> Accediendo a `/images/6lrjg` mostrará su nombre, autor, fecha ***en español*** y el número de *Me gusta*.

## 4. Ejemplos de CRUD

Primero habrá que dirigirse a /images/upload (GET) donde mostrará un formulario que reenviará a /images/upload (POST) el cuál comprobará la imagen y la subirá (Deberá ser PNG)

Una vez subida mostrará un enlace el cuál accediendo a la url /images/:enlace (GET) podrá ser visualizada o desde /images/lib/:enlace para verla directamente (GET)

Para editar una imagen se hará uso de /images/edit/ (PUT) indicando como variables la id y el nuevo nombre a la imagen que se le desee dar (id y nombre).Para

Para eliminar una imagen se usará /images/delete/:enlace (DELETE)

## 5. Paginación

Para paginación se usará la url origen '/' el cuál mostrará las últimas 10 imagenes subidas.

## 6. Comandos e información útil

- killall -9 node
- mysql -u root
- MYSQL PASS VACIA
- mysqldump -u root hostimg > backup.sql 
- npm install x
- Tests: mocha
- [Editor Markdown](https://stackedit.io/editor)
