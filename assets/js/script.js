function start(){

  // Desabilitar o Botão iniciar
  document.getElementById("btn-iniciar-jogo").style.display = 'none';
  document.getElementById("msgGameOver").innerHTML = '';

  // Carregamento de Audios
  var somJogada = document.getElementById("jogada");
  var somFinal = document.getElementById("final");
  var somMusicaFundo = document.getElementById("musica_fundo");

  // Inicia fundo musical
  somFinal.pause()
  somFinal.currentTime = 0;        
  somMusicaFundo.play();
  somMusicaFundo.currentTime = 0;    

  // Carregamento de Telas
  const dino = document.querySelector('.dino');
  const background = document.querySelector('.background');
  
  let isJumping = false;
  let isGameOver = false;
  let position = 0;
  
  function saltoKeyPress(event) {
    if (event.keyCode === 32) {
      if (!isJumping) {
        jump();
      }
    }
  }
  
  function jump() {

    somJogada.play();
    somJogada.currentTime = 0;        

    isJumping = true;
  
    let upInterval = setInterval(() => {
      if (position >= 150) {
        // Descendo
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (position <= 0) {
            clearInterval(downInterval);
            isJumping = false;
          } else {
            position -= 20;
            dino.style.bottom = position + 'px';
          }
        }, 20);
      } else {
        // Subindo
        position += 20;
        dino.style.bottom = position + 'px';
      }
    }, 20);
  }
  
  function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
  
    if (isGameOver) return;
  
    cactus.classList.add('cactus');
    background.appendChild(cactus);
    cactus.style.left = cactusPosition + 'px';
  
    let leftTimer = setInterval(() => {
      if (cactusPosition < -60) {
        // Saiu da tela
        clearInterval(leftTimer);
        background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {

        // Game over
        clearInterval(leftTimer);
        isGameOver = true;
        gameOver()

      } else {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';
      }
    }, 20);
  
    setTimeout(createCactus, randomTime);
  }

  function gameOver(){

    // Mostra Botão e Título
    document.getElementById("btn-novo-jogo").style.display = 'block';
    document.getElementById("msgGameOver").innerHTML = 'Fim de Jogo';

    // Música - Final
    somMusicaFundo.pause()
    somMusicaFundo.currentTime = 0;        
    somFinal.play();
    somFinal.currentTime = 0;

    let cactusAtivos = document.getElementsByClassName('cactus');
    if (cactusAtivos.length > 0){
      for(i in cactusAtivos){
        try{
          background.removeChild(cactusAtivos[i]);
        } catch (e) {}
      }
    }

  }
  
  createCactus();
  document.addEventListener("keypress", saltoKeyPress);

}
function novoJogo() {
  window.location.reload(1);
}