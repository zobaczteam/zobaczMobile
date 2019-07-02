loginVisible() 


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
  
function destField(pFieldName, chFieldName) {
	var pElem = document.getElementById(pFieldName);
	if(document.getElementById(chFieldName)) {
		var chElem = document.getElementById(chFieldName);
		pElem.removeChild(chElem);
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
	cTag1.innerHTML = '<div class="form-header"><h1>Register</h1></div><p><input type="email" id="stRegEmail"  name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendRegister" class="btn" onclick="sendRegister()">Register</button></p><p class="form-footer">Have account? <button id="btnChangeLogin" class="btn-footer" onclick="loginVisible()">Log In</button></p>';
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
	cTag1.innerHTML = '<div class="form-header"><h1>Login</h1></div><p><input type="email" id="stRegEmail" name="stEmail" placeholder="Email" onblur="checkEmail(this.value,\'logMailMesg\')"><p id="logMailMesg"></p></p><p><input type="password" id="stRegPass" name="stPass" placeholder="Password" onblur="checkPass(this.value,\'logPassMesg\')"><p id="logPassMesg"></p></p><p><button id="btnSendLogin" class="btn" onclick="sendLogin()">Login</button></p><p><button id="btnSendFBLogin" class="btn" onclick="sendFBLogin()">Facebook login</button></p><p class="form-footer">Don\'t have account? <button id="btnChangeRegister" class="btn-footer" onclick="registerVisible()">Register</button></p>';
	document.getElementById('form-main').appendChild(cTag1);
}
