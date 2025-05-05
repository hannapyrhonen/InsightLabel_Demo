// Oletus-GTIN-koodi, jonka perusteella haetaan tietoja
const GTIN = "1234570000000"; // Tämä voidaan tehdä dynaamiseksi myöhemmin

// CSV:n lataus ja datan käsittely
fetch("demo_tuotetiedot.csv")
  .then(response => response.text())
  .then(text => {
    const rows = text.split("\n").map(r => r.split(","));
    const headers = rows[0];
    const data = rows.slice(1);

    const tuotetieto = data.find(row => row[headers.indexOf("GTIN")] === GTIN);

    if (!tuotetieto) {
      alert("Tuotetta ei löytynyt CSV-tiedostosta.");
      return;
    }

    // Haetaan tarvittavat kentät
    const nimi = tuotetieto[headers.indexOf("Tuotteen_nimi")];
    const brändi = tuotetieto[headers.indexOf("Brändi")];
    const paino = tuotetieto[headers.indexOf("Paino")];
    const yksikkö = tuotetieto[headers.indexOf("Paino_yksikko")];

    // Näytetään otsikkona koko nimi + paino
    document.getElementById("product-name").textContent = `${brändi} ${nimi}, ${paino} ${yksikkö}`;

    // Muut kentät
    document.getElementById("product-description").textContent = tuotetieto[headers.indexOf("Kuvaus")];
    document.getElementById("maa").textContent = tuotetieto[headers.indexOf("Alkuperämaa")];
    document.getElementById("paikka").textContent = tuotetieto[headers.indexOf("Paikkakunta")];
    document.getElementById("tuottaja").textContent = tuotetieto[headers.indexOf("Tuottaja")];
    document.getElementById("co2data").textContent = tuotetieto[headers.indexOf("CO2")];
    document.getElementById("energia").textContent = tuotetieto[headers.indexOf("Energia")];
  })
  .catch(error => {
    console.error("CSV-tiedoston lukemisessa tapahtui virhe:", error);
  });

// Moduulien näyttäminen
function näytäModuuli(id) {
  const moduulit = document.querySelectorAll(".module");
  moduulit.forEach(m => m.style.display = "none");
  document.getElementById(id).style.display = "block";
}
