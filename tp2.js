//Fichier: tp2.js
//Auteur:  Melodie Diêu Thanh Verroeulst et Farzin Faridfar
//IFT1015 - Travail Pratique #2: Jeu de Poker Shuffle - Avril 2015

//Le Bogue: 
//Les fonctions Quinte et Quint Flush ne fonctionnent pas
//avec l'as au début de la séquence.

function init(){

     document.getElementById("b").innerHTML = 
   '<table>\
      <tr>\
	<td>\
	<button onclick="init();">Nouvelle Partie</button><br><br>\
	<td></td>\
	<td id="53" onclick="clic(53);">\
	<img src="cards/back.svg"></td>\
	<td></td>\
      </tr>\
    </table>'
	+ grilleHTML(6,6);

    //Par cette boucle on remplie les grilles par les cartes vides
    for (var i=0; i<30; i+=6){
	for (var j=0; j<5; ++j){
	    document.getElementById(i+j).innerHTML=
		"<img src=\"cards/empty.svg\">";
	    document.getElementById(i+j).value = 52;
	}
    }	
    document.getElementById(35).innerHTML = +0; 

    //Fonction grilleHTML(m,n):
    //Creér une grille de m rangées et n collonnes
    function grilleHTML(m,n){
	//k: pour la numérotation de l'"id"
	var k = 0;   
	var grille = "\<table>\n";
	for (var i = 0; i < m; ++i){
            //Les deux conditions pour i et j est considérée pour
	    //separer les grilles qui contienne les cartes
	    //(avec l'evénement d'onclick) et des grilles 
	    //qui contienne
	    //les résultats (sans l'evénement d'onclick)
	    if (i == m-1){
		grilleHTML= grille + "<tr>\n";
		for (var j = 0; j < n; ++j){
		    grille = grille + "<td id=\""+ k +"\"></td>\n";	
		    k = k+1;
		}
		grille = grille + "</tr>\n";
            }
            else{
		grilleHTML= grille + "<tr>\n";
		for (j = 0; j < n; ++j){
		    if (j == n-1){
			grille = grille + "<td id=\""+ k +"\"\"></td>\n";	
			k = k+1;
		    }else{
			grille = grille + "<td id=\""+ k +"\"\
			onclick=\"clic("+ k +")\"></td>\n";	
			k = k+1;
		    }
		}
		grille = grille + "</tr>\n";  
            }

	}
	grille = grille + "</table>";
	return grille;
    };

banqCarte = 0;
};

//Dans cette partie du code on crée un paquet de carte mélagée
var paquet = Array(52);
for (var i = 0; i < paquet.length; ++i){
    paquet[i] = i;
}
for (i = 51; i>(52/2); --i){
    var cartAle = Math.floor(i*Math.random());
    var temp = paquet[i];
    paquet[i] = paquet[cartAle];
    paquet[cartAle] = temp;
}

//Fonction carte(cartCode): Convertir les nombres (les codes) du
//tableau de paquet aux leurs équivalents noms de cartes
function carte(carteCode){
    var carteVal = [2,3,4,5,6,7,8,9,10,"J","Q","K","A","empty","back"];
    var carteCoul = ["C","D","H","S"];
    var val = carteVal[Math.floor(carteCode/4)];
    var coul = carteCoul[Math.floor(carteCode%4)];
    return val+coul;
};
/*function testCarte(){
    assert(carte("2") == "2H");
    assert(carte("24") == "8C");
    assert(carte("41") == "QD");
    assert(carte("51") == "AS");
};
testCarte();*/

//idPrec: id de la carte précédent
//banqCart: nombre de carte suivent dans le paquet    
var idPrec = 0;
var banqCarte = 0;

