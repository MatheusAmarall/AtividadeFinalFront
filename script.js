let divFilme = document.querySelector('.div-filme')
let formulario = document.querySelector('.formulario')
let filme = document.querySelector('.form-control')
let paginaAnterior = document.querySelector('.paginaAnterior')
let proximaPagina = document.querySelector('.proximaPagina')

let currentPage = 1;

async function getFilmes(page) {
    await fetch(`https://www.omdbapi.com/?s=${filme.value}&apikey=e6c43dc6&page=${page}`)
    .then(async (response) => {
        const data = await response.json()
        console.log(data)
        
        divFilme.innerHTML = "";
        if(data.Response === "True") {
            data.Search.forEach((filme) => {
                divFilme.innerHTML += `
                    <div>
                        <img src="${filme.Poster}" alt="${filme.Title}"></img>
                        <h5>${filme.Title}</h5>
                    </div>
                `
            })
    
            paginaAnterior.classList.toggle('disabled', currentPage === 1);
            proximaPagina.classList.toggle('disabled', currentPage >= Math.ceil(data.totalResults / 10));

        }
        else {
            alert("Filme não encontrado")
            paginaAnterior.classList.add('disabled')
            proximaPagina.classList.add('disabled')
        }
        
    })
    .catch((err) => {
        console.log("erro", err)
    })
}

paginaAnterior.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      getFilmes(currentPage);
    }
});
  
proximaPagina.addEventListener('click', () => {
    currentPage++;
    getFilmes(currentPage);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    if(filme.value !== "") {
        currentPage = 1;
        getFilmes(currentPage)
    }
    else {
        alert("Digite o nome de um filme!")
    }
})