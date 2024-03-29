fbStat();

function staMS(response) {
	firebase.auth().onAuthStateChanged(user=>{ 
		if(user || response.status=='connected'){
			mainFuncSite();
		} else{
			if(!document.getElementById('login')) {
				loginVisible();
			}
		}
	});
}

function fbStat() {
	if(typeof(FB) !== 'undefined') {
		FB.getLoginStatus(function(response) {
			staMS(response);
		});
	} else {
		staMS('undefined');	
	}
}

function logOut() {
	firebase.auth().signOut();
	console.log('logged out');
	if (FB.getAccessToken() != null) {
            FB.logout(function(response) {
                
            });
        }
	destField2('wrapper2');
	destField2('menu-wrap');
	if(!document.getElementById('login')) {
		loginVisible();
	}
	
	
}

function createContainer() {
	var createBlockCont = document.createElement("div");
	createBlockCont.setAttribute("id", "container");
	createBlockCont.setAttribute("class", "container");
	document.body.appendChild(createBlockCont);
	
	var createBlockWrapper = document.createElement("div");
	createBlockWrapper.setAttribute("class", "wrapper");
	createBlockCont.appendChild(createBlockWrapper);
	
	var createBlockFormMain = document.createElement("div");
	createBlockFormMain.setAttribute("class", "form-main");
	createBlockFormMain.setAttribute("id", "form-main");
	createBlockWrapper.appendChild(createBlockFormMain);
	
}

function sendFBLogin() {
	if(typeof(FB) !== 'undefined') {
		FB.login(function(response){
			destField('form-main', 'login'); 
			fbStat();
		});
	}
}

function sendLogin() {
		var email = document.getElementById("stRegEmail").value;
		var pass = document.getElementById("stRegPass").value;
		var checkValueEmail=checkEmail(email, 'logMailMesg');
		var checkValuePass=checkPass(email, 'logPassMesg');
		if(checkValueEmail==1 && checkValuePass==1) {
			firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
			destField('form-main', 'login'); 
		}
}

function sendRegister() {
		var email = document.getElementById("stRegEmail").value;
		var pass = document.getElementById("stRegPass").value;
		var checkValueEmail=checkEmail(email, 'logMailMesg');
		var checkValuePass=checkPass(email, 'logPassMesg');
		if(checkValueEmail==1 && checkValuePass==1) {
			firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
			loginVisible();
		}
}

function checkEmail(wartosc, nazwaId) {
	var wzor = /[a-z0-9\-\_\.]+\@{1}[a-z0-9]+\.{1}[a-z0-9]+/;
	var wynikTestu=wzor.test(wartosc);
	if (wynikTestu==false) {
		showCheckedValue(wynikTestu, nazwaId, 'Wprowadź poprawny adres e-mail');
		return 0;
	} else {
		showCheckedValue(wynikTestu, nazwaId, '');
		return 1;
	}
}

function checkPass(wartosc, nazwaId) {
	if (wartosc.length < 8) {
		var wynikTestu=0;
		showCheckedValue(wynikTestu, nazwaId, 'Wprowadź hasło składające się z min. ośmiu znaków');
		return 0;
	} else {
		var wynikTestu=1;
		showCheckedValue(wynikTestu, nazwaId, '');
		return 1;
	}
}

function showCheckedValue(wartosc, nazwaId, tekst) {
	if (wartosc==0) {
		document.getElementById(nazwaId).innerHTML=tekst;
	} else {
		document.getElementById(nazwaId).innerHTML='';
	}
}
  
function destField(pFieldName, chFieldName) {
	var pElem = document.getElementById(pFieldName);
	if(document.getElementById(chFieldName)) {
		var chElem = document.getElementById(chFieldName);
		pElem.removeChild(chElem);
	}
}

function destField2(chFieldName) {
	if(document.getElementById(chFieldName)) {
		var chElem = document.getElementById(chFieldName);
		document.body.removeChild(chElem);
	}
}

function registerVisible() {
	if ( !document.getElementById('container') ) {
		createContainer();
	}
	destField('form-main', 'login'); 	
	var cTag1 = document.createElement('div');
	cTag1.setAttribute('id', 'register');
	cTag1.setAttribute('class', 'visible');
	cTag1.innerHTML = '<div class="form-header ui-corner-all" data-role="header"><h1>Register</h1></div><p><input type="email" id="stRegEmail"  name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendRegister" class="btn" onclick="sendRegister()">Register</button></p><p class="form-footer">Have account? <button id="btnChangeLogin" class="btn-footer" onclick="loginVisible()">Log In</button></p>';
	document.getElementById('form-main').appendChild(cTag1);
}

