class Sorteo {

    
    constructor(){
        this.friend = [];
        this.friendSelected = [];
    }

    validarNombre(name){
        return name !== "" && isNaN(name);
    }

    agregarAmigo (name){
        if(!this.validarNombre(name)){
            alert('Por favor, ingrese un nombre válido, no solo números')
            return;
        }
        this.friend.push(name);
        this.actualizarAmigo();
        console.log(this.friend);
    }

    actualizarAmigo (){
        let listaAmigos = document.querySelector('#listaAmigos');
        listaAmigos.innerHTML = "";

        this.friend.forEach((nameFriend)=>{
            let li = document.createElement('li');
            li.textContent = nameFriend;
            listaAmigos.appendChild(li)
            console.log("Agregado:", li); // Mostrar cada <li> agregado
        })
    }

    sortearAmigo () {

        if(this.friend.length === 0){
            alert('No hay amigos en la lista para sortear');
            return null;
        }
        if (this.friendSelected.length !== this.friend.length) {
            let randomFriend = Math.floor(Math.random()*this.friend.length);
            if (this.friendSelected.includes(this.friend[randomFriend])){
                return this.sortearAmigo()
            }
            else{


                this.friendSelected.push(this.friend[randomFriend]);
                let selectList = document.querySelector('#resultado');
                let listFriends = document.querySelector('#listaAmigos');
                let drawButton = document.querySelector('.button-draw');
                
                selectList.style.display = 'block';
                listFriends.style.display = 'none';
                selectList.innerHTML = '';
                drawButton.setAttribute('disabled', true);

                let li = document.createElement('li');
                li.textContent = `El amigo sorteado es: ${this.friend[randomFriend]}`;
                selectList.appendChild(li);
                console.log("Seleccionado:", li); // Mostrar cada <li> agregado

                setTimeout(() => {
                    listFriends.style.display = 'block';
                    drawButton.removeAttribute('disabled'); // Habilita el botón de nuevo
                    selectList.style.display = 'none';


                },3000)
            }}
        else {
            return alert('Todos los amigos han sido sorteados');
        }
    }
}

const sorteo = new Sorteo();

document.querySelector('.button-add').addEventListener('click',
    function nuevoAmigo(){
        let input = document.querySelector('#amigo');
        sorteo.agregarAmigo(input.value);
        input.value = '';
    }
)

document.querySelector('.button-draw').addEventListener('click',
    function escogerAmigo(){
        let ganador = sorteo.sortearAmigo();
        if (ganador){
            alert(`El amigo sorteado es: ${ganador}`);
        }
    }
)