//Fonction clic(id): le corps du code qui fait un action selon le id
//qu'elle reçoit après que l'utilisateur clique sur une carte
function clic(id){
    
    //Ici chaqu'une des cartes du paquet s'affiche
    if (id == 53){
	document.getElementById(id).style.backgroundColor="lime";
	document.getElementById(53).innerHTML = 
	    "<img src=\"cards/" + carte(paquet[banqCarte]) + ".svg\">";
	
	banqCarte += 1;

	//Pour désactiver la fonction onClick sur le paquet
	//après qu'il soit exécuté au début du jeu pour afficher
	//la première carte
	document.getElementById(53).onclick = null;
    }

    //Cette partie distribue les cartes de paquet sur les endroits
    //vides de la grille
    else if(document.getElementById(id).innerHTML ==
	    "<img src=\"cards/empty.svg\">" && 
	    document.getElementById(idPrec).style.backgroundColor
	     !="lime" && document.getElementById(53).style.backgroundColor
	     =="lime"){
	document.getElementById(53).style.backgroundColor=
	    "lime";
	document.getElementById(id).innerHTML = 
	document.getElementById(53).innerHTML;
	document.getElementById(id).value = paquet[banqCarte-1];
	document.getElementById(53).innerHTML = 
	    "<img src=\"cards/" + carte(paquet[banqCarte]) + ".svg\">";
	idPrec = id;
	banqCarte += 1;
	
	calculPoints();
    }

    //Pour changer les cartes dans la grille

    //La première boucle choisit la carte par changer sa couleur
    //en lime
    else if(document.getElementById(idPrec).style.backgroundColor
	     !="lime" && document.getElementById(id).innerHTML !=
	    "<img src=\"cards/empty.svg\">"
	    ){
		document.getElementById(53).style.backgroundColor=
		    "transparent";
		document.getElementById(id).style.backgroundColor="lime";
		idPrec = id;
	    }

    //La deuxième boucle, changer la carte qui est déjà sélectionnée
    //(la carte avec le background en lime)
    else if(document.getElementById(idPrec).style.backgroundColor
	     =="lime"){
	document.getElementById(idPrec).style.backgroundColor =
	     "transparent";
	document.getElementById(53).style.backgroundColor =
	    "lime";

	//Changement des cartes séléctionnés
	var tempCarte = document.getElementById(id).innerHTML;
	document.getElementById(id).innerHTML = 
	document.getElementById(idPrec).innerHTML;
	document.getElementById(idPrec).innerHTML = tempCarte;
	
	//Changement des valuers HTML de cartes séléctionnés
	var tempVal = document.getElementById(id).value;
	document.getElementById(id).value = 
	document.getElementById(idPrec).value;
	document.getElementById(idPrec).value = tempVal;

	idPrec = id;
	calculPoints();
     }

    //Cette condition déclare la fin du jeu avec les points gangés
    if (banqCarte == 26){
	alert("Votre pointage final est " + 
	      document.getElementById(35).innerHTML);
	init();
    }

};


//Fonction calculPoint(): calculer les point de chaque rangé et
//de chaque colonne
var tabCarteH = [];
var tabCarteV = [];
function calculPoints(){

    //Pour parcourir dans les rangées et les colonnes de la grille
    var alignements = [{pas:+1, departs: [0,6,12,18,24]},
		  {pas: +6, departs:[0,1,2,3,4]}];

    var pasH = alignements[0].pas;
    var departsH = alignements[0].departs;

    var pointTotalH = 0;
   
    for (var i=0; i<departsH.length; ++i){
	var posH = departsH[i];
	
	tabCarteH = [];
	for(var j=0; j<5; ++j){
	    if(document.getElementById(posH+j*pasH).value != 52){
		tabCarteH.push(document.
			       getElementById(posH+j*pasH).value);
	    }
	}
	tabCarteH = trier(tabCarteH);
	
	document.getElementById(posH+5).innerHTML =
	    rangeResultat(tabCarteH);
  
	if (document.getElementById(posH+5).innerHTML != ""){
	   pointTotalH = pointTotalH + +document.getElementById(posH+5).innerHTML;
       }
	        
    }
    
    var pasV = alignements[1].pas;
    var departsV = alignements[1].departs;

    var pointTotalV = 0;    

    for (var i=0; i<departsV.length; ++i){
	var posV = departsV[i];
	
	tabCarteV = [];
	for(var j=0; j<5; ++j){
	    if(document.getElementById(posV+j*pasV).value != 52){
		tabCarteV.push(document.
			       getElementById(posV+j*pasV).value);
	    }
	}
	tabCarteV = trier(tabCarteV);
	
	document.getElementById(posV+30).innerHTML =
	   colloneResultat(tabCarteV);

	if (document.getElementById(posV+30).innerHTML != ""){
	    pointTotalV = pointTotalV + +document.getElementById(posV+30).innerHTML;
	} 
    }

    document.getElementById(35).innerHTML = pointTotalH + pointTotalV;

};