function loginVisible() {
	if ( !document.getElementById('container') ) {
		createContainer();
	}
	destField('form-main', 'register'); 
	var cTag1 = document.createElement('div');
	cTag1.setAttribute('id', 'login');
	cTag1.setAttribute('class', 'visible');
	cTag1.innerHTML = '<div class="form-header " data-role="header"><h1>Login</h1></div><p><input type="email" id="stRegEmail" name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendLogin" class="btn" onclick="sendLogin()">Login</button></p><p><button id="btnSendFBLogin" class="btn" onclick="sendFBLogin()">Facebook login</button></p><p class="form-footer">Don\'t have account? <button id="btnChangeRegister" class="btn-footer" onclick="registerVisible()">Register</button></p>';
	document.getElementById('form-main').appendChild(cTag1);
}



function mainFuncSite() {
	destField2('container');
	var createBlock1 = document.createElement("div");
	createBlock1.setAttribute("class", "menu-wrap");
	document.body.appendChild(createBlock1);
	
	var createInput1 = document.createElement("input");
	createInput1.setAttribute("class", "toggler");
	createInput1.setAttribute("type", "checkbox");
	createBlock1.appendChild(createInput1);
	
	var createBlock2 = document.createElement("div");
	createBlock2.setAttribute("class", "hamburger");
	createBlock1.appendChild(createBlock2);
	
	var createBlock3 = document.createElement("div");
	createBlock3.setAttribute("class", "menu");
	createBlock1.appendChild(createBlock3);
	
	var createBlock4 = document.createElement("div");
	createBlock3.appendChild(createBlock4);
	
	var createUl1 = document.createElement("ul");
	createBlock4.appendChild(createUl1);
	
	var createUi1 = document.createElement("li");
	createUl1.appendChild(createUi1);
	
	var createA1 = document.createElement("a");
	createA1.setAttribute("href", "#");
	createA1.setAttribute("onclick", "logOut()");
	createA1.innerHTML="Wyloguj";
	createUi1.appendChild(createA1);
	
	var createBlock5 = document.createElement("div");
	createBlock5.setAttribute("class", "wrapper2");
	createBlock5.setAttribute("id", "wrapper2");
	document.body.appendChild(createBlock5);
	
	var createBlock6 = document.createElement("div");
	createBlock6.setAttribute("class", "search-bar");
	createBlock6.setAttribute("id", "search-bar");
	createBlock5.appendChild(createBlock6);
	
	var createH41 = document.createElement("h4");
	createH41.innerHTML="Wybierz rodzaj lokalizacji miejsca:";
	createBlock6.appendChild(createH41);
	
	var createLabel1 = document.createElement("label");
	createBlock6.appendChild(createLabel1);
	
	var createInput2 = document.createElement("input");
	createInput2.setAttribute("type", "radio");
	createInput2.setAttribute("name", "rodzMiejsce");
	createInput2.setAttribute("id", "wybLista");
	createInput2.setAttribute("value", "wybLista");
	createInput2.setAttribute("onclick", "checkChecked(this.value)");
	createLabel1.appendChild(createInput2);
	
	var createSpan1 = document.createElement("span");
	createSpan1.innerHTML="Wpisz nazwę";
	createLabel1.appendChild(createSpan1);
	
	var createLabel2 = document.createElement("label");
	createBlock6.appendChild(createLabel2);
	
	var createInput3 = document.createElement("input");
	createInput3.setAttribute("type", "radio");
	createInput3.setAttribute("name", "rodzMiejsce");
	createInput3.setAttribute("id", "wybMap");
	createInput3.setAttribute("value", "wybMap");
	createInput3.setAttribute("onclick", "checkChecked(this.value)");
	createLabel2.appendChild(createInput3);
	
	var createSpan2 = document.createElement("span");
	createSpan2.innerHTML="Wybierz z mapy";
	createLabel2.appendChild(createSpan2);
	
	var createLabel3 = document.createElement("label");
	createBlock6.appendChild(createLabel3);
	
	var createInput4 = document.createElement("input");
	createInput4.setAttribute("type", "radio");
	createInput4.setAttribute("name", "rodzMiejsce");
	createInput4.setAttribute("id", "wybGPS");
	createInput4.setAttribute("value", "wybGPS");
	createInput4.setAttribute("onclick", "checkChecked(this.value)");
	createLabel3.appendChild(createInput4);
	
	var createSpan3 = document.createElement("span");
	createSpan3.innerHTML="GPS";
	createLabel3.appendChild(createSpan3);
	
	
	var createBlock7 = document.createElement("div");
	createBlock7.setAttribute("class", "map");
	createBlock7.setAttribute("id", "map");
	createBlock5.appendChild(createBlock7);
	
	var createBlock8 = document.createElement("div");
	createBlock8.setAttribute("class", "info");
	createBlock8.setAttribute("id", "info");
	createBlock5.appendChild(createBlock8);
	
	var createBlock9 = document.createElement("div");
	createBlock9.setAttribute("class", "wiki");
	createBlock9.setAttribute("id", "wiki");
	createBlock5.appendChild(createBlock9);
}

