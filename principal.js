var juego = new Phaser.Game(370,550,Phaser.CANVAS, 'bloque_juego');

var teclaArriba;
var teclaAbajo;
var personaje;
var fondoJuego;
var teclaDerecha;
var teclaIzquierda;
var sonidoFondo;

var estadoPrincipal={

	preload: function(){
		juego.load.image('fondo', 'img/pokemonfondo.jpg');
		juego.load.spritesheet('personaje', 'img/charizarsprite.png',64,64);
		juego.load.audio('sonido', 'sounds/pueblo_paleta.mp3');

	},

	create: function(){
		fondoJuego=juego.add.tileSprite(0,0,370,550, 'fondo');
		persona=juego.add.sprite(juego.width/2, juego.height/2,'personaje');
		persona.anchor.setTo(0.5);
		//Movimiento de personajes
		persona.animations.add('arriba', [12,13,14,15],5,true);
		persona.animations.add('abajo', [0,1,2,3],5,true);
		persona.animations.add('izquierda', [4,5,6,7],5,true);
		persona.animations.add('derecha', [8,9,10,11],5,true);

		//Limites del escenario
		juego.physics.startSystem(Phaser.Physics.ARCADE);
		juego.physics.arcade.enable(persona);
		persona.body.collideWorldBounds=true;

		
		// Inicializar y reproducir el sonido de fondo en bucle
        sonidoFondo = juego.add.audio('sonido');
        sonidoFondo.loop = true;  // Establece el sonido para que se repita en bucle
        // Espera a una interacción del usuario para iniciar el sonido
        juego.input.onDown.add(this.iniciarSonido, this);
	


		//Agregando mecanicas del juego
		teclaDerecha=juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		teclaIzquierda=juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		teclaArriba=juego.input.keyboard.addKey(Phaser.Keyboard.UP);
		teclaAbajo=juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);


	},

	iniciarSonido: function() {
        if (!sonidoFondo.isPlaying) {
            sonidoFondo.play();  // Reproduce el sonido de fondo al hacer clic o tocar la pantalla
        }
    },


	update: function(){
		fondoJuego.tilePosition.x-=1;
		if(teclaArriba.isDown){
			persona.position.y-=2;
			persona.animations.play('arriba');
		}else if(teclaAbajo.isDown){
			persona.position.y+=2;
			persona.animations.play('abajo');
		}else if(teclaIzquierda.isDown){
			persona.position.x-=2;
			persona.animations.play('izquierda');
		}else if(teclaDerecha.isDown){
			persona.position.x+=2;
			persona.animations.play('derecha');
		}

	}

}

juego.state.add('principal',estadoPrincipal);
juego.state.start('principal');