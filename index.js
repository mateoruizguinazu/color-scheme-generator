const colorForm = document.getElementById('color-form')
const colorSpace = document.getElementById('color-space')

function pickColor(){ // Esta funcion sirve para hacer el pick de color, y fetch en API otros 4 colores
    const colorFormData = new FormData(colorForm)

    const colorHex = colorFormData.get('colorPicker').replace('#','')
    const colorMode = colorFormData.get('colorScheme')

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${colorMode}&count=4`)
        .then(res => res.json())
        .then(json => {
            colors = json.colors

            let html = `
                <div class="color-result" id="color-base-value" style="background: #${colorHex}">
                    <div class="color-hex-box">
                        <h2 id="color-base-hex">#${colorHex}</h2>
                    </div>
                </div>`

            for (color of colors){
                const hexValue = color.hex.value
                html += `
                    <div class="color-result" id="color-${color}-value" style="background: ${hexValue}">
                        <div class="color-hex-box">
                            <h2 id="color-${color}-hex">${hexValue}</h2>
                        </div>
                    </div>`
            }
            colorSpace.innerHTML = html
    })
}


colorForm.addEventListener('submit', function(e){ // Esta es la funcion para activar la funcionalidad cuando se submitea el form
    e.preventDefault()
    pickColor()
})




pickColor()