function checkChecked(wartosc) {
	if (wartosc=="wybLista") {
		createWLoc('search-bar');
		document.getElementById("wybMap").removeAttribute("checked");
		document.getElementById("wybGPS").removeAttribute("checked");
	} else if (wartosc=="wybMap") {
		createBMap('search-bar');
		document.getElementById("wybGPS").removeAttribute("checked");
		document.getElementById("wybLista").removeAttribute("checked");
	} else  if (wartosc=="wybGPS") {
		getLocGPS();
		document.getElementById("wybLista").removeAttribute("checked");
		document.getElementById("wybMap").removeAttribute("checked");
	}
}

function getLocGPS() {
	destField('search-bar', 'wyborMiejsce');
	destField('search-bar', 'wyborMapa');
	destField('search-bar', 'wyborGPSK');
	destField('search-bar', 'wyborKategorii');
	destField('search-bar', 'wyborPodkategorii');
	var parentIdGetMain=document.getElementById('search-bar');
	var createBlockMap = document.createElement("div");
	createBlockMap.setAttribute("id", "wyborGPS");
	parentIdGetMain.appendChild(createBlockMap);
	var createBlockC = document.createElement("div");
	createBlockC.setAttribute("id", "wyborGPSK");
	createBlockMap.appendChild(createBlockC);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
		var createBlockP = document.createElement("p");
		createBlockP.innerHTML='Brak dostępu do GPS'
		createBlockMap.appendChild(createBlockP);
	}
}

function showPosition(position) {
	var lat = position.coords.latitude; 
	var lon = position.coords.longitude;
	
	var element = document.getElementById('wyborGPSK');
	element.innerText =  "Twoje współrzędne geograficzne: "+lat+" "+ lon;
	var createBlockH1 = document.createElement("input");
	createBlockH1.setAttribute("id", "coor1");
	createBlockH1.setAttribute("type", "hidden");
	createBlockH1.setAttribute("value", lat);
	element.appendChild(createBlockH1);
	var createBlockH2 = document.createElement("input");
	createBlockH2.setAttribute("id", "coor2");
	createBlockH2.setAttribute("type", "hidden");
	createBlockH2.setAttribute("value", lon);
	element.appendChild(createBlockH2);
	createKategory('search-bar');
}

function createBMap(parentId) {
	destField('search-bar', 'wyborMiejsce');
	destField('search-bar', 'wyborMapa');
	destField('search-bar', 'wyborGPSK');
	destField('search-bar', 'wyborKategorii');
	destField('search-bar', 'wyborPodkategorii');
	var parentIdGetMain=document.getElementById('search-bar');
	var createBlockMap = document.createElement("div");
	createBlockMap.setAttribute("id", "wyborMapa");
	parentIdGetMain.appendChild(createBlockMap);
	var createBlockP = document.createElement("h4");
	createBlockP.innerHTML='Wybierz miejsce na mapie'
	createBlockMap.appendChild(createBlockP);
	var createBlockC = document.createElement("div");
	createBlockC.setAttribute("id", "wyborMapK");
	createBlockMap.appendChild(createBlockC);
	showMapSetView();
	
}

function showMapPoly() {
	var polyFeature = new ol.Feature({
		geometry: new ol.geom.Point([19.129808, 50.618671]),
		projection: 'EPSG:4326'
	
	}); 
	return polyFeature;
}

