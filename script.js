// Haetaan elementit ja alustetaan muuttujia
let ulLista = document.getElementById("lista");
let syote = document.getElementById("teksti").value;
let laheta = document.getElementById("laheta");
let poistakaikki = document.getElementById("poistakaikki");
let laskuri = localStorage.length;
if (!laskuri) {
  laskuri = 0;
}
let tunnus2;

let raksitut = [];
//let raksitut = JSON.parse(localStorage.getItem("raksitut"));

function merkitseRasti(tunnus2) {
  raksitut.push({
    id: tunnus2,
    tila: true,
  });
  //localStorage.setItem("raksitut", JSON.stringify(raksitut));
  //console.log(raksitut);
  //alert("onnistui3");
}

// Haetaan tiedot Local Storagesta ja printataan ne ruudulle.

if (localStorage.length !== null) {
  for (var i = 0; i <= laskuri; i++) {
    let naytettava = localStorage.getItem("js" + i);
    console.log(localStorage.key(i));
    if (naytettava !== null) {
      ulLista.innerHTML += naytettava;
    }
    //laskuri = localStorage.length;
    /* let testi = document.getElementById("cb"+i);
    if (testi === null){testi = 1000000}
    let testi2 = document.getElementById(i);
    if (testi === testi2){
        //alert("onnistui2");
    testi.checked = true;
    }
    */
  }
} else {
  laskuri = 0;
}

// luetaan Associative Arrayn pituus

Object.size = function (arr) {
  var size = 0;
  for (var key in arr) {
    if (arr.hasOwnProperty(key)) size++;
  }
  return size;
};

let pituus = Object.size(raksitut);

//console.log(pituus);
//console.log(raksitut);

// Lähetä napin painalluksen logiikka, tarkistetaan annettu teksti, luetaan tieto ja sijoitetaan se listaan.

laheta.addEventListener("click", function () {
  syote = document.getElementById("teksti").value;

  if (!syote || syote.length < 3) {
    alert("Epäkelpo syöte, yritä uudelleen");
    teksti.style.border = "1px solid red";
  } else {
    ulLista.innerHTML += `<li id="${laskuri}"><input type="checkbox" id = cb${laskuri} ><span> ${syote} </span> <button type="button" class = Lbutton>Poista</button></li>`;
    let data = `<li id="${laskuri}"><input type="checkbox" id = cb${laskuri}><span> ${syote} </span><button type="button" class = Lbutton>Poista</button></li>`;
    localStorage.setItem("js" + laskuri, data);
    laskuri++;
    teksti.style.border = "1px solid grey";
  }
});

// Reagoidaan poista napin painallukseen, etsitään oikea lista objekti ja poistetaan se.

ulLista.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const reset = event.target;
    const li = reset.parentNode;
    const ul = li.parentNode;
    let tunnus = li.getAttribute("id");
    console.log(tunnus);
    let JStunnus = "js" + tunnus;
    console.log(JStunnus);
    localStorage.removeItem("js" + tunnus);
    ul.removeChild(li);
    let token = Math.floor(Math.random() * 100000);
    localStorage.setItem(token, JSON.stringify(token));

    alert("toimii");
  }
});

// Kirjataan klikattu chekbox:i ruksituksi taulukkoon

ulLista.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const checkbox = event.target;
    const li2 = checkbox.parentNode;
    const ul2 = li2.parentNode;
    tunnus2 = li2.getAttribute("id");
    merkitseRasti(tunnus2);
    localStorage.setItem(tunnus2, JSON.stringify(raksitut));
    //console.log(tunnus2);
    //alert("onnistui2");
  }
});

// Poista kaikki nappin painalluksella tyhjennetään local Storage ja refreshataan sovellus.

poistakaikki.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Funktio merkattujen piilottamiseen

/*function piiloita(syote){

    let elementti = document.getElementById(syote) 

        if(){}

    

} */

console.log(localStorage);
