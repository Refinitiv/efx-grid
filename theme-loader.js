// Apply generic style overrides
const sheet = document.createElement('style');
sheet.innerHTML = `
:root {
  height: auto;
  min-height: 80px;
  font-size: calc(.625em / 10);
}
`;
document.head.appendChild(sheet);

const prom = new Promise((resolve, reject) => {
  const themeVariant = document.documentElement.getAttribute('prefers-color-scheme'); // "dark" or "light"
  let themePath = themeVariant === "light" ? "./resources/elf-halo-light.js" : "./resources/elf-halo-dark.js";
  let script = document.createElement("script");
  script.onload = () => {
    resolve(true);
  }
  script.onerror = () => {
    return resolve(false);
  }
  script.src = themePath;
  document.head.appendChild(script);
});

export default prom;
