//Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
   let livros = JSON.parse(localStorage.getItem('livros')) || [];

   function salvarLivros(){
         localStorage.setItem('livros', JSON.stringify(livros));
   }

//Função para exibir formulário específico baseado no ID fornecido
function showForm (formId){ 
    //Seleciona todos os formulários
    const forms = document.querySelectorAll('form-container');
    //Esconde todos os formulários
    forms.forEach((form) => (form.computedStyleMap.display = 'none'));
    //Mostra o formulário específico baseado no ID
    const formToShow = document.getElementById(`form-${formId}`);
    if (formToShow){
        formToShow.style.display = 'block';
    }
}

//Esconde o container da lista de livros
document.getElementById ('list-container').style.display = 'none';


//Se o formulário for o de apagar, exibir os livros para apagar
if (formId == "apagar"){
    exibirLivrosParaApagar();
}

function cadastrarLivro () {
    //Valores de entrada do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const capa = document.getElementById('capa').files[0];

    //Verifica se o campo titulo está preenchido
    if(titulo){
        //Se houver capa
        if(capa){
            const reader = new FileReader();
            reader.onload = function (e){
                //Adiciona o livro com a imagem da capa à lista de livros
                livros.push({ titulo, autor, capa: e.target.result });
                salvarLivros();
                alert('Livro Cadastrado com Sucesso!');
                //Limpa os campos do formulário
                document.getElementById('titulo').value = '';
                document.getElementById('autor').value = '';
                document.getElementById('capa').value = '';
            };
            reader.readAsDataURL(capa);
        }else{
            //Adiciona o livro sem imagem da capa à lista de livros
            livros.push({ titulo, autor, capa: null});
            salvarLivros();
            alert('Livro Cadastrado com Sucesso!');
            //Limpa os campos do formulário
            document.getElementById('titulo').value = '';
            document.getElementById('autor').value = '';
        }
    }else{
        alert('Preencha o campo título!');
    }
}//Fim da função de cadastro

//Adiciona  eventos aos botões
    document.getElementById('btn-cadastrar').addEventListener('click',() => showForm('cadastrar'));

    document.getElementById('btn-consultar').addEventListener('click', () => showForm('consultar'));


//Recarrega a página ao clicar em "Listar Livros" para exibir a lista de livros
document.getElementById('btn-listar').addEventListener('click', () => {
    localStorage.setItem('book-list', 'true');
    location.reload();
});

document.getElementById ('btn-apagar').addEventListener('click', () => showForm('apagar'));

//Adiciona eventos aos botões dos formulários
document.getElementById('btn-submit-cadastrar').addEventListener('click', cadastrarLivro );
document.getElementById('btn-submit-consultar').addEventListener('click', consultarLivro);
document.getElementById('btn-submit-apagar').addEventListener('click', apagarLivro);

//Verificar se a página foi carregada para listar os livros
if(localStorage.getItem('book-list') === 'true'){
    showForm ();
    localStorage.removeItem('book-list');
}; 


});//Final do JS
