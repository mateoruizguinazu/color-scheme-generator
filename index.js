const colorForm = document.getElementById('color-form')

function pickColor(){ // Esta funcion sirve para hacer el pick de color, y fetch en API otros 4 colores
    const colorFormData = new FormData(colorForm)

    const colorHex = colorFormData.get('colorPicker').replace('#','')
    const colorMode = colorFormData.get('colorScheme')

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${colorMode}&count=4`)
        .then(res => res.json())
        .then(json => {
            colors = json.colors

            for (color of colors){
                const hexValue = color.hex.value
                console.log(`El color es ${hexValue}`)
            }
    })
}





colorForm.addEventListener('submit', function(e){ // Esta es la funcion para activar la funcionalidad cuando se submitea el form
    e.preventDefault()
    pickColor()
})




pickColor()