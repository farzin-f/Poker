
//1. Le bouton ne marche pas!!!


function init(){
   document.getElementById("b").innerHTML = 
   '<table>\
      <tr>\
	<td>\
	<button id="100" onclick="clic(100);">\
        Nouvelle Partie</button>\
	</td>\
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
};

//Fonction grilleHTML(m,n):
//Creér une grille de m rangées et n collonnes
function grilleHTML(m,n){
    //k: pour la numérotation de l'"id"
    var k = 0;   
    var grille = "\<table>\n";
    for (var i = 0; i < m; ++i){
        //Les deux conditions pour i et j est considérée pour
	//separer les grilles qui contienne les cartes
	//(avec l'evénement d'onclick) et des grilles qui contienne
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

//idPrec: id de la carte précédent
//banqCart: nombre de carte suivent dans le paquet    
var idPrec = 0;
var banqCart = 0;

//Fonction clic(id): le corps du code qui fait un action selon le id
//qu'elle reçoit après que l'utilisateur clique sur une carte
function clic(id){
    //alert(id);
    if (id == 100){
    init();
    }
    
    //Cette partie distribue les cartes de paquet sur les endroits
    //vides de la grille
    if (id == 53){
	document.getElementById(id).style.backgroundColor="lime";
	document.getElementById(idPrec).style.backgroundColor=
	    "transparent";
	document.getElementById(id).innerHTML = 
	    "<img src=\"cards/" + carte(paquet[banqCart]) + ".svg\">";
	
	banqCart += 1;
	//idPrec = id;
    }

    //Pour mettre les cartes dans la grille
    else if(document.getElementById(id).innerHTML ==
	    "<img src=\"cards/empty.svg\">" && 
	    document.getElementById(idPrec).style.backgroundColor
	     !="lime"){
	document.getElementById(53).style.backgroundColor=
	    "transparent";
	document.getElementById(id).innerHTML = 
	document.getElementById(53).innerHTML;
	document.getElementById(id).value = paquet[banqCart-1];
	//document.getElementById(53).innerHTML =
	  //  "<img src=\"cards/back.svg\">";
	document.getElementById(53).innerHTML = 
	    "<img src=\"cards/" + carte(paquet[banqCart]) + ".svg\">";
	idPrec = id;
	banqCart += 1;
	//document.getElementById(5).innerHTML =
	  //  "Calcul";
	calculPoints();
    }

    //Pour changer les cartes dans la grille

    //La première boucle choisit la carte par changer sa couleur
    //en lime
    else if(document.getElementById(idPrec).style.backgroundColor
	     !="lime" && document.getElementById(id).innerHTML !=
	    "<img src=\"cards/empty.svg\">"
	    ){
	document.getElementById(id).style.backgroundColor="lime";
	idPrec = id;
	}

    //La deuxième boucle, changer la carte qui est déjà sélectionnée
    //(la carte avec le background en lime)
    else if(document.getElementById(idPrec).style.backgroundColor
	     =="lime"){
	document.getElementById(idPrec).style.backgroundColor =
	     "transparent";
	var tempCarte = document.getElementById(id).innerHTML;
	document.getElementById(id).innerHTML = 
	document.getElementById(idPrec).innerHTML;
	document.getElementById(idPrec).innerHTML = tempCarte;
	
	var tempVal = document.getElementById(id).value;
	document.getElementById(id).value = 
	document.getElementById(idPrec).value;
	document.getElementById(idPrec).value = tempVal;

	idPrec = id;
	calculPoints();
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

    var pasV = alignements[1].pas;
    var departsV = alignements[1].departs;
    
    var pointTotal = 0;
   
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
	   pointTotal = pointTotal + document.getElementById(posH+5).innerHTML;
       }
	        
    }
    

  for (var i=0; i<departsV.length; ++i){
	var posV = departsV[i];
	
	tabCarteV = [];
	for(var j=0; j<5; ++j){
	    if(document.getElementById(posV+j*pasV).value != 52){
		tabCarteH.push(document.
			       getElementById(posV+j*pasV).value);
	    }
	}
	tabCarteV = trier(tabCarteV);
	
	document.getElementById(posV+30).innerHTML =
	   colloneResultat(tabCarteV);
	        
    }

    document.getElementById(35).innerHTML = pointTotal;

};

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

function  carre(tab){
    tab = tabCarteVal(tab);
    var tabFreq = freqElem(tab);

    for (var i=0; i<tabFreq.length; ++i){
	if (tabFreq[i].freq == 4){
	    return 50;
	}
    }
    
    return 0;  
};


function quinteFlush(tab){
    if(flush(tab) == 20 && quinte(tab) == 15){
	return 75;	
    }
return 0;
};

function quinteFlushRoyale(tab){
    if(quinteFlush(tab) == 75 && (tab[0]>>2) == 9){
	return 100;	
    }
return 0;
};

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

//Fonction tabCarteCoul(tab): calculer les couleurs des cartes
//dans le tableau "tab" qui contient les codes de cartes
function tabCarteCoul(tab){
    var tabTemp = [];
    for (var i=0; i<tab.length; ++i){
	tabTemp.push(tab[i]%4);
    }
    return tabTemp;
};

//Fonction tabCarteVal(tab): calculer les valeurs des cartes
//dans le tableau "tab" qui contient les codes de cartes
function tabCarteVal(tab){
    var tabTemp =[];
    for (var i=0; i<tab.length; ++i){
	tabTemp.push(tab[i]>>2);
    }
    return tabTemp;
};

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

