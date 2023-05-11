function LZWEncoding(input) {
  // Membuat dictionary awal dengan karakter ASCII
  let dictionary = {};
  for (let i = 0; i < 256; i++) {
    dictionary[String.fromCharCode(i)] = i; // ambil karakter ASCII
  }

  let output = [];
  let currentSequence = "";

  for (let i = 0; i < input.length; i++) {
    let symbol = input[i];
    let sequence = currentSequence + symbol;

    if (dictionary.hasOwnProperty(sequence)) {
      currentSequence = sequence;
    } else {
      output.push(dictionary[currentSequence]);
      dictionary[sequence] = Object.keys(dictionary).length;
      currentSequence = symbol;
    }
  }

  if (currentSequence !== "") {
    output.push(dictionary[currentSequence]);
  }

  return output;
}

let fileinput = document.getElementById("inputTxt");
fileinput.addEventListener("change", function (e) {
  let file = fileinput.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    let fileContent = reader.result;
    // lakukan Eksekusi Pogram
    let tampilkan = document.getElementById("isiFile");
    tampilkan.innerText = fileContent;
    let hasil = document.getElementById("hasilEncode");
    hasil.innerText = LZWEncoding(fileContent);
    let hasilEncode = LZWEncoding(fileContent);
    let saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", function () {
      let blob = new Blob([hasilEncode], { type: "text/plain" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "outputEncoding.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };
  reader.onerror = function () {
    alert(reader.error);
  };
  fileinput.value = "";
});
