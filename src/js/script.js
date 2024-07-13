const entryText = document.getElementById("entry__text");
const outputText = document.getElementById("output__text");
const btnSwitch = document.getElementById("switch");
const btnOk = document.getElementById("btn-ok");
const btnClear = document.getElementById("btn-clear");
const btnCopy = document.getElementById("btn-copy");
const entryInfo = document.querySelector(".entry__info");
const entryInfoImage = document.querySelector(".entry__info-img");

btnOk.addEventListener("click", () => {
  let text = entryText.value;
  if (validateText(text)) {
    showError();
    return;
  }
  outputText.innerText = " ";
  if (!btnSwitch.checked) {
    outputText.innerHTML = encryptText(text);
  } else {
    outputText.innerHTML = decryptText(text);
  }
  btnCopy.classList.remove("hide");
});

btnCopy.addEventListener("click", () => {
  copyToClipboard(outputText.innerHTML);
});

btnClear.addEventListener("click", () => {
  entryText.value = "";
});

function encryptText(text) {
  let newText = "";

  let separateText = text.split(" ");

  for (let word of separateText) {
    let letters = [...word];

    let newLetters = letters.map(letter => {
      if (letter == "a") {
        letter = "ai";
      }
      if (letter == "e") {
        letter = "enter";
      }
      if (letter == "i") {
        letter = "imes";
      }
      if (letter == "o") {
        letter = "ober";
      }
      if (letter == "u") {
        letter = "ufat";
      }
      return letter;
    });

    word = newLetters.join("");

    newText += word + " ";
  }
  return newText.trim();
}

function decryptText(texto) {
  let newText = "";

  let separateText = texto.split(" ");

  separateText.map(word => {
    let newWord = word.replace(/ai/g, "a");
    newWord = newWord.replace(/enter/g, "e");
    newWord = newWord.replace(/imes/g, "i");
    newWord = newWord.replace(/ober/g, "o");
    newWord = newWord.replace(/ufat/g, "u");

    newText += newWord + " ";
  });

  return newText.trim();
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

function validateText(text) {
  const regex = /[A-Z|àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕç]/;
  if (regex.test(text)) {
    return true;
  }
  return false;
}

function showError() {
  entryInfo.classList.add("error");
  entryInfoImage.src = "src/assets/exclamation-red.png";

  let error = setInterval(() => {
    entryInfo.classList.remove("error");
    entryInfoImage.src = "src/assets/info.png";

    clearInterval(error);
  }, 2000);
  
}
