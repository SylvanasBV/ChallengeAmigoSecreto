// Se crea una clase de sorteo con sus respectivos métodos
class Sorteo {

    // Declara las variables principales que se usarán en todo el programa
    constructor(){
        this.friend = [];
        this.friendSelected = [];
    }

    // Valida que el nombre no esté vacío y no sea solo números
    validarNombre(name){
        return name !== "" && isNaN(name);
    }

    // Agrega un amigo a la lista si pasa la validación
    agregarAmigo(name){
        if (!this.validarNombre(name)){
            alert('Por favor, ingrese un nombre válido, no solo números');
            return;
        }
        // Agrega el nombre al arreglo
        this.friend.push(name);
        // Actualiza la vista de la lista
        UI.actualizarLista(this.friend);
    }

    // Realiza el sorteo asegurando que no se repitan nombres hasta que todos sean sorteados
    sortearAmigo(){
        // Verifica si hay amigos agregados, si no, no puede hacer el sorteo
        if (this.friend.length === 0){
            alert('No hay amigos en la lista para sortear');
            return null;
        }
        // Verifica que el tamaño del arreglo de los amigos no sea menor que el de los seleccionados
        if (this.friendSelected.length !== this.friend.length) {
            // Se genera un número aleatorio para escoger un nombre al azar
            let randomFriend = Math.floor(Math.random() * this.friend.length);
            // Si el nombre ya se encuentra en el arreglo de seleccionados, se vuelve a ejecutar la función
            if (this.friendSelected.includes(this.friend[randomFriend])){
                return this.sortearAmigo();
            }
            // Si no, lo agrega al arreglo de seleccionados y lo muestra en la interfaz
            else {
                let selectedFriend = this.friend[randomFriend];
                this.friendSelected.push(selectedFriend);
                UI.mostrarResultado(selectedFriend);
            }
        } 
        // En caso de que ya se hayan sorteado todos los amigos, informa que ya han sido seleccionados
        else {
            alert('Todos los amigos han sido sorteados');
        }
    }
}

// Clase para manejar la UI, separando la lógica de negocio del DOM
class UI {

    // Se encarga de agregar elementos "li" a la etiqueta "ul" en el HTML
    static actualizarLista(friends){
        let listaAmigos = document.querySelector('#listaAmigos');
        listaAmigos.innerHTML = "";
        // Para cada elemento en el arreglo de amigos, se agrega una etiqueta 'li' con el nombre de cada uno
        friends.forEach((friend) => {
            // Se crea el elemento
            let li = document.createElement('li');
            // Se agrega el texto
            li.textContent = friend;
            // Se adiciona a la etiqueta como hijo
            listaAmigos.appendChild(li);
        });
    }

    // Se encarga de mostrar el resultado del seleccionado por un período de tiempo específico
    static mostrarResultado(friend){
        // Se declaran los elementos necesarios de las etiquetas
        let selectList = document.querySelector('#resultado');
        let listFriends = document.querySelector('#listaAmigos');
        let drawButton = document.querySelector('.button-draw');

        // Se establecen los estados iniciales de las etiquetas
        selectList.style.display = 'block';
        listFriends.style.display = 'none';
        selectList.innerHTML = '';
        drawButton.setAttribute('disabled', true);

        // Se crea el elemento 'li'
        let li = document.createElement('li');
        // Se ingresa el texto en la etiqueta
        li.textContent = `El amigo sorteado es: ${friend}`;
        // Se añade como hijo de la lista de resultados
        selectList.appendChild(li);

        // Función que permite esperar un lapso de tiempo para ejecutar la siguiente sentencia de código
        setTimeout(() => {
            // Se restablecen las propiedades de las etiquetas
            listFriends.style.display = 'block';
            drawButton.removeAttribute('disabled'); // Habilita el botón nuevamente
            selectList.style.display = 'none';
        }, 3000); // Se demora en ejecutar 3 segundos
    }
}

// Instancia el sorteo
const sorteo = new Sorteo();

// Genera el primer EventListener para detectar cuando el botón sea presionado
document.querySelector('.button-add').addEventListener('click',
    // Crea una función que añade un amigo  
    function nuevoAmigo(){
        // Obtiene el valor del input
        let input = document.querySelector('#amigo');
        // Agrega el amigo
        sorteo.agregarAmigo(input.value);
        // Restablece el input a vacío
        input.value = '';
    }
);

// Genera el segundo EventListener para detectar cuando el botón sea presionado
document.querySelector('.button-draw').addEventListener('click',
    // Crea una función que ayuda a sortear un amigo
    function escogerAmigo(){
        // Realiza el sorteo de un amigo
        sorteo.sortearAmigo();
    }
);