//Fonction rangeResultat(tab): calculer le résultat de chaque
//rangée et retourner le point le plus grand ou 'vide' si le point
//est égal à zéro
function rangeResultat(tab){
    var resultatH = [];
    resultatH.push(paireDlPaire(tabCarteH));
    resultatH.push(brelan(tabCarteH));
    resultatH.push(quinte(tabCarteH));
    resultatH.push(flush(tabCarteH));
    resultatH.push(fullHouse(tabCarteH));
    resultatH.push(carre(tabCarteH));
    resultatH.push(quinteFlush(tabCarteH));
    resultatH.push(quinteFlushRoyale(tabCarteH));
    
    resultatH = trier(resultatH);

    if(resultatH[resultatH.length-1] == 0){
	   return "";
    }else{
	return resultatH[resultatH.length-1];
    }
};
/*function testrangeResultat(){
    assert(rangeResultat([0,4,16,28,48]) == "");
    assert(rangeResultat([15,23,32,33,40]) == "2");
    assert(rangeResultat([16,17,32,33,40]) == "5");
    assert(rangeResultat([16,17,18,33,40]) == "10");
    assert(rangeResultat([16,20,25,30,32]) == "15");
    assert(rangeResultat([0,4,16,28,48]) == "20");
    assert(rangeResultat([1,3,41,42,43]) == "25");
    assert(rangeResultat([16,17,18,19,40]) == "50");
    assert(rangeResultat([3,7,11,15,19]) == "75");
    assert(rangeResultat([32,36,40,44,48]) == "100");
};
testColloneResultat();*/

//Fonction colloneResultat(tab): calculer le résultat de chaque
//collone et retourner le point le plus grand ou 'vide' si le point
//est égal à zéro
function colloneResultat(tab){
    var resultatV = [];
    resultatV.push(paireDlPaire(tabCarteV));
    resultatV.push(brelan(tabCarteV));
    resultatV.push(quinte(tabCarteV));
    resultatV.push(flush(tabCarteV));
    resultatV.push(fullHouse(tabCarteV));
    resultatV.push(carre(tabCarteV));
    resultatV.push(quinteFlush(tabCarteV));
    resultatV.push(quinteFlushRoyale(tabCarteV));
    
    resultatV = trier(resultatV);

    if(resultatV[resultatV.length-1] == 0){
	   return "";
    }else{
	return resultatV[resultatV.length-1];
    }
};

/*function testColloneResultat(){
    assert(colloneResultat([0,4,16,28,48]) == "");
    assert(colloneResultat([15,23,32,33,40]) == "2");
    assert(colloneResultat([16,17,32,33,40]) == "5");
    assert(colloneResultat([16,17,18,33,40]) == "10");
    assert(colloneResultat([16,20,25,30,32]) == "15");
    assert(colloneResultat([0,4,16,28,48]) == "20");
    assert(colloneResultat([1,3,41,42,43]) == "25");
    assert(colloneResultat([16,17,18,19,40]) == "50");
    assert(colloneResultat([3,7,11,15,19]) == "75");
    assert(colloneResultat([32,36,40,44,48]) == "100");
};
testColloneResultat();*/

