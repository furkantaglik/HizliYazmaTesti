const input = document.querySelector("#input");
const refreshBtn = document.querySelector("#refresh");
const timeBtn = document.querySelector("#time");
const textDiv = document.querySelector("#textDiv");
const sonucEkrani = document.querySelector("#sonucEkrani")

const dogruSayisi = document.querySelector("#dogruSayisi");
const yanlisSayisi = document.querySelector("#yanlisSayisi");
const gecenSure = document.querySelector("#gecenSure");
const toplamKelime = document.querySelector("#toplamKelime");

let i = 0;
let dogru = 0;
let yanlis = 0;
let toplam;
let timer;
let startTime;
let endTime;

//test edilecek metin değiştirilebilir
let text = `Gece karanlığında, sessiz sokaklarda gizemli bir olay meydana geldi. 
Zengin iş adamı Robert Harper'ın evinde bir cinayet işlendi. 
Harper'ın cansız bedeni, kanlar içinde yatak odasında bulundu. 
Polis dedektifi Jessica Adams, olay yerine hızla ulaştı. 
İncelemelerine başladığında, birçok ipucuyla karşılaştı. 
Harper'ın iş ortağı John Thompson'ın şüpheli davranışları dikkatini çekti. 
Ancak, alibisi sağlamdı. Cinayetin ardındaki sır perdesini aralamak için 
erin bir soruşturma başlatan Jessica, her adımda yeni bir gizemi ortaya çıkarıyordu. 
Karanlık geçmişler, kıskançlık, ihanet ve entrikaların iç içe geçtiği bu olayı çözmek için 
Jessica, zekası ve tecrübesini kullanmaktan başka çaresi yoktu. İpucu avı sürerken, 
gerçeğe yaklaşmak için zaman tükeniyordu. Jessica, sonunda gerçek katili ortaya çıkarabilecek mi? 
Bu sırlarla dolu polisiye hikayenin sonu nasıl bitecekti?`;

runEvents();

function runEvents() {
    document.addEventListener("DOMContentLoaded", pageLoaded);
    input.addEventListener("input", karsilastir);
    refreshBtn.addEventListener("click", restartGame);
}

function karsilastir(event) {
    let inputValue = getInputValue(event);
    let spanText = getSpanText(i);

    if (inputValue !== false) {
        if (textDiv.children.length <= yanlis + dogru) {
            clearInterval(timer);
            showScore();
        } else if (inputValue.trim() === spanText.textContent.trim()) {
            spanText.classList.add("text-success");
            dogru += 1;
        } else {
            spanText.classList.add("text-danger");
            yanlis += 1;
        }

        input.value = "";
        i += 1;
    }
}



function getInputValue(event) {

    if (event.data === " ") {
        const value = input.value;
        return value;
    } else {
        return false;
    }
}



function getSpanText(index) {
    let spanText = textDiv.children[index];
    return spanText;
}

function pageLoaded() {
    const kelimeler = text.split(" ");
    for (let kelime of kelimeler) {
        const span = document.createElement("span");
        span.textContent = `${kelime} `;
        textDiv.appendChild(span);
    }
    toplam = textDiv.children.length;

    startCountdown();
    startTime = Date.now();
}

function startCountdown() {
    let count = 59;

    timer = setInterval(() => {
        timeBtn.textContent = count;

        if (count === 0) {
            clearInterval(timer);
            showScore();
        }

        count--;
    }, 1000);
}

function showScore() {
    endTime = Date.now();

    const elapsedTime = Math.floor((endTime - startTime) / 1000);
    sonucEkrani.classList.add("p-3");
    gecenSure.textContent = `Geçen Süre: ${elapsedTime} Saniye`;
    dogruSayisi.textContent = `Doğru Sayısı: ${dogru}`;
    yanlisSayisi.textContent = `Yanlış Sayısı: ${yanlis}`;
    toplamKelime.textContent = `Toplam Kelime: ${toplam}`;

    stopGame();
}

function stopGame() {
    input.disabled = true;
    input.value = "Oyun Sonlandırıldı";
    input.removeEventListener("input", karsilastir);
}

function restartGame() {
    location.reload();
}