function showMapVector() {
	var polyFeature = showMapPoly();
	var vectorLayer = new ol.layer.Vector({
	    source: new ol.source.Vector({
		features: [polyFeature]
	    })
	});
	return vectorLayer;
}

function showMapOSML() {
	var osmLayer = new ol.layer.Tile({
	source: new ol.source.OSM()
	});
	return osmLayer;
}

function showMapView() {
	var view = new ol.View({
	projection: 'EPSG:4326',
	zoom: 18
	});
	view.setCenter([19.128499, 50.617803]);
	return view;
}


function showMapGenMap() {
	var osmLayer = showMapOSML();
	var vectorLayer = showMapVector();
	var view = showMapView();

		var map = new ol.Map({
			target: 'wyborMapa',
			view: view,
			layers: [ osmLayer,vectorLayer]
		});
		return map;
}

function showMapSetView() {
	var map = showMapGenMap();
	var view = showMapView();
	map.setView(view);
	
	var addMap = document.getElementById('wyborMapa');
	 addMap.addEventListener('click', function(){getCorMap(map), createKategory('search-bar')});
}

function getCorMap(nowaMapa) {
	var polyFeature = showMapPoly();
	var map = nowaMapa;
	var getCoorM;
		var geometry = polyFeature.getGeometry();
		var coordinate = geometry.getCoordinates();
		
		
		map.on('click', function(evt){
			getCoorM = evt.coordinate;
			var i = 0;
			var tablica=[];
			for (x in getCoorM) {
			tablica[i]=getCoorM[x];
			i++;
		}
		
			var element = document.getElementById('wyborMapK');
			element.innerText =  "Współrzędne geograficzne wybranego punktu: "+tablica[1]+" "+tablica[0];
			var createBlockH1 = document.createElement("input");
			createBlockH1.setAttribute("id", "coor1");
			createBlockH1.setAttribute("type", "hidden");
			createBlockH1.setAttribute("value", tablica[1]);
			element.appendChild(createBlockH1);
			var createBlockH2 = document.createElement("input");
			createBlockH2.setAttribute("id", "coor2");
			createBlockH2.setAttribute("type", "hidden");
			createBlockH2.setAttribute("value", tablica[0]);
			element.appendChild(createBlockH2);
		});
		
		
};	

function createWLoc(parentId) {
	destField(parentId, 'wyborMiejsce');
	destField(parentId, 'wyborMapa');
	destField('search-bar', 'wyborGPSK');
	destField('search-bar', 'wyborKategorii');
	destField('search-bar', 'wyborPodkategorii');
	var parentIdGetMain=document.getElementById(parentId);
	var createBlock = document.createElement("div");
	createBlock.setAttribute("id", "wyborMiejsce");
	parentIdGetMain.appendChild(createBlock);
	var createSentence = document.createElement("h4");
	createSentence.innerHTML='Wprowadź nazwę miejscowości'
	createBlock.appendChild(createSentence);
	var createField = document.createElement("input");
	createField.setAttribute("type", "text");
	createField.setAttribute("name", "nameLoc");
	createField.setAttribute("id", "WLoc");
	createField.setAttribute("onblur", "createKategory('search-bar')");
	createBlock.appendChild(createField);
}

function createKategory(parentId) {
	destField(parentId, 'wyborKategorii'); 
	var parentIdGetMain=document.getElementById(parentId);
	var createBlock = document.createElement("div");
	createBlock.setAttribute("id", "wyborKategorii");
	parentIdGetMain.appendChild(createBlock);
	var createSentence = document.createElement("h4");
	createSentence.innerHTML='Wybierz kategorię'
	createBlock.appendChild(createSentence);
		
	var categories = [ "artwork_type", "historic", "museum", "tourism" ];
		
	var createSelect = document.createElement("select");
	createSelect.setAttribute("name", "nazwaKategorii");
	createSelect.setAttribute("id", "nazwaKategorii");
	createBlock.appendChild(createSelect);
	categories.forEach(wyswietlKategorie);
}

function wyswietlKategorie(wartosc) {
	var createOption = document.createElement("option");
	createOption.setAttribute("value", wartosc);
	createOption.setAttribute("id", "opt"+wartosc);
	createOption.setAttribute("onclick", "createSubKategory(this.value, 'search-bar')");
	createOption.innerHTML=wartosc;
	var parentIdGet=document.getElementById('nazwaKategorii');
	parentIdGet.appendChild(createOption);
}

