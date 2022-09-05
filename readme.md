# Proyecto final Backend Coderhouse
# Segunda entrega

El proyecto pueder usar distintas instancias para la base de datos, las siguientes son las que se usaron en el desarrollo:
* Memoria
* FileSystem (.json)
* MongoDB
* Firebase

Solo necesita cambiar el valor de la variable `PERSISTENCE` en el archivo `.env`

## Variables de entorno
Renombrar el archivo **.env.template** a **.env** y completar las variables de entorno.
```
PORT=
MONGO_URL=
PERSITENCE= json|mongodb|firebase|memory
```

## Para correr el proyecto en modo desarrollo
```
# install dependencies
npm install

# run in dev mode on port 8080
npm run dev
```


## Para probar los endpoint de la API


Usando Postman, podrás probar los endpoints de la API.

Importar el archivo **"test/postman_test.json"** en el explorador de postman.


Algunos de los endpoints que podrás probar son:

```
/api/productos      - GET    - Lista todos los productos.
/api/productos/:id  - GET    - Detalle de un producto.
/api/productos/     - POST   - Crear un producto.
/api/productos/:id  - PUT    - Actualizar un producto.
/api/productos/:id  - DELETE - Eliminar un producto. 
```
(Algunos endpoint requerirán que se envie un token para poder acceder a ellos, por lo que podrás probarlos con un token válido o con un token inválido. El token válido es **"admin"**.)

```
/api/carrito                        - POST    - Crear un carrito y devuelve su id.
/api/carrito/:id                    - DELETE  - Vacia un carrito y lo elimina.
/api/carrito/:id/productos          - GET     - Muestra los productos de un carrito.
/api/carrito/:id/productos          - POST    - Agrega un producto a un carrito.
/api/carrito/:id/productos/:id_prod - DELETE  - Elimina un producto de un carrito.
```