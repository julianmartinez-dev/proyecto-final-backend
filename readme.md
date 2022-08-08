# Primera entrega del proyecto final del curso de Backend de Coderhouse.
### Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base **'/productos'** y el otro con **'/carrito'**. El puerto de escucha será el **8080** para desarrollo y **process.env.PORT** para producción en glitch.com



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