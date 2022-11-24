const input_cep = document.getElementById('consultar_cep');
const enviar_consulta = document.getElementById('enviar_consulta');
const retorno_box = document.createElement('div');
const salvar_cache = JSON.parse(localStorage.getItem("salvar_cache")) || [] ;

retorno_box.style.marginTop = "20px";
retorno_box.style.width = "650px";
retorno_box.style.height = "80vh";
retorno_box.style.background = "#ffffffff";
retorno_box.style.padding = "10px";
retorno_box.style.borderRadius = "20px";
retorno_box.style.overflow = "scroll";
retorno_box.style.overflowX = "hidden";
document.body.appendChild(retorno_box);

enviar_consulta.addEventListener('click', (evento)=>{
    evento.preventDefault()
    if(input_cep.value === ""){
        return false;
    }else{
        buscarCep();
    }
})

async function buscarCep(){
    let consultaCep = await fetch(`https://viacep.com.br/ws/${input_cep.value}/json/`);
    let consultaCepConvert = await consultaCep.json();

    const div_labels = document.createElement('div');
    const info_cep = document.createElement('label');
    const retorno = document.createElement('label');
    
    if(input_cep.value.includes('-') === false){
        info_cep.innerHTML = (input_cep.value).slice(0,5) + '-' + (input_cep.value).slice(5);
    }else{
        info_cep.innerHTML = input_cep.value;
    }

    const corAleatoria = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    
    info_cep.style.color = "black";
    info_cep.style.background = corAleatoria;
    info_cep.style.padding = "2px 5px";
    info_cep.style.color = "black";
    info_cep.style.float = "left";

    //Cria cada div com um endereço e cep
    div_labels.style.display = "flex";
    div_labels.style.justifyContent = "space-between";
    div_labels.style.alignItems = "center";
    div_labels.style.borderRadius = "10px";
    div_labels.style.textAlign = "center";
    div_labels.style.wordBreak = "break";
    div_labels.style.background = "white";
    div_labels.style.padding = "10px 10px";
    div_labels.style.color = "black";
    div_labels.style.border = "1px solid black";
    div_labels.style.marginTop = "4px";

    const link = document.createElement('a');
    var link_img = document.createElement('img');
    link_img.src = "assets/map.svg"
    link.href = `https://www.google.com.br/maps/search/${input_cep.value + " " + consultaCepConvert.logradouro + ', ' + consultaCepConvert.bairro + ', ' + consultaCepConvert.localidade}`;
    link.target = "_blank";
    link.appendChild(link_img);

    link_img.style.width = "30px"
    link.style.float = "right";

    if(consultaCepConvert.logradouro === undefined){
        retorno.innerHTML = "CEP INEXISTENTE OU INCORRETO";
        link.style.visibility = "hidden"
    }else{
        retorno.innerHTML = consultaCepConvert.logradouro + ', ' + consultaCepConvert.bairro + ', ' + consultaCepConvert.localidade + ', ' + consultaCepConvert.uf;
        link.style.visibility = "show"
    }

    
    div_labels.appendChild(info_cep);
    div_labels.appendChild(retorno);
    div_labels.appendChild(link);
    
    retorno_box.appendChild(div_labels);

    retorno_box.scrollTop = retorno_box.scrollHeight;
}