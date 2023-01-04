const input_cep = document.getElementById('consultar_cep');
const enviar_consulta = document.getElementById('enviar_consulta');
const retorno_box = document.createElement('div');

const style_retorno_box = {
    width: '50vw',
    height: '50vh',
    background: '#ffffffff',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '0 0 20px 20px',
    overflow: 'scroll',
    overflowX: 'hidden',
    scrollBehavior: 'smooth'
};
Object.assign(retorno_box.style, style_retorno_box);

document.body.appendChild(retorno_box);

enviar_consulta.addEventListener('click', (evento)=>{
    evento.preventDefault()
    if(input_cep.value === "" | input_cep.value.length >= 9 & !input_cep.value.includes('-')| input_cep.value.length < 8){
        return false;
    }else{
        buscarCep();
    }
});

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
    
    const styles_info_cep = {
        color: 'black',
        background: corAleatoria,
        padding: '2px 5px',
        color: 'black',
        float: 'left'
    };
    Object.assign(info_cep.style, styles_info_cep);

    //Cria cada div com um endereço e cep
    const styles_div_labels = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '10px',
        textAlign: 'center',
        wordBreak: 'break',
        background: 'white',
        padding: '10px 10px',
        color: 'black',
        border: '1px solid black',
        marginTop: '4px'
    };
    Object.assign(div_labels.style, styles_div_labels);

    const link = document.createElement('a');
    var link_img = document.createElement('img');
    link_img.src = "assets/map.svg";
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
    
    console.log(retorno_box)
    retorno_box.appendChild(div_labels);
    retorno_box.scrollTop = retorno_box.scrollHeight;
}