document.addEventListener("DOMContentLoaded", () => {
    let livros = JSON.parse(localStorage.getItem('livros')) || [];

    function salvarLivros() {
        localStorage.setItem('livros', JSON.stringify(livros));
    }

    // Event listeners para os botões do menu
    document.getElementById('btn-cadastrar').addEventListener('click', () => {
        mostrarFormulario('form-cadastrar');
    });

    document.getElementById('btn-consultar').addEventListener('click', () => {
        mostrarFormulario('form-consultar');
    });

    document.getElementById('btn-listar').addEventListener('click', () => {
        document.getElementById('list-container').style.display = 'block';
        atualizarListaLivros();
    });

    document.getElementById('btn-apagar').addEventListener('click', () => {
        mostrarFormulario('form-apagar');
        exibirLivrosParaApagar();
    });

    // Função para exibir formulário específico baseado no ID fornecido
    function mostrarFormulario(formId) {
        // Seleciona todos os formulários
        const forms = document.querySelectorAll('.form-container');
        // Esconde todos os formulários
        forms.forEach((form) => (form.style.display = 'none'));
        // Mostra o formulário específico baseado no ID
        const formToShow = document.getElementById(formId);
        if (formToShow) {
            formToShow.style.display = 'block';
        }
    }

    // Esconde o container da lista de livros inicialmente
    document.getElementById('list-container').style.display = 'none';

    document.getElementById('btn-submit-cadastrar').addEventListener('click', function () {
        // Valores de entrada do formulário
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const capa = document.getElementById('capa').files[0];

        // Verifica se o campo título está preenchido
        if (titulo) {
            // Se houver capa
            if (capa) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Adiciona o livro com a imagem da capa à lista de livros
                    livros.push({ titulo, autor, capa: e.target.result });
                    salvarLivros();
                    alert('Livro Cadastrado com Sucesso!');
                    // Limpa os campos do formulário
                    document.getElementById('titulo').value = '';
                    document.getElementById('autor').value = '';
                    document.getElementById('capa').value = '';
                };
                reader.readAsDataURL(capa);
            } else {
                // Adiciona o livro sem imagem da capa à lista de livros
                livros.push({ titulo, autor, capa: null });
                salvarLivros();
                alert('Livro Cadastrado com Sucesso!');
                // Limpa os campos do formulário
                document.getElementById('titulo').value = '';
                document.getElementById('autor').value = '';
            }
        } else {
            alert('Preencha o campo título!');
        }
    });

    // Função para atualizar lista de livros
    function atualizarListaLivros() {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';
        livros.forEach((livro, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${livro.titulo} - ${livro.autor}`;
            bookList.appendChild(listItem);
        });
    }

    // Função para exibir livros para apagar
    function exibirLivrosParaApagar() {
        const apagarList = document.getElementById('apagar-list');
        apagarList.innerHTML = '';
        livros.forEach((livro, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<input type="checkbox" class="livro-checkbox" data-index="${index}"> ${livro.titulo} - ${livro.autor}`;
            apagarList.appendChild(listItem);
        });
    }

    // Função para apagar livros selecionados
    document.getElementById('btn-submit-apagar').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.livro-checkbox');
        const indicesParaApagar = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                indicesParaApagar.push(parseInt(checkbox.getAttribute('data-index')));
            }
        });
        indicesParaApagar.sort((a, b) => b - a).forEach(index => {
            livros.splice(index, 1);
        });
        salvarLivros();
        alert('Livros Apagados com Sucesso!');
        exibirLivrosParaApagar();
    });

    // Função para selecionar/deselecionar todos os checkboxes
    document.getElementById('select-all').addEventListener('change', function () {
        const checkboxes = document.querySelectorAll('.livro-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
});
