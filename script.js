// Haetaan elementit ja alustetaan muuttujia

const kaikki = document.getElementById("kaikki");
const tekemattomat = document.getElementById("tekemattomat");
const tehdyt = document.getElementById("tehdyt");
const ulLista = document.getElementById("lista");
let syote = document.getElementById("teksti").value;
const laheta = document.getElementById("laheta");
const poistakaikki = document.getElementById("poistakaikki");
let laskuri = localStorage.length;
if (!laskuri) {
  laskuri = 0;
}
let tunnus2;

// Haetaan tiedot Local Storagesta ja printataan ne ruudulle.

if (localStorage.length !== null) {
  for (var i = 0; i <= laskuri; i++) {
    let naytettava = localStorage.getItem("js" + i);
    if (naytettava !== null) {
      ulLista.innerHTML += naytettava;
    }
  }
  for (var i = 0; i <= laskuri; i++) {
    let raksi = localStorage.getItem("cb" + i);
    if (raksi !== null) {
      let tarkistus = document.getElementById(raksi);
      if (tarkistus !== null) {
        tarkistus.checked = true;
      }
    }
  }
}

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
    localStorage.removeItem("js" + tunnus);
    ul.removeChild(li);
    // Lisätään poiston yhteydessä satunnainen objekti local storageen, jotta palautus "for loop" tekee tarpeeksi kierroksia.
    let token = Math.floor(Math.random() * 100000);
    localStorage.setItem(token, JSON.stringify(token));
  }
});

// Kirjataan klikattu chekbox:i ruksituksi

ulLista.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const checkbox = event.target;
    tunnus2 = checkbox.getAttribute("id");
    localStorage.setItem(tunnus2, tunnus2);
  }
});

// Poista kaikki nappin painalluksella tyhjennetään local Storage ja re-freshataan sovellus.

poistakaikki.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Näytetään tehdyt tehtävät napinpainalluksella

tehdyt.addEventListener("click", function () {
  ulLista.innerHTML = "";
  if (localStorage.length !== null) {
    for (var i = 0; i <= laskuri; i++) {
      let naytettava = localStorage.getItem("js" + i);
      if (naytettava !== null) {
        ulLista.innerHTML += naytettava;
        let piilotettava = document.getElementById(i);
        piilotettava.style.display = "none";
      }
    }
    for (var i = 0; i <= laskuri; i++) {
      let raksi = localStorage.getItem("cb" + i);
      if (raksi !== null) {
        let naytettava = document.getElementById(raksi).parentNode;
        if (naytettava !== null) {
          naytettava.style.display = "block";
          document.getElementById(raksi).checked = true;
        }
      }
    }
  }
});

// Näytetään tekemättömät työt napin painalluksella

tekemattomat.addEventListener("click", function () {
  ulLista.innerHTML = "";
  if (localStorage.length !== null) {
    for (var i = 0; i <= laskuri; i++) {
      let naytettava = localStorage.getItem("js" + i);
      if (naytettava !== null) {
        ulLista.innerHTML += naytettava;
      }
    }
    for (var i = 0; i <= laskuri; i++) {
      let raksi = localStorage.getItem("cb" + i);
      if (raksi !== null) {
        let naytettava = document.getElementById(raksi).parentNode;
        if (naytettava !== null) {
          naytettava.style.display = "none";
          document.getElementById(raksi).checked = true;
        }
      }
    }
  }
});

// Näytetään kaikki tehtävät napin painalluksella

kaikki.addEventListener("click", function () {
  ulLista.innerHTML = "";
  for (var i = 0; i <= laskuri; i++) {
    let naytettava = localStorage.getItem("js" + i);
    if (naytettava !== null) {
      ulLista.innerHTML += naytettava;
    }
  }
  for (var i = 0; i <= laskuri; i++) {
    let raksi = localStorage.getItem("cb" + i);
    if (raksi !== null) {
      let tarkistus = document.getElementById(raksi);
      if (tarkistus !== null) {
        tarkistus.checked = true;
      }
    }
  }
});

console.log(localStorage);
