 function typeText(text, elementId, delay) {
    let index = 0;
    const element = document.getElementById(elementId);

    element.innerHTML = '';

    const timer = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text[index];
              index++;
        } else {
            clearInterval(timer);
        }
    }, delay);
}
typeText("ZERO", "output-div", 500);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";

renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// свет
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// куб
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({
    color: 0x00aaff,
    metalness: 0.4,
    roughness: 0.2
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

// пол
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
plane.receiveShadow = true;

scene.add(plane);

// камера
camera.position.z = 3;

// анимация
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();