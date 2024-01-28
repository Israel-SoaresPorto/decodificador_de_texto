const entryText = document.getElementById("entry__text");
const outputText = document.getElementById("output__text");
const btnEncrypt = document.getElementById("btn-encrypt");
const btnDecrypt = document.getElementById("btn-decrypt");
const btnClear = document.getElementById("btn-clear");
const btnCopy = document.getElementById("btn-copy");
const entryInfo = document.querySelector(".entry__info");
const entryInfoImage = document.querySelector(".entry__info-img");

btnEncrypt.addEventListener("click", () => {
  let text = entryText.value;
  if(validateText(text)) {
    showError();
    return;
  }
  outputText.innerText = " ";
  outputText.innerHTML = encryptText(text);
  clearError();
  btnCopy.classList.remove("hide");
});

btnDecrypt.addEventListener("click", () => {
  let text = entryText.value;
  if(validateText(text)) {
    showError();
    return;
  }
  outputText.innerText = " ";
  outputText.innerHTML = decryptText(text);
  clearError();
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

    for (let i in letters) {
      if (letters[i] == "a") {
        letters[i] = "ai";
      }
      if (letters[i] == "e") {
        letters[i] = "enter";
      }
      if (letters[i] == "i") {
        letters[i] = "imes";
      }
      if (letters[i] == "o") {
        letters[i] = "ober";
      }
      if (letters[i] == "u") {
        letters[i] = "ufat";
      }
    }

    word = letters.join("");

    newText += word + " ";
  }
  return newText.trim();
}

function decryptText(texto) {
  let newText = "";

  let separateText = texto.split(" ");

  for (let word of separateText) {
    let newWord = word.replace(/ai/g, "a");
    newWord = newWord.replace(/enter/g, "e");
    newWord = newWord.replace(/imes/g, "i");
    newWord = newWord.replace(/ober/g, "o");
    newWord = newWord.replace(/ufat/g, "u");

    newText += newWord + " ";
  }

  return newText.trim();
}

async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

function validateText(text) {
  const regex = /[A-Z|àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕç]/;
  if(regex.test(text)) {
    return true;
  }
  return false;
}

function showError() {
  entryInfo.classList.add('error');  
  entryInfoImage.src = "src/assets/exclamation-red.png";
}

function clearError() {
  entryInfo.classList.remove('error');  
  entryInfoImage.src = "src/assets/info.png";
}


