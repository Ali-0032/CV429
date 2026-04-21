let currentMainImg = 'helix_nebula_1.jpg';
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
  
  // Riferimenti ai tre blocchi di testo
  const hubbleText = document.getElementById('hubble-content');
  const nearText = document.getElementById('near-infrared-content');
  const midText = document.getElementById('mid-infrared-content');

  // Popup Content Elements
  const popupNodiContent = document.querySelector('#popup-nodi .popup-text');
  const popupStellaContent = document.querySelector('#popup-stella .popup-text');
  const popupPolvereContent = document.querySelector('#popup-polvere .popup-text');

  // Reset/Aggiornamento contenuti Popup dinamici
  if (popupNodiContent) {
      popupNodiContent.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
            <strong style="margin-bottom: 5px; display: block;">Cometary knots</strong>
            <p style="margin: 0;">These "knots" are massive globules of dense gas and dust that populate the nebula; in the Helix Nebula alone, there are about 40,000 of them. Despite their name, they are not icy comets: they are called this because they have a dense, bright "head" facing the central star and a tail that stretches in the opposite direction, just like a comet. Each knot is gigantic, exceeding our entire Solar System in size, yet possessing a mass similar to that of the Earth.</p>
        </div>
      `;
  }

  if (popupStellaContent) {
      popupStellaContent.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
            <strong style="margin-bottom: 5px; display: block;">White dwarf</strong>
            <p style="margin: 0;">At the center of the Helix shines a white dwarf called WD 2226-210, the dense core of a star once similar to our Sun. Despite its small size (with a radius of only 17,000 km), its temperature reaches 120,000 Kelvin, releasing the energy that lights up the entire nebula. Recent studies suggest that the survivors of an ancient planetary system may still orbit this stellar remnant.</p>
        </div>
      `;
  }

  if (popupPolvereContent) {
      popupPolvereContent.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
            <strong style="margin-bottom: 5px; display: block;">Debris Dust</strong>
            <p style="margin: 0;">Spitzer revealed an unexpected disk of warm dust surrounding the central star. This ring, as vast as our Kuiper Belt, is believed to be fueled by continuous collisions between comets that survived the star's death. In infrared images, this cosmic chaos appears as an intense red glow located right at the center of the "eye."</p>
        </div>
      `;
  }

  togglePopup(null, false); 
  if (hStella) hStella.style.display = 'none';
  if (hPolvere) hPolvere.style.display = 'none';
  if (hNodi) hNodi.style.display = 'none';

  pills.forEach((pill, index) => {
    pill.classList.toggle('active', index === tabNumber - 1);
  });

  if (tabNumber === 3) {
    if (hStella) hStella.style.display = 'block';
    if (hPolvere) hPolvere.style.display = 'block';
    imgElement.src = 'helix_nebula_3.jpg';
    hubbleText.style.display = 'none';
    nearText.style.display = 'none';
    midText.style.display = 'block'; // Mostra Mid-Infrared
    captionElement.innerText = "NASA/JPL-Caltech/K. Su (Univ. of Arizona)."; 
  } else if (tabNumber === 2) {
    if (hNodi) hNodi.style.display = 'block';
    imgElement.src = 'helix_nebula_2.jpg';
    hubbleText.style.display = 'none';
    nearText.style.display = 'block'; // Mostra Near-Infrared
    midText.style.display = 'none';
    captionElement.innerText = "NASA/JPL-Caltech/ J. Hora (Harvard-Smithsonian CfA).";
  } else {
    imgElement.src = 'helix_nebula_1.jpg';
    hubbleText.style.display = 'block'; // Mostra Hubble
    nearText.style.display = 'none';
    midText.style.display = 'none';
    captionElement.innerText = "NASA, ESA, C.R. O'Dell (Vanderbilt University), and M. Meixner, P. McCullough, and G. Bacon ( Space Telescope Science Institute).";
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

        if (activeType === 'stella' || activeType === 'nodi') {
            x1 = hRect.right - wRect.left - 2;
            y1 = hRect.top + hRect.height / 2 - wRect.top;
            x2 = pRect.left - wRect.left + 130;
            y2 = pRect.top + pRect.height / 2 - wRect.top;
        } else {
            x1 = hRect.left - wRect.left;
            y1 = hRect.top + hRect.height / 2 - wRect.top;
            x2 = pRect.right - wRect.left - 130;
            y2 = pRect.top + pRect.height / 2 - wRect.top;
        }

        svgLine.setAttribute('x1', x1);
        svgLine.setAttribute('y1', y1);
        svgLine.setAttribute('x2', x2);
        svgLine.setAttribute('y2', y2);
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