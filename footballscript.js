let btns = document.querySelectorAll(".btn_background")
const btn_ligas = [...btns]

let liga = null

btn_ligas.forEach((el)=>{
    el.addEventListener("click",(evt)=>{
        let liga = evt.target.getAttribute('data-identificador')
        const url = `https://football-standings-api.vercel.app/leagues/${liga}/standings`;
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            let response = res
            const times = response.data.standings
            times.forEach((el)=>{
                createTable(el)
            })
        })

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



// esp.1 (la liga) bra.1(brasileirao) bra.2 (brasileirao serie b) eng.1(premierleague) fra.1(ligue 1) ger.1(bundesliga) ita.1(serie a) por.1(portugal) arg.1(liga argentina)

// <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td id="tdImg"> <div id="tdImagem"><img src="img/laliga.png" alt=""></div><div id="tdNome">BOT</div></td>
//                             <td>79</td>
//                             <td>28</td>
//                             <td>3</td>
//                             <td>30</td>
//                         </tr>
//                         <tr>
//                             <td>1</td>
//                             <td id="tdImg"> <img src="img/laliga.png" alt="">BOT</td>
//                             <td>79</td>
//                             <td>28</td>
//                             <td>3</td>
//                             <td>30</td>
//                         </tr>
//                         <tr>
//                             <td>1</td>
//                             <td id="tdImg"> <img src="img/laliga.png" alt="">BOT</td>
//                             <td>79</td>
//                             <td>28</td>
//                             <td>3</td>
//                             <td>30</td>
//                         </tr>
//                     </tbody>