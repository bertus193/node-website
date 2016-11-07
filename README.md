# HOSTIMG

Dividido en:

1. División Hostimg
2. Historias de usuario.

1.1 Framework
1.2 Vistas (views)
1.3 Imagenes (images)

1.1 Framework

Para hacer más entendible el codigo se ha utilizado un framework para repetir en la menor medida de lo posible código además de separar todo por categorias.Para

1.1.1 Auth

Finalidad: Controlar todo lo relacionado con los usuarios.

1.1.2 Images

Finalidad: Controlar todo respecto las imagenes.

1.1.3 Mysql

Finalidad: Control Base de datos.

<addr>Editar archivo mysql.js en framework con configuración local y utilizar backup.sql</addr>

1.1.4 Paths

Finalidad: Posee todas las rutas disponibles para el usuario iniciada o sin iniciar la sesión.Finalidad

## Historias de usuario

La autentificación se realizará mediante la url /login (GET) que mostrará un formulario de acceso que enviará al usuario a /checkLogin (POST) 
recogiendo los datos, comprobandolo y devolviendo el token necesario para poder navegar por la parte privada de la web (guardandolo en la base de datos).recogiendo

Con dicho token podrá accederse a /perfil (GET) indicando mediante una query el token proporcionado anteriormente, y en caso de coincidir se mostrará un mensaje de éxito de inicio de sesión.

### CRUD imagenes

Primero habrá que dirigirse a /images/upload (GET) donde mostrará un formulario que reenviará a /images/upload (POST) el cuál comprobará la imagen y la subirá (Deberá ser PNG)

Una vez subida mostrará un enlace el cuál accediendo a la url /images/:enlace (GET) podrá ser visualizada o desde /images/lib/:enlace para verla directamente (GET)

Para editar una imagen se hará uso de /images/edit/ (PUT) indicando como variables la id y el nuevo nombre a la imagen que se le desee dar (id y nombre).Para

Para eliminar una imagen se usará /images/delete/:enlace (DELETE)

### Paginación

Para paginación se usará la url origen '/' el cuál mostrará las últimas 10 imagenes subidas.

## Comandos:

killall -9 node


mysql -u root

MYSQL PASS VACIA

mysqldump -u root hostimg > backup.sql 

npm install x


Tests: mocha