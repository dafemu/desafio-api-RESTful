export let productos = [];

export function getProductos(){
    return productos;
}

export function getProducto(id){
    return productos.find(prod => prod.id === id) || { error: 'producto no encontrado' };
}

export function setProducto(objProducto) {
    if(productos.length == 0){
        objProducto.id = 1;
    }else{
        let id = productos[productos.length-1].id
        objProducto.id = id + 1;
    }
    productos.push(objProducto);

    return productos;
}

export function borrarProducto(id){
    return productos.filter(prod => prod.id !== id);
}