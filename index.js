// index.js (versión corregida)
const colorForm = document.getElementById('color-form');
const colorSpace = document.getElementById('color-space');

async function pickColor() {
  try {
    const colorFormData = new FormData(colorForm);
    const colorHex = (colorFormData.get('colorPicker') || '').replace('#', '');
    const colorMode = colorFormData.get('colorScheme') || 'monochrome';

    // muestra algo si falta hex
    if (!colorHex) {
      colorSpace.innerHTML = `<div class="msg">Elige un color primero.</div>`;
      return;
    }

    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${colorMode}&count=4`);
    if (!res.ok) throw new Error(`API error ${res.status}`);

    const json = await res.json();
    const colors = Array.isArray(json.colors) ? json.colors : [];

    // construir HTML
    let html = `
      <div class="color-result" id="color-base-value" style="background: #${colorHex}">
        <div class="color-hex-box">
          <h2 id="color-base-hex">#${colorHex}</h2>
        </div>
      </div>`;

    for (const color of colors) {
      const hexValue = color?.hex?.value || '#000';
      const safeId = hexValue.replace('#', '');
      html += `
        <div class="color-result" id="color-${safeId}-value" style="background: ${hexValue}">
          <div class="color-hex-box">
            <h2 id="color-${safeId}-hex">${hexValue}</h2>
          </div>
        </div>`;
    }

    colorSpace.innerHTML = html;
  } catch (err) {
    console.error('pickColor error:', err);
    colorSpace.innerHTML = `<div class="msg error">Error cargando colores. Reintenta.</div>`;
  }
}

colorForm.addEventListener('submit', function (e) {
  e.preventDefault();
  pickColor();
});

// llamada inicial (si querés que cargue al abrir)
pickColor();