function createSubKategory(nazwaKategorii, parentId) {
	destField(parentId, 'wyborPodkategorii'); 
	var parentIdGetMain=document.getElementById(parentId);
	var createBlock = document.createElement("div");
	createBlock.setAttribute("id", "wyborPodkategorii");
	parentIdGetMain.appendChild(createBlock);
	var createSentence = document.createElement("h4");
	createSentence.innerHTML='Wybierz podkategorię'
	createBlock.appendChild(createSentence);
	
	if(document.getElementById('WLoc')) {
		var nazwaMiasta=document.getElementById('WLoc').value;
		pobierzPodkategorie1(nazwaKategorii, nazwaMiasta, createBlock) ;
	} else if (document.getElementById('coor1') && document.getElementById('coor2')) {
		var lat = document.getElementById('coor1').value;
		var lon = document.getElementById('coor2').value;
		pobierzPodkategorie2(nazwaKategorii, lat, lon, createBlock) ;
	}
}

function pobierzPodkategorie1(nazwaKategorii, nazwaMiasta, parentId) {
	
	var pobPod = new XMLHttpRequest();
	pobPod.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var dane=this.responseText;
			var daneIlosc=dane.length;
			var wynik=CSVDoTablicy(dane, '', daneIlosc);
			podKatSel(wynik, parentId);
		}
	};
	pobPod.open("GET", "https://www.overpass-api.de/api/interpreter?data=[out:csv('"+nazwaKategorii+"')][timeout:25];(area[name='"+nazwaMiasta+"'];)-%3E.searchArea;(node['"+nazwaKategorii+"'~'.*'](area.searchArea);relation['"+nazwaKategorii+"'~'.*'](area.searchArea););out%20body;", true);
	pobPod.send();
}

function pobierzPodkategorie2(nazwaKategorii, lat, lon, parentId) {
	
	var pobPod = new XMLHttpRequest();
	pobPod.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var dane=this.responseText;
			var daneIlosc=dane.length;
			var wynik=CSVDoTablicy(dane, '', daneIlosc);
			podKatSel(wynik, parentId);
		}
	};
	pobPod.open("GET", "https://www.overpass-api.de/api/interpreter?data=[out:csv(%27"+nazwaKategorii+"%27)][timeout:25];rel[%27"+nazwaKategorii+"%27](around:20000,%20"+lat+",%20"+lon+");out%20body;%3E;out%20skel%20qt;", true);
	pobPod.send();
}

function CSVDoTablicy(daneCSV, delimiter, iloscZnakow) {
	var nDelimiter='';
	var nowaLinia='\n';
	var cudzyslow = '\"';
	var zCudzyslow = 0;
	var i;
	var koniecDanych='';
	var znak = daneCSV.charAt(i);
	var tablicaWiersz = [];
	var tablicaKolumna = [];
	var zdanie = '';

	
	if (delimiter == undefined || delimiter.length == 0) {
		nDelimiter="";
	} else {
		nDelimiter=delimiter;
	}
	var ostatCzlon = iloscZnakow - 1;
	
	for (i = 0;  i < iloscZnakow; i++) {
		znak = daneCSV.charAt(i);
		var ciag = ciag + znak;
			if (znak ==  nowaLinia) {
				tablicaKolumna[tablicaKolumna.length]=zdanie + "\n";
				tablicaWiersz[tablicaWiersz.length]=tablicaKolumna.toString();
				if ( i == ostatCzlon ) {
						return tablicaWiersz;
				}
				tablicaKolumna.splice(0,tablicaKolumna.length);
				zdanie='';
				
			} else if (znak == cudzyslow && zCudzyslow==0) {
				zCudzyslow=1;
			} else if (znak != cudzyslow && zCudzyslow==1) {
				if (znak != nowaLinia || znak != nDelimiter) {
					zdanie += znak;
				}
			} else if (znak == cudzyslow && zCudzyslow==1) {
				zCudzyslow=0;
			} else if (znak == nDelimiter && zCudzyslow==0 && znak != '') {
				tablicaKolumna[tablicaKolumna.length]=zdanie;
				zdanie='';
			} else if (zCudzyslow==0 && (znak == '  ' || znak == '\t' || znak == '\r')) {

			} else if (zCudzyslow==0 && (znak != nowaLinia || znak != nDelimiter)) {
					zdanie += znak;
			}
		
	}
}

