//Utile pour les tests :
//alert("Début d'execution du JS");
//	console.log( "bas: " + flechebas + "\n" );

// empêche la redondance du message d'erreur et indique le gagnant
var x=0;
var gagnant=false;

//1000 px largeur et 500 px hauteur
var context = document.getElementById('theCanvas').getContext('2d');

//definition variables : INDISPENSABLE POUR LE MOUVEMENT!!
//Balle
var xballe=490;
var yballe=240;
var diam=10;

//Raquette manipulé par l'utilisateur
var xraquette=5;
var yraquette=200;
var	wraquette=35;
var hraquette=100;

//Raquette controlé automatiquement par l'IA
var xraquettebis=959;
var yraquettebis=200;
var	wraquettebis=35;
var hraquettebis=100;


//Variable pour le déplacement x et y : INDISPENSABLE QUAND LA BALLE TOUCHE UN MUR
var deplacementx=9;
var deplacementy=7;

//Variable permettant de savoir si les flèches du clavier sont utilisées ou non

var flechehaut=true;
var flechebas=true;

/*
MARCHE !
BeginPath : permmet de débuter le dessin	
context.beginPath();
Permet de modifier la couleur du rectangle
context.strokeStyle = "#000000";
//Permet de tracer un rectangle
// 2 premier : coordonnées x et y puis largeur et hauteur
context.arc(xballe, yballe, 10, 0, Math.PI*2, true);
// rempli "l'intérieur" de la boule (== stroke mais "rempli")
context.fill();
//indique qu'on a finit de dessiner
context.closePath();
//Permet d'afficher le dessin sur la page web (que les contours)
context.stroke();
*/

// On va crée 2 fonctions : une pour créer les raquettes et une autre pour créer les cercles

function raquette(posx,posy,width,height) {
	context.beginPath();
	if (posx < 500 ) {context.fillStyle = "#0000FF"; } else { context.fillStyle = "#00FF00"; }
	context.rect(posx,posy,width,height);
	context.closePath();
	context.fill();
}

function balle(posx,posy,diam) {
	context.beginPath();
	context.fillStyle = "#000000";
	context.arc(posx,posy,diam,0,Math.PI*2, true);
	context.closePath();
	context.fill();
}

//Création des fonctions permettant de manipuler les événement clavier (pour la manipulation du pong)

//Quand on appuie sur des touches du clavier
function appuye(e) {
	if (e.keyCode == 38) { 
		flechehaut = true;
	}
	
	else if (e.keyCode == 40){
		flechebas = true;	
	}
}

//quand on relache un bouton
function relache(e) {
	if (e.keyCode == 38	) { 
		flechehaut = false;
	}
	
	if (e.keyCode == 40){
		flechebas = false;	
	}
}

//initialisation du terrain
balle(xballe,yballe,diam);
raquette(xraquette,yraquette,wraquette,hraquette);
raquette(xraquettebis,yraquettebis,wraquettebis,hraquettebis);

//Récupère les événements du clavier régulièrement
document.onkeyup=appuye;
document.onkeydown=relache;

//Setintervable (fonction, répété tous les X)
var jeu = setInterval(animate, 1000/30);

// On crée une fonction qui va gérer TOUTE l'animation du pong    
function animate()
	{
		//ATTENTION : changer 1000 et 500 par context.width et context.height (bug!)
		// Clean le canvas
		context.clearRect ( 0 , 0 , 1000, 500);
		if (flechehaut== true) {
			yraquette+=5;
		}
		
		if (flechebas==true){
			yraquette-=5;
		}
		//On modifie les valeurs de x et y dans le canvas pour le déplacement
		// Pour tout ce qui est élimination il ne faut que se concentrer sur x
		
		//Gère le rebond sur la raquette du joueur (celle qu'on manipule)
		if (xballe+deplacementx< xraquette+wraquette & xballe+deplacementx>xraquette) {
			if (yballe+deplacementy > yraquette && yballe+deplacementy < yraquette+hraquette) {
			deplacementx=(deplacementx)*-1; }
		}  
		
		// Gère le rebond sur la raquette de l'IA
		if (xballe+deplacementx< xraquettebis+wraquettebis & xballe+deplacementx>xraquettebis) {
			if (yballe+deplacementy > yraquettebis && yballe+deplacementy < yraquettebis+hraquettebis) {
			deplacementx=(deplacementx)*-1; }
		}  
		
		//Indique que la balle a dépassé la raquette du joueur -> Perdu
		if (xballe+deplacementx < xraquette || xballe+deplacementx > xraquettebis+wraquettebis)  
		{	
			if (xballe+deplacementx < xraquette) { gagnant= "l'ordinateur"; } else { gagnant="le joueur"; }
			if (x==0) { alert("La partie est terminé le gagnant est "+ gagnant); x++; }
			ClearIntervale(jeu);
		}
		if (yballe+deplacementy > 494 || yballe+deplacementy < 6) {
			deplacementy=(deplacementy)*-1;}

		xballe+=deplacementx;
		yballe+=deplacementy;
		yraquettebis=yballe-22;
		// On retrace, ça se fait vite donc il y a une impression de mouvement !
		balle(xballe,yballe,diam);
		raquette(xraquette,yraquette,wraquette,hraquette);
		raquette(xraquettebis,yraquettebis,wraquettebis,hraquettebis);

	}