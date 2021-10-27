// Fetch the elements and declare variables
const kaikki = document.getElementById("kaikki");
const tekemattomat = document.getElementById("tekemattomat");
const tehdyt = document.getElementById("tehdyt");
const ulLista = document.getElementById("lista");
let syote = document.getElementById("teksti").value;
const laheta = document.getElementById("laheta");
const poistakaikki = document.getElementById("poistakaikki");
const tekemattomatTeksti = document.getElementById("tekematta");
let laskuri = localStorage.length;
let tekemattomatMaara = 0;
if (!laskuri) {
  laskuri = 0;
}
let tunnus2;

// Get records from Local storage and print it on screen.
if (localStorage.length !== null) {
  for (var i = 0; i <= laskuri; i++) {
    let naytettava = localStorage.getItem("js" + i);
    if (naytettava !== null) {
      ulLista.innerHTML += naytettava;
      tekemattomatMaara++;
    }
  }
  // checks the checkboxes that where checked and adds line-through them.
  for (var i = 0; i <= laskuri; i++) {
    let raksi = localStorage.getItem("cb" + i);
    if (raksi !== null) {
      let tarkistus = document.getElementById(raksi);
      if (tarkistus !== null) {
        tarkistus.checked = true;
        document.getElementById("sp" + i).style.textDecoration = "line-through";
        document.getElementById("sp" + i).style.textDecorationThickness = "2px";
        tekemattomatMaara--;
      }
    }
  }
  tekemattomatTeksti.innerHTML = `Tekemättömiä töitä: ${tekemattomatMaara}`;
}

// Send buttons logic, checks the text, reads it and places in list element.
laheta.addEventListener("click", function () {
  syote = document.getElementById("teksti").value;

  if (!syote || syote.length < 3) {
    alert("Epäkelpo syöte, yritä uudelleen");
    teksti.style.border = "1px solid red";
  } else {
    ulLista.innerHTML += `<li id="${laskuri}"><input type="checkbox" id = cb${laskuri} ><span id = sp${laskuri}> ${syote} </span> <button type="button" class = Lbutton>Poista</button></li>`;
    let data = `<li id="${laskuri}"><input type="checkbox" id = cb${laskuri}><span id = sp${laskuri}> ${syote} </span><button type="button" class = Lbutton>Poista</button></li>`;
    localStorage.setItem("js" + laskuri, data);

    // adds checked to checkboxes and line through the text
    for (var i = 0; i <= laskuri; i++) {
      let raksi = localStorage.getItem("cb" + i);
      if (raksi !== null) {
        let tarkistus = document.getElementById(raksi);
        if (tarkistus !== null) {
          tarkistus.checked = true;
          document.getElementById("sp" + i).style.textDecoration =
            "line-through";
          document.getElementById("sp" + i).style.textDecorationThickness =
            "2px";
        }
      }
    }

    laskuri++;
    tekemattomatMaara++;
    tekemattomatTeksti.innerHTML = `Tekemättömiä töitä: ${tekemattomatMaara}`;
    teksti.style.border = "1px solid grey";
  }
});

// Reacts to delete button press, finds the right list object and delets it.
ulLista.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const reset = event.target;
    const li = reset.parentNode;
    const ul = li.parentNode;
    let tunnus = li.getAttribute("id");
    if (document.getElementById("cb" + tunnus).checked == "") {
      tekemattomatMaara--;
      tekemattomatTeksti.innerHTML = `Tekemättömiä töitä: ${tekemattomatMaara}`;
    }
    localStorage.removeItem("js" + tunnus);
    localStorage.removeItem("cb" + tunnus);
    ul.removeChild(li);
    // Adds on random object to localstorage in order to not break the "for loop"
    let token = Math.floor(Math.random() * 100000);
    localStorage.setItem(token, JSON.stringify(token));
  }
});

// Saves checked and unchecked checkboxes to local storage
ulLista.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const checkbox = event.target;
    const li = checkbox.parentNode;
    tunnus2 = checkbox.getAttribute("id");
    const yliviivausTunnus = li.getAttribute("id");
    if (checkbox.checked) {
      localStorage.setItem(tunnus2, tunnus2);
      // Crossing the text over
      document.getElementById("sp" + yliviivausTunnus).style.textDecoration =
        "line-through";
      document.getElementById(
        "sp" + yliviivausTunnus
      ).style.textDecorationThickness = "2px";
      tekemattomatMaara--;
      tekemattomatTeksti.innerHTML = `Tekemättömiä töitä: ${tekemattomatMaara}`;
    } else {
      localStorage.removeItem(tunnus2, tunnus2);
      //removing the crossover
      document.getElementById("sp" + yliviivausTunnus).style.textDecoration =
        "none";
      tekemattomatMaara++;
      tekemattomatTeksti.innerHTML = `Tekemättömiä töitä: ${tekemattomatMaara}`;
    }
  }
});

// Delete all button, clears the local storage and refreshes the page.
poistakaikki.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Shows all tasks marked done
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
    // Adding checkmarks and line-through
    for (var i = 0; i <= laskuri; i++) {
      let raksi = localStorage.getItem("cb" + i);
      if (raksi !== null) {
        let naytettava = document.getElementById(raksi).parentNode;
        document.getElementById("sp" + i).style.textDecoration = "line-through";
        document.getElementById("sp" + i).style.textDecorationThickness = "2px";
        if (naytettava !== null) {
          naytettava.style.display = "block";
          document.getElementById(raksi).checked = true;
        }
      }
    }
  }
});

// Shows the tasks that still need to be done
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
        if (document.getElementById(raksi).parentNode !== null) {
          let naytettava = document.getElementById(raksi).parentNode;
          naytettava.style.display = "none";
          document.getElementById(raksi).checked = true;
        }
      }
    }
  }
});

// Shows all tasks, done and undone.
kaikki.addEventListener("click", function () {
  ulLista.innerHTML = "";
  for (var i = 0; i <= laskuri; i++) {
    let naytettava = localStorage.getItem("js" + i);
    if (naytettava !== null) {
      ulLista.innerHTML += naytettava;
    }
  }
  // Adding checkmarks and line-through
  for (var i = 0; i <= laskuri; i++) {
    let raksi = localStorage.getItem("cb" + i);
    if (raksi !== null) {
      let tarkistus = document.getElementById(raksi);
      if (tarkistus !== null) {
        tarkistus.checked = true;
        document.getElementById("sp" + i).style.textDecoration = "line-through";
        document.getElementById("sp" + i).style.textDecorationThickness = "2px";
      }
    }
  }
});
