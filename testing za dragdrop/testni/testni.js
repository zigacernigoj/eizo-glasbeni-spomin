function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("id trenutne lokacije:", ev.target.parentElement.id);
    console.log("id elementa, ki ga premikam:", ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    console.log("id lokacije, kamor sem ga spustil:", ev.target.id);

}