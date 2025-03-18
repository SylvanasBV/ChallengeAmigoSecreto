class Sorteo {
    constructor(){
        this.amigo = [];
    }

    validarNombre(name){
        return name !== "" && isNaN(name);
    }

    agregarAmigo (name){
        if(!this.validarNombre(name)){
            alert('Por favor, ingrese un nombre válido, no solo números')
            return;
        }
        this.amigo.push(name);
        this.actualizarAmigo();
        console.log(this.amigo);
    }

    actualizarAmigo (){
        let listaAmigos = document.querySelector('#listaAmigos');
        listaAmigos.innerHTML = "";

        this.amigo.forEach((nameFriend)=>{
            let li = document.createElement('li');
            li.textContent = nameFriend;
            listaAmigos.appendChild(li)
            console.log("Agregado:", li); // Mostrar cada <li> agregado
        })
    }

    sortearAmigo () {

        if(this.amigo.length === 0){
            alert('No hay amigos en la lista para sortear');
            return null;
        }
        
        let randomFriend = Math.floor(Math.random()*this.amigo.length);
        return this.amigo[randomFriend];
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
            alert(`El amugo sorteado es: ${ganador}`);
        }
    }
)