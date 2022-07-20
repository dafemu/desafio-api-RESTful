import { getProductos, getProducto, setProducto, borrarProducto } from "./controller.mjs";
import express from 'express';

const { Router } = express;

const app = express();
const router = Router();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    console. log('GET request recibido');
    const productos = getProductos();
    res.status(200).json({
        result: 'Productos',
        ListadoProductos : productos,
    });
});

router.get('/:id', (req,res) => {
    console.log('GET request recibido con id');
    const id = Number(req.params.id);
    const producto = getProducto(id);
    res.send(producto);
});

router.post('/', (req,res) => {
    console.log('POST request recibido');
    const producto ={ 
        title: req.body.productoNombre,
        price: req.body.productoPrecio,
        thumbnail: req.body.productoImagen,
    };
    const newProducto = setProducto(producto);
    res.status(201).json({
        result: 'Producto Agregado',
        NuevoProducto: newProducto
    });
});

router.put('/:id', (req,res) => {
    console.log('PUT request recibido');
    const id = Number(req.params.id);
    const productoEncontrado = getProducto(id);
    productoEncontrado.title = req.body.productoNombre;
    productoEncontrado.price = req.body.productoPrecio;
    productoEncontrado.thumbnail = req.body.productoImagen;
    res.status(201).json({
        result: 'Producto Actualizado',
        id: req.params.id,
        ProductoActualizado : productoEncontrado,         
    });
});

router.delete('/:id', (req,res) => {
    console.log('DELETE request recibido');
    const id = Number(req.params.id);
    const productoBorrado = borrarProducto(id);
    res.status(200).json({
        result: 'Producto Borrado',
        id: req.params.id,
        ListadoProductosNuevo: productoBorrado,
    });
});

app.use('/api/productos', router);

const server = app.listen(8080, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));