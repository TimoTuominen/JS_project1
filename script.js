
let ulLista = document.getElementById("lista");
let syote = document.getElementById("teksti").value;
let laheta = document.getElementById("laheta");
let poistakaikki = document.getElementById("poistakaikki");
let laskuri = 0;
let tunnus2;
let raksitut = JSON.parse(localStorage.getItem("raksitut"));

// raksitut = JSON.parse(localStorage.getItem("raksitut"));

function merkitseRasti(tunnus2) {
    
    raksitut.push({
       id: tunnus2,
       tila: true
    });
    localStorage.setItem("raksitut", JSON.stringify(raksitut));
    //console.log(raksitut);
    //alert("onnistui3");
}




if (localStorage.length !== null) {
for (var i = localStorage.length-1; i >= 0; i--){
    ulLista.innerHTML += localStorage.getItem(localStorage.key(i));
}

}

Object.size = function(arr) {
    var size = 0;
    for (var key in arr) {
        if (arr.hasOwnProperty(key)) size++;
    }
    return size;
};

let pituus = Object.size(raksitut);
console.log(pituus);
console.log(raksitut);


laheta.addEventListener("click", function(){
    syote = document.getElementById("teksti").value;
    ulLista.innerHTML +=  `<li id="${laskuri}"><input type="checkbox"><span> ${syote} </span> <button type="button">Poista</button> </li>`;
    let data = `<li id="${laskuri}"><input type="checkbox"><span> ${syote} </span><button type="button">Poista</button> </li>`;
    localStorage.setItem(laskuri,data);
    laskuri++;
    
})



ulLista.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON"){
        const reset = event.target;
        const li = reset.parentNode;
        const ul = li.parentNode;
        let tunnus = li.getAttribute("id");
        // console.log(tunnus);
        localStorage.removeItem(tunnus);
        ul.removeChild(li);
    }
    
})

ulLista.addEventListener("change", (event) => {
    if(event.target.type === "checkbox"){
        const checkbox = event.target;
        const li2 = checkbox.parentNode;
        const ul2 = li2.parentNode;
        tunnus2 = li2.getAttribute("id");
        merkitseRasti(tunnus2);
        //localStorage.setItem("raksitut", JSON.stringify(raksitut));
        //console.log(tunnus2);        
        alert("onnistui2");
        
    }
})

poistakaikki.addEventListener("click", function(){

    localStorage.clear();
    location.reload();
})


//console.log(localStorage);