function podKatSel(tablica, parentId) {
	var createSelect = document.createElement("select");
	createSelect.setAttribute("name", "nazwaPodkategorii");
	createSelect.setAttribute("id", "nazwaPodkategorii");
	createSelect.setAttribute("size", "3");
	parentId.appendChild(createSelect);
	tablica.forEach(podKatOptGen);
}

function podKatOptGen(wartosc) {
	var dane_wartosc = wartosc;
	var dane_mod = dane_wartosc.trim();
	var createOption = document.createElement("option");
	createOption.setAttribute("value", dane_mod);
	createOption.setAttribute("onclick", "pobierzListaObiektow(this.value, 'info')");
	createOption.innerHTML=wartosc;
	var parentIdGet=document.getElementById('nazwaPodkategorii');
	parentIdGet.appendChild(createOption);
}



function pobierzListaObiektow(nazwaPodkategorii, parentId) {
	
	if (document.getElementById('WLoc')) {
		var nazwaMiasta=document.getElementById('WLoc').value;
	}
	var nazwaKategorii=document.getElementById('nazwaKategorii').value;
	
	if (document.getElementById('coor1') && document.getElementById('coor2')) {
		var lat = document.getElementById('coor1').value;
		var lon = document.getElementById('coor2').value;
	}
	var pobPod = new XMLHttpRequest();
	pobPod.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var objJSON = JSON.parse(this.responseText);
			var objJElem = objJSON.elements;
			 jToA(objJElem)
		}
	};
	if (document.getElementById('WLoc')) {
		pobPod.open("GET", "https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];(area[name='"+nazwaMiasta+"'];)-%3E.searchArea;(node['"+nazwaKategorii+"'='"+nazwaPodkategorii+"'](area.searchArea);relation['"+nazwaKategorii+"'='"+nazwaPodkategorii+"'](area.searchArea););out%20body;", true);
	} else if (document.getElementById('coor1') && document.getElementById('coor2')) {
		pobPod.open("GET", "https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25];node['"+nazwaKategorii+"'='"+nazwaPodkategorii+"'](around:1000, "+lat+", "+lon+");relation['"+nazwaKategorii+"'='"+nazwaPodkategorii+"'](around:1000, "+lat+", "+lon+");out%20body;%3E;out%20skel%20qt;", true);
	}
	pobPod.send();
}

function jToA(objekt) {
	var tablicaObjId = []
	var tablicaNazwa = [];
	var tablicaWikipedia = [];
	var tablicaLat = [];
	var tablicaLon = [];
	
	for ( x in objekt) {
		var objL1=objekt[x];
		if ( typeof objL1.tags != "undefined" ) {
			tablicaObjId[tablicaObjId.length] = objL1.id;
			tablicaNazwa[tablicaNazwa.length] = objL1.tags.name;
			tablicaWikipedia[tablicaWikipedia.length] = objL1.tags.wikipedia;
			tablicaLat[tablicaLat.length] = objL1.lat;
			tablicaLon[tablicaLon.length]  = objL1.lon;
		}
	}
	createSiteObject(tablicaObjId, tablicaNazwa, tablicaWikipedia, tablicaLat, tablicaLon);
}

function createSiteObject(id, nazwa, wikipedia, lat, lon) {
	var wlkTablicy=nazwa.length;
	var i;
	destField('info', 'info1'); 	
	var parentIdMain=document.getElementById('info');
	var parentIdGet = document.createElement("div");
	parentIdGet.setAttribute("id", 'info1');
	parentIdMain.appendChild(parentIdGet);
	
	for ( i = 0; i < wlkTablicy; i++) {
		var createObj = document.createElement("a");
		var newWikiName;
		createObj.setAttribute("href", '#map');
		createObj.setAttribute("id", id[i]);
		if ( typeof(wikipedia[i]) != 'undefined' ) {
			tmpWiki = wikipedia[i];
			newWikiName = '"' + tmpWiki + '"';
		} else {
			newWikiName = "'brak'";
		}
		if ( typeof(lon[i]) != 'undefined' && typeof(lon[i]) != 'undefined') {
			createObj.setAttribute("onclick", "showObjMap("+lon[i]+", "+lat[i]+"), createWikiInfo("+newWikiName+")");
		} else {
			createObj.setAttribute("onclick", "showObjMap('brak', 'brak'), createWikiInfo("+newWikiName+")");
		}
		if ( typeof(nazwa[i]) !== 'undefined' ) {
			createObj.innerHTML=nazwa[i];
		} else {
			createObj.innerHTML='Nazwa nieznana';
		}
		
		parentIdGet.appendChild(createObj);
		createBr=document.createElement("br");
		parentIdGet.appendChild(createBr);
	}
}