//Fonction paireDlPaire(tab): une paire de meme valeur
//ou deux paires chaqu'une de deux valeurs différentes
function  paireDlPaire(tab){
    tab = tabCarteVal(tab);
    var tabFreq = freqElem(tab);
    var compteur = 0;
    for (var i=0; i<tabFreq.length; ++i){
	if (tabFreq[i].freq == 2){
	    ++compteur;
	}
    }
    //paire
    if (compteur == 1){
	return 2;
    }
    //double paire
    else if (compteur == 2){
	return 5;
    }
return 0;  
};
/*function testPaireDlPaire(){
    assert(paireDlPaire([0,4,16,28,48]) == "0");
    assert(paireDlPaire([15,23,32,33,40]) == "2");
    assert(paireDlPaire([16,17,32,33,40]) == "5");
};
testPaireDlPaire();*/

//Fonction brelan(tab): trois cartes de meme valeur
function  brelan(tab){
    tab = tabCarteVal(tab);
    var tabFreq = freqElem(tab);

    for (var i=0; i<tabFreq.length; ++i){
	if (tabFreq[i].freq == 3){
	    return 10;
	}
    }
    
    return 0;

};
/*function testBrelan(){
    assert(brelan([0,4,16,28,48]) == "0");
    assert(brelan([15,23,32,33,40]) == "0");
    assert(brelan([16,17,32,33,40]) == "0");
    assert(brelan([16,17,18,33,40]) == "10");
};
testBrelan();*/

//Fonction quinte(tab): cinq cartes qui suivent
function quinte(tab){
    if (tab.length < 5){
	return 0;
    }else{
    tab = tabCarteVal(tab);
    for (var i=0; i<tab.length-1; ++i){
	if(tab[i]+1 != tab[i+1]){
	    return 0;
	}
    }
    }
return 15;
};
/*functiotun testquinte(){
    assert(quinte([0,4,16,28,48]) == "0");
    assert(quinte([16,20,25,30,32]) == "15");
    //l'as à la fin
    assert(quinte([32,37,40,47,50]) == "15");
    //l'as au début (il ne fonctionne pas!!)
    assert(quinte([1,5,8,13,50]) == "15");
};
testquinte();*/

//Fonction flush(tab): toutes les cartes de meme couleurs
function flush(tab){

    if (tab.length < 5){
	return 0;
    }else{
	tab = tabCarteCoul(tab);
	for (var i=1; i<tab.length; ++i){
	    if(tab[0] != tab[i]){
	    return 0;
	    }
	}
	return 20;
    }
};
/*function testFlush(){
    assert(flush([0,4,16,28,48]) == "20");
    assert(flush([16,20,25,30,32]) == "0");
    assert(flush([16,17,18,33,40]) == "0");
};
testFlush();*/

//Fonctio fullHouse(tab): trois cartes de meme valeur et
// une paire de meme valeur
function  fullHouse(tab){
    if (tab.length < 5){
	return 0;
    }else{ 
	tab = tabCarteVal(tab);
	var tabFreq = freqElem(tab);
	
	for (var i=0; i<tabFreq.length; ++i){
	    if (tabFreq[i].freq == 3 && tabFreq.length ==2){
		return 25;
	    }
	}
    }
    return 0;
};
/*function testFullHouse(){
    assert(fullHouse([0,4,16,28,48]) == "0");
    assert(fullHouse([1,5,8,13,50]) == "0");
    assert(fullHouse([1,3,41,42,43]) == "25");
};
testFullHouse();*/

//Fonction carre(tab): quatre cartes de meme valeur
function carre(tab){
    tab = tabCarteVal(tab);
    var tabFreq = freqElem(tab);

    for (var i=0; i<tabFreq.length; ++i){
	if (tabFreq[i].freq == 4){
	    return 50;
	}
    }
    
    return 0;  
};
/*function testCarre(){
    assert(carre([0,4,16,28,48]) == "0");
    assert(carre([16,17,32,33,40]) == "0");
    assert(carre([16,17,18,33,40]) == "0");
    assert(carre([16,17,18,19,40]) == "50");
};
testCarre();*/

