# HOSTIMG

## Indice
 1. Framework
 2. Vistas (views)
 3. Imagenes (images)
 4. Comandos necesarios

## Framework
-----
Para hacer más entendible el codigo se ha utilizado un framework para repetir en la menor medida de lo posible código además de separar todo por categorias.Para

### Auth

Finalidad: Controlar todo lo relacionado con los usuarios.

### Images

Finalidad: Controlar todo respecto las imagenes.

### Mysql

Finalidad: Control Base de datos.

```Editar archivo mysql.js en framework con configuración local y utilizar backup.sql```

### Paths

Finalidad: Posee todas las rutas disponibles para el usuario iniciada o sin iniciar la sesión.Finalidad

## Historias de usuario


> La autentificación se realizará mediante la url /login (GET) que mostrará un formulario de acceso que enviará al usuario a /checkLogin (POST) cuya comprobación será:
 - Se genera un error en la base de datos: Error `Parece que ha habido algún error` y volverá a la pantalla de login.
 - El usuario no corresponde con ninguno de la base de datos: Error `Contraseña y/o login incorrectos` y volverá a la pantalla >de login.
 - Todo es correcto: Guardará el token generado en `localStorage.token` y enviará al usuario a perfil.

---

> Una vez se ha iniciado sesión se podrá ir al perfil desde el menú superior o pulsar cerrar sesión y salir en dicho menú.
 Si se cierra sesión reenviará a el formulario de inicio de sesión mostrando un mensaje de Éxito: `Has cerrado sesión correctamente` sobreescribiendo `localStorage.token` a null.
---
> Si se desea acceder a parte privada o a sitios inexistentes:
 - En caso de intentar acceder a Perfil **sin haber iniciado sesión** reenviará a login indicando en un error `Necesitas iniciar sesión`

### CRUD imagenes

Primero habrá que dirigirse a /images/upload (GET) donde mostrará un formulario que reenviará a /images/upload (POST) el cuál comprobará la imagen y la subirá (Deberá ser PNG)

Una vez subida mostrará un enlace el cuál accediendo a la url /images/:enlace (GET) podrá ser visualizada o desde /images/lib/:enlace para verla directamente (GET)

Para editar una imagen se hará uso de /images/edit/ (PUT) indicando como variables la id y el nuevo nombre a la imagen que se le desee dar (id y nombre).Para

Para eliminar una imagen se usará /images/delete/:enlace (DELETE)

### Paginación

Para paginación se usará la url origen '/' el cuál mostrará las últimas 10 imagenes subidas.

## Comandos:

- killall -9 node
- mysql -u root
- MYSQL PASS VACIA
- mysqldump -u root hostimg > backup.sql 
- npm install x
- Tests: mocha