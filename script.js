const container = document.querySelector('.container')
const pesquisar = document.querySelector('.caixaPesquisa button')
const climaDetalhes = document.querySelector('.detalhesClima')
const caixaClima = document.querySelector('.caixaClima')
const naoEncontrado = document.querySelector('.naoEncontrado')
const cidadeHide = document.querySelector('.cidadeHide')


pesquisar.addEventListener('click', () => {

    const Key = 'b29118e8d9e0b089aad7f12189895d0c'
    const cidade = document.querySelector('.caixaPesquisa input').value

    if (cidade == '')
    return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${Key}&lang=pt_br&units=metric`).then( resposta => resposta.json()).then( dados => {


        if (dados.cod == '404' ) {
            cidadeHide.textContent = cidade
            container.style.height = '460px'
            caixaClima.classList.remove('active')
            climaDetalhes.classList.remove('active')
            naoEncontrado.classList.add('active')
            return
        }     

        const image = document.querySelector('.caixaClima img')
        const temperatura = document.querySelector('.caixaClima .temperatura')
        const descricao = document.querySelector('.caixaClima .descricao')
        const umidade = document.querySelector('.detalhesClima .umidade span')
        const vento = document.querySelector('.detalhesClima .vento span')

        if (cidadeHide.textContent == cidade){
            return
        }
        else {
            cidadeHide.textContent = cidade

            container.style.height = '555px'
            container.classList.add('active')
            caixaClima.classList.add('active')
            climaDetalhes.classList.add('active')
            naoEncontrado.classList.remove('active')

            setTimeout (() =>{
                container.classList.remove('active')
            }, 2500)
            

        switch (dados.weather[0].main) {
            case 'Clear':
                image.src = 'imagens/clear.png'
                break
            
            case 'Rain':
                image.src = 'imagens/rain.png'
                break

            case 'Snow':
                image.src = 'imagens/snow.png'
                break
                
            case 'Clouds':
                image.src = 'imagens/cloud.png'
                break

            case 'mist':
                image.src = 'imagens/mist.png'
                break

            case 'Haze':
                image.src = 'imagens/mist.png'
                break

            default:
                image.src = 'imagens/cloud.png'
            }

        temperatura.innerHTML = `${parseInt(dados.main.temp)}<span>°C</span>`
        descricao.innerHTML = `${dados.weather[0].description}`
        umidade.innerHTML = `${dados.main.humidity}%`
        vento.innerHTML = `${parseInt(dados.wind.speed)}Km/h`

        const infoClima = document.querySelector('.infoClima')
        const infoUmidade = document.querySelector('.infoUmidade')
        const infoVento = document.querySelector('.infoVento')

        const cloneInfoClima = infoClima.cloneNode(true)
        const cloneInfoUmidade= infoUmidade.cloneNode(true)
        const cloneInfoVento= infoVento.cloneNode(true)

        cloneInfoClima.id = 'cloneInfoClima'
        cloneInfoClima.classList.add('activeClone')
        
        cloneInfoUmidade.id = 'cloneInfoUmidade'
        cloneInfoUmidade.classList.add('activeClone')

        cloneInfoVento.id = 'cloneInfoVento'
        cloneInfoVento.classList.add('activeClone')

        setTimeout(() => {
            infoClima.insertAdjacentElement("afterEnd", cloneInfoClima)
            infoUmidade.insertAdjacentElement("afterEnd", cloneInfoUmidade)
            infoVento.insertAdjacentElement("afterEnd", cloneInfoVento)
        }, 2200)

        const elCloneInfoClima = document.querySelectorAll('.infoClima.activeClone')
        const totalCloneInfoClima = elCloneInfoClima.length
        const elcloneInfoClimaFirst = elCloneInfoClima[0]

        const elCloneInfoUmidade = document.querySelectorAll('.infoUmidade.activeClone')
        const elcloneInfoUmidadeFirst = elCloneInfoUmidade[0]

        const elCloneInfoVento= document.querySelectorAll('.infoVento.activeClone')
        const elcloneInfoVentoFirst = elCloneInfoVento[0]

        if (totalCloneInfoClima > 0) {
            elcloneInfoClimaFirst.classList.remove('activeClone')
            elcloneInfoUmidadeFirst.classList.remove('activeClone')
            elcloneInfoVentoFirst.classList.remove('activeClone')

            setTimeout(() => {
                elcloneInfoClimaFirst.remove()
                elcloneInfoUmidadeFirst.remove()
                elcloneInfoVentoFirst.remove()
            }, 2200);

          }
        }
    })
})