function showObjMap(lon, lat) {
	
	destField('map', 'map1'); 	
	
	var createMap = document.createElement("div");
	createMap.setAttribute("id", 'map1');
	var parentIdGet=document.getElementById('map');
	parentIdGet.appendChild(createMap);
	
	if ( lon != 'brak' && lon != 'brak' ) {
		var polyFeature = new ol.Feature({
		    geometry: new ol.geom.Point([lon, lat]),
		    projection: 'EPSG:4326'
		}); 
		
		polyFeature.setStyle(new ol.style.Style({
			image: new ol.style.Icon(({
			  color: '#ff0000',
			  crossOrigin: 'anonymous',
			  src: 'img/dot.png'
			}))
		}));

		var vectorLayer = new ol.layer.Vector({
		    source: new ol.source.Vector({
			features: [polyFeature]
		    })
		});
		var osmLayer = new ol.layer.Tile({
		source: new ol.source.OSM()
		});

		var view = new ol.View({
		projection: 'EPSG:4326',
		zoom: 18
		});
		view.setCenter([lon, lat]);

		var map = new ol.Map({
		target: 'map1',
		view:view,
		layers: [ osmLayer,vectorLayer]
		});
		map.setView(view);

		var geometryM = polyFeature.getGeometry();
		var coordinate = geometryM.getCoordinates();
		
		
		var startMarker = new ol.Feature({
			type: 'icon',
			geometry: new ol.geom.Point(coordinate)
		});
	} else {
		var createMapU = document.createElement("p");
		createMapU.innerHTML='Brak danych';
		createMap.appendChild(createMapU);
	}
}

function createWikiInfo(nazwa) {
	destField('wiki', 'wiki1'); 
	var createWiki = document.createElement("div");
	createWiki.setAttribute("id", 'wiki1');
	var parentIdGet=document.getElementById('wiki');
	parentIdGet.appendChild(createWiki);
	if (nazwa != 'brak') {
		var sName = nazwa.split(":");
		var SNameOne = sName[0];
		var SNameTwo = sName[1];
	} else {
		var SNameOne = "brak";
		var SNameTwo = "brak";
	}
	pobierzDaneWiki(SNameOne, SNameTwo);
	
}

function pobierzDaneWiki(nazwa1, nazwa2) {
	var textPart;
	if (nazwa1 != 'brak') {
		var newNazwaWiki = nazwa2.replace(/ /g, "%20");
		var pobPod = new XMLHttpRequest();
		pobPod.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var objJSON = JSON.parse(this.responseText);
				var x = 0;
				var jLvl1;
				var jLvl2=[];
				for (i in objJSON.query.pages) {
					for (j in objJSON.query.pages[i].revisions) {
						jLvl1=objJSON.query.pages[i].revisions[j];
						for (k in jLvl1) {
							jLvl2[x]=jLvl1[k];
							x++;
						}
					}
					
				}
				var textIndex=jLvl2[2].search("Category");
				textPart=jLvl2[2].slice(textIndex, textIndex + 1000);
				wyswitlInfoWiki(textPart, nazwa1, newNazwaWiki);
			}
		};
		pobPod.open("GET", "https://"+nazwa1+".wikipedia.org/w/api.php?action=query&titles="+nazwa2+"&prop=revisions&rvprop=content&format=json&origin=*", true);
		pobPod.send();
	} else {
		textPart = "Brak informacji w wikipedia";
		wyswitlInfoWiki(textPart, "brak", "brak");
	}
	
}

function wyswitlInfoWiki(tekst, kraj, tytul) {
	var parentIdGet=document.getElementById('wiki1');
	var createWikiField= document.createElement("p");
	createWikiField.innerHTML=tekst;
	parentIdGet.appendChild(createWikiField);
	if (kraj != 'brak') {
		var createWikiLink= document.createElement("a");
		createWikiLink.setAttribute("href", 'https://'+kraj+'.wikipedia.org/wiki/'+tytul);
		createWikiLink.setAttribute("target", "_blank");
		createWikiLink.innerHTML="Więcej w artykule na wikipedii";
		parentIdGet.appendChild(createWikiLink);
	}
}
