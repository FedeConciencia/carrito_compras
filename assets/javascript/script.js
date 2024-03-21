const carrito = document.querySelector("#carrito");
const template = document.getElementById("template");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();


document.addEventListener('click', (e) => {

    if (e.target.dataset.fruta) {
        console.log("Presionaste el boton Agregar al Carro.");
        agregarCarrito(e);
    }

    if (e.target.dataset.quitar) {
        btnQuitar(e);
    }

    if (e.target.dataset.aumentar) {
        btnAumentar(e);
    }

    
})

let carritoObj = [];

const agregarCarrito = (e) => {

    console.log(e.target.dataset.fruta)

    const producto = {
        id: e.target.dataset.fruta,
        titulo: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    }

    //Verificamos si el array esta vacio return -1 o si existe agregado el producto:
    const index = carritoObj.findIndex((item) => item.id === producto.id);

    if (index === -1) {

        carritoObj.push(producto);

    } else {
        
        carritoObj[index].cantidad++;
        //carritoObj[index].precio = carritoObj[index].cantidad * producto.precio;

    }

    pintarCarrito();

};

const pintarCarrito = () => {

    carrito.textContent = "";

    carritoObj.forEach( item => {

        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;

        clone.querySelector(".btn-danger").dataset.quitar = item.id;
        clone.querySelector(".btn-success").dataset.aumentar = item.id;

        fragment.appendChild(clone);
    })

    carrito.appendChild(fragment);

    pintarFooter();

}

const pintarFooter = () => {

    footer.textContent = "";

    const total = carritoObj.reduce((acc, current) => acc + current.cantidad * current.precio, 0)
    
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector("span").textContent = total;

    fragment.appendChild(clone);

    footer.appendChild(fragment);

}

const btnAumentar = (e) => {
    console.log("me diste click aumentar", e.target.dataset.aumentar)

    carritoObj = carritoObj.map(item => {
        if (item.id === e.target.dataset.aumentar) {
            item.cantidad++;
        }

        return item;
    })

    pintarCarrito();
}

const btnQuitar = (e) => {
    console.log("me diste click quitar", e.target.dataset.quitar)

    carritoObj = carritoObj.filter(item => {
        if (item.id === e.target.dataset.quitar) {
            if (item.cantidad > 0) {
                item.cantidad--;

                if (item.cantidad === 0) {
                    return
                } else {
                    return item;
                }
            } else {
                return item;
            }
        }

        return item;
    })

    pintarCarrito();
}



