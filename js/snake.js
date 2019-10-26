// Variables globales
var velocidad = 80;
var tamano = 10;

class objeto {
    constructor(){
        this.tamano = tamano;
    }

    choque(obj){
        var difx = Math.abs(this.x - obj.x);
        var dify = Math.abs(this.y - obj.y);

        if(difx >= 0 && difx < tamano && dify >= 0 && dify < tamano){
            return true;
        }
        return false;
    }
}

class Cola extends objeto {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    dibujar(contexto) {
        contexto.fillStyle = "#0000FF";
        contexto.fillRect(this.x, this.y, this.tamano, this.tamano);
    }

    setxy(x, y){
        this.x = x;
        this.y = y;
    }
}

class Comida extends objeto {
    constructor(){
        super();
        this.x = this.generar();
        this.y = this.generar();
    }
    generar (){
        var num = (Math.floor(Math.random() * 59)) * tamano;
        return num;
    }
    colocar(){
        this.x = this.generar();
        this.y = this.generar();
    }
    dibujar(contexto){
        contexto.fillStyle = "#FF0000";
        contexto.fillRect(this.x, this.y, this.tamano, this.tamano);
    }
}

// Objetos del juego
var cabeza =  new Cola(20,20);
var comida = new Comida();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;

function movimiento() {
    var nx = cabeza.x + xdir;
    var ny = cabeza.y + ydir;
    cabeza.setxy(nx, ny);
}

function control(event) {
    var cod = event.keyCode;
    if(ejex){
        if(cod == 38){
            ydir -= tamano;
            xdir = 0;
            ejex = false;
            ejey = true;
        }
        if(cod == 40){
            ydir += tamano;
            xdir = 0;
            ejex = false;
            ejey = true;
        }
    }
    if(ejey){
        if(cod == 37){
            ydir = 0;
            xdir -= tamano;
            ejex = true;
            ejey = false;
        }
        if(cod == 39){
            ydir = 0;
            xdir += tamano;
            ejex = true;
            ejey = false;
        }
    }
}

function dibujar () {
    var canvas = document.getElementById("workspace");
    var contexto = canvas.getContext("2d");
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    // Aqui va todo el dbujo
    // contexto.fillRect(10, 10, 100, 100);
    cabeza.dibujar(contexto);
    comida.dibujar(contexto);
}

// Funcion de renderizado
function main() {
    dibujar();
    movimiento();
    if(cabeza.choque(comida)){
        comida.colocar();
    }
}
setInterval("main()", velocidad);

