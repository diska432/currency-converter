const dropList = document.querySelectorAll(".drop-list select");
const getButton = document.querySelector("form button");
const apiKey = "db7a437494083dbce1a802bd";

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_list){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1){
            selected = currency_code == "KZT" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    })
}

function loadFlag(element) {
    for(code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
        }
    }
}

getButton.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
})

window.addEventListener("load", () => {
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input")
    const exchangerateTxt = document.querySelector(".exchange-rate");;
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangerateTxt.innerText = "Getting exchnage rate..."
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url).then(res=>res.json()).then(data => {
        let exchangerate = data.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangerate).toFixed(2);
       
        exchangerateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
    }).catch(() => {
        exchangerateTxt.innerText = "Something wen wrong";
    })
}