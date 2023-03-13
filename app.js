var mapa = L.map('mapa').setView([36.72071131817986, -4.420041081375409], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data[24].properties.nombre);
        const tbody = document.querySelector("#elementos");
        const template = document.querySelector('#lista');
        for (let i = 0; i < data.length; i++) {
            const clone = template.content.cloneNode(true);
            let nombre = clone.getElementById('nombres')
            let horario = clone.getElementById('horarios')
            let direccion = clone.getElementById('direccion')
            let telefono = clone.getElementById('telefono')
            if (data[i].properties.telefono) { // para q cuando no tenga tlf no ponga el style 
                telefono.textContent = data[i].properties.telefono;
              } else {
                telefono.textContent = "";
                telefono.style.display = "none";
              }
            nombre.textContent = data[i].properties.nombre;
            horario.textContent = data[i].properties.horario;
            direccion.textContent = data[i].properties.direccion;
            tbody.appendChild(clone);

            var marcador = L.marker([data[i].properties.x, data[i].properties.y]).addTo(mapa);
            marcador.bindPopup(`${data[i].properties.nombre}`);
        }
    })



