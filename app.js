document.addEventListener('DOMContentLoaded', () => {
    const productos = document.querySelectorAll('.agregar-carrito');
    const carritoItems = document.getElementById('carrito-items');
    const totalCarrito = document.getElementById('total-carrito');
    let carrito = [];

    productos.forEach(producto => {
        producto.addEventListener('click', (e) => {
            const productoElement = e.target.closest('.producto');
            const id = productoElement.getAttribute('data-id');
            const name = productoElement.getAttribute('data-name');
            const price = parseFloat(productoElement.getAttribute('data-price'));

            agregarAlCarrito(id, name, price);
        });
    });

    function agregarAlCarrito(id, name, price) {
        const itemExistente = carrito.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({ id, name, price, cantidad: 1 });
        }
        actualizarCarrito();
    }

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            total += item.price * item.cantidad;
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} x${item.cantidad} - $${item.price * item.cantidad}`;
            carritoItems.appendChild(itemElement);
        });
        totalCarrito.textContent = total.toFixed(2);
    }

    document.getElementById('cartButton').addEventListener('click', () => {
        const carritoSection = document.getElementById('carrito');
        carritoSection.style.display = carritoSection.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Pedido realizado con éxito');
        carrito = [];
        actualizarCarrito();
    });
});