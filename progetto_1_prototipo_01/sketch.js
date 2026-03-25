let selectedState = [true, false, false, false]; // [All, Blue, Green, Red]

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  // Colleghiamo i click alle righe usando l'ID dell'HTML
  for (let i = 1; i <= 4; i++) {
    let row = document.getElementById(`row-${i}`);
    if (row) {
      row.addEventListener('click', () => handleSelection(i - 1));
    }
  }
}

function draw() {
  // Solo sfondo scuro pulito
  background(11, 14, 20); 
}

function handleSelection(index) {
  if (index === 0) {
    // Se clicco "ALL", resetto gli altri
    selectedState = [true, false, false, false];
  } else {
    if (selectedState[index]) {
      selectedState[index] = false;
    } else {
      // Conta quanti filtri (escluso ALL) sono attivi
      let activeCount = selectedState.filter((val, i) => i !== 0 && val === true).length;
      
      if (activeCount < 2) {
        selectedState[0] = false; // Spegni "ALL"
        selectedState[index] = true;
      } else {
        console.log("Limite massimo: 2 filtri");
        return; 
      }
    }
    
    // Se nessuno è selezionato, torna su ALL
    if (!selectedState[1] && !selectedState[2] && !selectedState[3]) {
      selectedState[0] = true;
    }
  }
  updateInterface();
}

function updateInterface() {
  const imgElement = document.getElementById('nebula-display');
  if (!imgElement) return;

  let b = selectedState[1]; // blue
  let g = selectedState[2]; // green
  let r = selectedState[3]; // red

  // LOGICA IMMAGINI CON I TUOI NOMI FILE
  if (selectedState[0]) {
    imgElement.src = 'eagle_nebula_rgb.jpg';
  } else if (b && g) {
    imgElement.src = 'eagle_nebula_green_blue.jpg';
  } else if (g && r) {
    imgElement.src = 'eagle_nebula_red_green.jpg';
  } else if (b && r) {
    imgElement.src = 'eagle_nebula_red_blue.jpg';
  } else if (b) {
    imgElement.src = 'eagle_nebula_blue.jpg';
  } else if (g) {
    imgElement.src = 'eagle_nebula_green.jpg';
  } else if (r) {
    imgElement.src = 'eagle_nebula_red.jpg';
  }

  // AGGIORNA GRAFICA CERCHI E TESTI
  for (let i = 0; i < 4; i++) {
    let rowElement = document.getElementById(`row-${i+1}`);
    if (rowElement) {
        let circle = rowElement.querySelector('.circle');
        let statusTxt = rowElement.querySelector('.status');

        if (selectedState[i]) {
            circle.classList.add('filled');
            statusTxt.innerHTML = 'on';
        } else {
            circle.classList.remove('filled');
            statusTxt.innerHTML = 'off';
        }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}