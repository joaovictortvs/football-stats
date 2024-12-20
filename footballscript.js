let btns = document.querySelectorAll(".btn_background")
const btn_ligas = [...btns]

let liga = null
let creatingTable = false

btn_ligas.forEach((el)=>{
    el.addEventListener("click",(evt)=>{
        let liga = evt.target.getAttribute('data-identificador')
        const endpoint = `https://football-standings-api.vercel.app/leagues/${liga}/standings`;

        if(creatingTable){
            return
        }

        creatingTable = true
        async function apiResponse(){
            try{
                const res = await fetch(endpoint)
                const data = await res.json()
                const times = data.data.standings
                times.forEach((el)=>{
                    createTable(el)
                })
            } catch(erro){
                tableCatch(erro)
            } finally{
                creatingTable = false
            }
        }
        apiResponse() 
    })
})

const btnVoltar = document.querySelector("#btnVoltarLigas")

let pagina_inicial = true

btnVoltar.addEventListener("click",()=>{
    pagina_inicial = true
    const tbody = document.querySelector("#tbody")
    tbody.innerHTML = " "
    const divLigas = document.querySelector("#divLigas")
    divLigas.classList.remove("ocultar")
    const divTabela = document.querySelector("#tabelaExibir")
    divTabela.classList.add("ocultar")
   
})


const createTable=(time)=>{
    if(pagina_inicial == true){
        pagina_oficial = false
        const divLigas = document.querySelector("#divLigas")
        divLigas.classList.add("ocultar")
        const divTabela = document.querySelector("#tabelaExibir")
        divTabela.classList.remove("ocultar")
    
        const tbody = document.querySelector("#tbody")
    
        const tr_linha = document.createElement("tr")
        tbody.appendChild(tr_linha)
    
        const td_pos = document.createElement("td")
        td_pos.innerHTML = `${time.stats[10].value}°`
        tr_linha.appendChild(td_pos)
        
        const td_imgName = document.createElement("td")
        td_imgName.setAttribute("id","tdImg")
        const div_img = document.createElement("div")
        div_img.setAttribute("id","tdImagem")
        const img_tdImgName = document.createElement("img")
        img_tdImgName.setAttribute("src",time.team.logos[0].href)
        div_img.appendChild(img_tdImgName)
        td_imgName.appendChild(div_img)
    
        const div_tdImgName = document.createElement("div")
        div_tdImgName.setAttribute("id","tdNome")
        div_tdImgName.innerHTML = time.team.abbreviation
        td_imgName.appendChild(div_tdImgName)
        tr_linha.appendChild(td_imgName)
    
        const td_pontos = document.createElement("td")
        td_pontos.innerHTML = time.stats[3].value
        tr_linha.appendChild(td_pontos)
    
        const td_vitorias = document.createElement("td")
        td_vitorias.innerHTML = time.stats[7].value
        tr_linha.appendChild(td_vitorias)
    
        const td_derrotas = document.createElement("td")
        td_derrotas.innerHTML = time.stats[1].value
        tr_linha.appendChild(td_derrotas)
    
        const td_sdGols = document.createElement("td")
        td_sdGols.innerHTML = time.stats[2].value
        tr_linha.appendChild(td_sdGols)
    }

}

const tableCatch=(erro)=>{
    if(pagina_inicial == true){
        pagina_inical = false

        const divLigas = document.querySelector("#divLigas")
        divLigas.classList.add("ocultar")
        const divTabela = document.querySelector("#tabelaExibir")
        divTabela.classList.remove("ocultar")

        const tbody = document.querySelector("#tbody")

        const divCatch = document.createElement("div")
        divCatch.setAttribute("class","catch")
        tbody.appendChild(divCatch)

        const h3 = document.createElement("h3")
        h3.innerHTML = "Não foi possível acessar os dados da API!"
        divCatch.appendChild(h3)

        const p = document.createElement("p")
        p.innerHTML = "Tente novamente mais tarde."
        divCatch.appendChild(p)
    }
}