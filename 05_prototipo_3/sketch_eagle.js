let currentMainImg = 'eagle_nebula_1.jpg';
let activeType = null;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  changeContent(1);
}

function draw() {
  background(11, 14, 20); 
}

function changeContent(tabNumber) {
  const imgElement = document.getElementById('nebula-display');
  const captionElement = document.getElementById('image-caption');
  const pills = document.querySelectorAll('.filter-pill');
  const hStella = document.getElementById('hotspot-stella');
  const hPolvere = document.getElementById('hotspot-polvere');
  const hNodi = document.getElementById('hotspot-nodi');
  
  const hubbleText = document.getElementById('hubble-content');
  const nearText = document.getElementById('near-infrared-content');
  const midText = document.getElementById('mid-infrared-content');

  const popupStellaContent = document.querySelector('#popup-stella .popup-text');
  const popupPolvereContent = document.querySelector('#popup-polvere .popup-text');

  if (popupStellaContent) {
      popupStellaContent.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
            <strong style="margin-bottom: 5px; display: block;">The Pillars of Creation</strong>
            <p style="margin: 0;">Located in the Eagle Nebula about 7,000 light-years away, these towers of gas and dust known as "elephant trunks" are an extremely active star-forming region. As new stars are born within, the radiation from nearby giant stars slowly erodes the clouds, sculpting their iconic shape: with every creation, the pillars deteriorate. The largest structure is approximately four light-years long.</p>
        </div>
      `;
  }

  if (popupPolvereContent) {
      popupPolvereContent.innerHTML = `<strong>Interstellar Dust</strong><p>The dense dust clouds where new star systems are born, acting as protective shields for stellar embryos.</p>`;
  }

  togglePopup(null, false); 
  
  // Reset stili hotspot per evitare conflitti tra tab
  if (hStella) {
    hStella.style.display = 'none';
    hStella.style.width = '40px';
    hStella.style.height = '40px';
  }
  if (hPolvere) hPolvere.style.display = 'none';
  if (hNodi) hNodi.style.display = 'none';

  pills.forEach((pill, index) => {
    pill.classList.toggle('active', index === tabNumber - 1);
  });

  if (tabNumber === 3) {
    // MID-INFRARED: Nessun hotspot o popup come richiesto
    imgElement.src = 'eagle_nebula_3.jpg';
    imgElement.style.objectPosition = '50% 20%'; 

    hubbleText.style.display = 'none';
    nearText.style.display = 'none';
    midText.style.display = 'block';
    captionElement.innerText = "NASA/JPL-Caltech."; 
  } else if (tabNumber === 2) {
    // NEAR-INFRARED
    if (hStella) {
        hStella.style.display = 'block';
        hStella.style.width = '170px';
        hStella.style.height = '170px';
        hStella.style.top = '70%';
        hStella.style.left = '65%';
    }
    imgElement.src = 'eagle_nebula_2.jpg';
    imgElement.style.objectPosition = '50% 20%';

    hubbleText.style.display = 'none';
    nearText.style.display = 'block';
    midText.style.display = 'none';
    captionElement.innerText = " NASA/JPL-Caltech/N. Flagey (IAS/SSC) & A. Noriega-Crespo (SSC/Caltech).";
  } else {
    // VISIBLE LIGHT
    imgElement.src = 'eagle_nebula_1.jpg';
    imgElement.style.objectPosition = '50% 20%';

    hubbleText.style.display = 'block';
    nearText.style.display = 'none';
    midText.style.display = 'none';
    captionElement.innerText = "T.A.Rector (University of Alaska Anchorage, NRAO/AUI/NSF and NOAO/AURA/NSF) and B.A.Wolpa (NOAO/AURA/NSF).";
  }
}

function updateLine() {
    if (!activeType) return;
    const popup = document.getElementById(`popup-${activeType}`);
    const hotspot = document.getElementById(`hotspot-${activeType}`);
    const svgLine = document.getElementById('svg-line');
    const wrapper = document.getElementById('interactive-wrapper');

    if (popup && hotspot && wrapper) {
        const wRect = wrapper.getBoundingClientRect();
        const hRect = hotspot.getBoundingClientRect();
        const pRect = popup.getBoundingClientRect();
        let x1, y1, x2, y2;
        if (activeType === 'stella') {
            x1 = hRect.right - wRect.left - 5;
            y1 = hRect.top + hRect.height / 2.6 - wRect.top;
            x2 = pRect.left - wRect.left + 130;
            y2 = pRect.top + pRect.height / 2 - wRect.top;
        } else {
            x1 = hRect.left - wRect.left;
            y1 = hRect.top + hRect.height / 2 - wRect.top;
            x2 = pRect.right - wRect.left - 130;
            y2 = pRect.top + pRect.height / 2 - wRect.top;
        }
        svgLine.setAttribute('x1', x1); svgLine.setAttribute('y1', y1);
        svgLine.setAttribute('x2', x2); svgLine.setAttribute('y2', y2);
    }
}

function togglePopup(type, show) {
    const popups = document.querySelectorAll('.popup-box');
    const svgContainer = document.getElementById('connection-svg');
    popups.forEach(p => p.style.display = 'none');
    if (show && type) {
        activeType = type;
        document.getElementById(`popup-${type}`).style.display = 'block';
        svgContainer.style.display = 'block';
        updateLine();
    } else {
        activeType = null;
        svgContainer.style.display = 'none';
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateLine();
}