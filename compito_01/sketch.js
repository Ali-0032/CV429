/* CREDITS TEXTURE EARTH:
   - Source: NASA/Goddard Space Flight Center Scientific Visualization Studio
   - Data courtesy of: The Blue Marble Next Generation data is courtesy of Reto Stockli (NASA/GSFC) and NASA's Earth Observatory.
   - Animator: Greg Shirah (NASA/GSFC)
   - Video editor: Victoria Weeks (HTSI)
   - Producer: Michael Starobin (HTSI)
   - Scientist: Amy A. Simon (NASA/GSFC)
   - Link: https://svs.gsfc.nasa.gov/vis/a000000/a003600/a003615/flat_earth_Largest_still.0330.jpg
*/

let earthImg;
let issData;
let raggioShere = 200;

// Funzione preload serve per caricare file estrni
function preload() {
 earthImg = loadImage('earth.jpg');
 
 issData = loadJSON('http://api.open-notify.org/iss-now.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    setInterval(aggiornaISS, 3000);
}

// Funzione inventata per ricaricare i dati
function aggiornaISS() {
    issData = loadJSON('http://api.open-notify.org/iss-now.json');
}

// Funzione che contiene tutto ciò che è animati e disegnato
function draw() {
    background(0);
    
    orbitControl(); // permette di ruotare e zoomare la vista
    
    // rotazione reale - UTC
    let d = new Date();
    let secondiUTC = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();

    let rotazioneTempo = map(secondiUTC, 0, 86400, 0, TWO_PI);

    // Terra
    push(); // serve per non far ruotare le cose sottostanti
    rotateY(PI);
    noStroke();    
    texture(earthImg);
    sphere(raggioShere, 64, 64);
    pop(); //chiude il blocco

    // ISS
    // 
    if (issData && issData.iss_position) {
        // Queste due stringhe sottostanti servono per estrarre i dati della ISS e li trasforma in numeri decimali (chiamati float)
        let lat = float(issData.iss_position.latitude);
        let lon = float(issData.iss_position.longitude);
        //qui sotto si chiama la funzione personalizzata per disegnare il pallino della ISS
        
        drawISS(lat, lon);
    }
}

// funzione personalizzata drawISS, servere per trasformare coordinate geografiche in coordinate 3D (x, y, z)
function drawISS(lat, lon, rot) {
    //P5.js non usa i gradi ma i radianti
    let theta = radians(lat);
    let phi = radians(lon); //PI allinea il punto 0 della mappa con sfera 3D

    // Questo passaggio serve per far si che il pallino vli sopèra la Terra
    let altitudine = raggioShere + 15;

    // questa è la conversione da coordinate sferiche a cartesiane, vengono usate formule trigonometriche
    // servono per proiettare un raggio dal centro della Terra verso lo spazio
    let x = altitudine * cos(theta) * sin(phi);
    let y = -altitudine * sin(theta); // - serve perchè asse y è invertito
    let z = altitudine * cos(theta) * cos(phi); 

    //disegno del pallino
    push();
    translate(x, y, z); // sposta la situa sulle cordinate x, y, e z
    fill(255, 0, 0);
    noStroke();
    sphere(4);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}