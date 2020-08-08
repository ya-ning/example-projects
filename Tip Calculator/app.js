function formatPrice (value) {
    value = Math.ceil(value * 100) / 100;
    value = value.toFixed(2);
    return `€${value}`;
};

function formatSpilt (value) {
    if(value === 1) return value + " person";
    return value + " people";
};

function update () {
    let billValue = Number(document.getElementById('yourBill').value);
    let tipPercent = document.getElementById('tipInput').value;
    let personAmount = document.getElementById('splitInput').value;
    //console.log({billValue, tipPercent, personAmount});

    let tipValue = (billValue * (tipPercent / 100));
    let tipEach = tipValue / personAmount;
    let billEach = (billValue + tipValue) / personAmount;
    //console.log({tipValue, tipEach, billEach});

    let total = billValue + tipValue;

    document.getElementById("tipPercent").innerHTML = `${tipPercent}%`;
    document.getElementById("tipValue").innerHTML = formatPrice(tipValue);
    document.getElementById("totalWithTip").innerHTML = formatPrice(total);
    document.getElementById("splitValue").innerHTML = formatSpilt(personAmount);
    document.getElementById("billEach").innerHTML = formatPrice(billEach);
    document.getElementById("tipEach").innerHTML = formatPrice(tipEach);
};

let container = document.getElementById('container');
container.addEventListener("input", update);