//Fonctio quinteFlush(tab): cinq cartes de meme couleur qui suivent
function quinteFlush(tab){
    if(flush(tab) == 20 && quinte(tab) == 15){
	return 75;	
    }
return 0;
};
/*function testQuinteFlush(){
    assert(testQuinteFlush([0,4,16,28,48]) == "0");
    assert(testQuinteFlush([16,20,25,30,32]) == "0");
    assert(testQuinteFlush([32,37,40,47,50]) == "0");
    //l'as au début (il ne fonctionne pas!!)
    assert(testQuinteFlush([1,5,8,13,50]) == "0");
    assert(testQuinteFlush([3,7,11,15,19]) == "75");
};
testQuinteFlush();*/

//Fonctio quinteFlushRoyale(tab): l'as, le roi, la dame le valet
// et le 10 d'une meme couleur
function quinteFlushRoyale(tab){
    if(quinteFlush(tab) == 75 && (tab[4]>>2) == 9){
	return 100;	
    }
return 0;
};
/*function testQuinteFlushRoyale(){
    assert(testQuinteFlushRoyale([0,4,16,28,48]) == "0");
    assert(testQuinteFlushRoyale([32,37,40,47,50]) == "0");
    assert(testQuinteFlushRoyale([3,7,11,15,19]) == "0");
    assert(testQuinteFlushRoyale([32,36,40,44,48]) == "100");
};
testQuinteFlushRoyale();*/


//Fonction trier(tab): prend un tab et trie les valeur
//en ordre croissant
function trier(tab) {
    var echange;
    do {
	echange = false;

	for (var i=0; i<tab.length-1; i++) {
	    if (tab[i+1] < tab[i]) {
		var temp = tab[i];
		tab[i] = tab[i+1];
		tab[i+1] = temp;
		echange = true;
	    }
	}
    } while (echange);
    return tab;
};
/*function testTrier(){
    assert(trier([0,16,4,48,28]) == "0,4,16,28,48");
    assert(trier([29,13,33,9,45]) == "9,13,29,33,45");
    assert(trier([10,2,20,5,75]) == "2,5,10,20,75");
};
testTrier();*/


//Fonction tabCarteCoul(tab): calculer les couleurs des cartes
//dans le tableau "tab" qui contient les codes de cartes
function tabCarteCoul(tab){
    var tabTemp = [];
    for (var i=0; i<tab.length; ++i){
	tabTemp.push(tab[i]%4);
    }
    return tabTemp;
};
/*function testTabCarteCoul(){
    assert(tabCarteCoul([0,16,4,48,28]) == "0,0,0,0,0");
    assert(tabCarteCoul([37,36,4,33,28]) == "1,0,0,1,0");
    assert(tabCarteCoul([6,7,8,9,28]) == "2,3,0,1,0");
};
testTabCarteCoul();*/

//Fonction tabCarteVal(tab): calculer les valeurs des cartes
//dans le tableau "tab" qui contient les codes de cartes
function tabCarteVal(tab){
    var tabTemp =[];
    for (var i=0; i<tab.length; ++i){
	tabTemp.push(tab[i]>>2);
    }
    return tabTemp;
};
/*function testTabCarteVal(){ 
    assert(tabCarteVal([0,16,4,48,28]) == "0,4,1,12,7");
    assert(tabCarteVal([37,36,4,38,28]) == "9,9,1,9,7");
    assert(tabCarteVal([17,16,4,31,28]) == "4,4,1,7,7");
    assert(tabCarteVal([4,8,12,16,20]) == "1,2,3,4,5");
};
testTabCarteVal();*/

//Fonction ferquElem(tab): elle prend un tableau et returne
//la fréquence de chaque élément du tableau
function freqElem(tab){

    var resultat = [];
    var vus = [];
    for (i = 0; i < tab.length; ++i){
        var pos = vus.indexOf(tab[i]);
        if (pos >= 0){
            resultat[pos].freq++;
        }else {
            vus.push(tab[i]);
            resultat.push({ele: tab[i], freq:1});
        }
    }
    return resultat;
};

var assert = require('assert');
