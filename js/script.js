const campoPokemon = document.getElementById("campoPokemon")
const resultado = document.getElementById("resultado")
const btnPesquisar = document.getElementById("btnPesquisar")
const btnLimpar = document.getElementById("btnLimpar")
const mensagem = document.getElementById("mensagem")

// Capturamos o botão e aguardamos o evento de clique.
btnPesquisar.addEventListener("click", function () {

  // Armazena o valor digitado no campo.
  const pokemonDigitado = campoPokemon.value.toLowerCase()

  // Esconde uma mensagem de erro anterior.
  mensagem.style.display = "none"
  mensagem.innerHTML = ""

  // Limpa o resultado anterior.
  resultado.innerHTML = ""

  // Verifica se o campo está vazio.
  if (pokemonDigitado === "") {
    mensagem.innerHTML = "Digite o nome ou número de um Pokémon."
    mensagem.className = "mensagem mensagem-erro"
    mensagem.style.display = "block"
    return
  }

  // Armazena o endpoint da API e associa o valor digitado.
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonDigitado}`

  // Faz a chamada para a API.
  fetch(url)

    // Recebe a resposta da API.
    .then(function (resposta) {

      // Se o Pokémon não for encontrado, exibe uma mensagem.
      if (resposta.status === 404) {
        mensagem.innerHTML = "Pokémon não encontrado."
        mensagem.className = "mensagem mensagem-erro"
        mensagem.style.display = "block"
        return null
      }

      // Converte a resposta para JSON.
      return resposta.json()
    })

    // Recebe os dados já convertidos em JSON.
    .then(function (dados) {

      // Se a resposta anterior retornou null, encerra esta função.
      if (dados === null) {
        return
      }

      // Mostra no console todos os dados retornados pela API.
      console.log(dados)

      // O primeiro usa = para substituir o conteúdo anterior.
      // Os próximos usam += para adicionar novas informações.
      resultado.innerHTML = `
        <article class="pokemon-card">

          <div class="pokemon-visual">
            <img
              src="${dados.sprites.front_default}"
              alt="Imagem do Pokémon ${dados.name}"
              class="pokemon-imagem"
            >
          </div>

          <div class="pokemon-conteudo">

            <h2>${dados.name}</h2>

            <div class="info">
              Número da Pokédex: ${dados.id}
            </div>

            <div class="info">
              Altura: ${dados.height}
            </div>

            <div class="info">
              Peso: ${dados.weight}
            </div>

            <div class="info">
              Experiência base: ${dados.base_experience}
            </div>

            <div class="info">
              Tipo: ${dados.types[0].type.name}
            </div>

            <div class="info">
              Habilidade: ${dados.abilities[0].ability.name}
            </div>

          </div>

        </article>
      `
    })
})

// Limpa o campo, o resultado e a mensagem.
btnLimpar.addEventListener("click", function () {
  campoPokemon.value = ""
  resultado.innerHTML = ""
  mensagem.innerHTML = ""
  mensagem.style.display = "none"
})
