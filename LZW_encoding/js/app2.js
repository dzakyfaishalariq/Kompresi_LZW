function LZWDecoding(input) {
  // Membuat dictionary awal dengan karakter ASCII
  let dictionary = {};
  for (let i = 0; i < 256; i++) {
    dictionary[i] = String.fromCharCode(i);
  }

  let output = "";
  let currentSequence = String.fromCharCode(input[0]);

  for (let i = 1; i < input.length; i++) {
    let previousSequence = currentSequence;
    let currentCode = input[i];
    currentSequence = "";

    if (dictionary.hasOwnProperty(currentCode)) {
      currentSequence = dictionary[currentCode];
    } else if (currentCode === Object.keys(dictionary).length) {
      currentSequence = previousSequence + previousSequence[0];
    }

    output += currentSequence;
    let newSequence = previousSequence + currentSequence[0];
    dictionary[Object.keys(dictionary).length] = newSequence;
  }

  return output;
}

let fileinput = document.getElementById("inputEncode");
fileinput.addEventListener("change", function (e) {
  let file = fileinput.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    let fileContent = reader.result;
    array = fileContent.split(",");
    let hasil = document.getElementById("isiFile");
    hasil.innerText = array;
    let hasilDecode = LZWDecoding(array);
    // console.log(hasilDecode);
    let tampilkan = document.getElementById("hasilDecode");
    tampilkan.innerHTML = hasilDecode;
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function () {
      let blob = new Blob([hasilDecode], { type: "text/plain" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "outputDecoding.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };
});
