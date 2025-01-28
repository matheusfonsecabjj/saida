// Verificar se o usuário está logado
const isLoggedIn = localStorage.getItem("isLoggedIn");
if (!isLoggedIn) {
    window.location.href = "https://matheusfonsecabjj.github.io/login/";
}


// Alternar o menu
function toggleMenu() {
    const menu = document.querySelector('nav .menu');
    menu.classList.toggle('active');
}

// Lista de produtos a excluir
let produtosAExcluir = JSON.parse(localStorage.getItem('produtosAExcluir')) || [];

// Adicionar produto à lista de exclusão
function adicionarProdutoParaExcluir() {
    const skuInput = document.getElementById('skuInput').value;
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos.find(p => p.sku === skuInput);

    if (produto) {
        if (!produtosAExcluir.some(p => p.sku === produto.sku)) {
            produtosAExcluir.push(produto);
            localStorage.setItem('produtosAExcluir', JSON.stringify(produtosAExcluir));
            atualizarListaExclusao();
            document.getElementById('skuInput').value = '';
        } else {
            alert("Este produto já está na lista de exclusão.");
        }
    } else {
        alert('Produto não encontrado para o SKU fornecido.');
    }
}

// Atualizar a lista de exclusão na tabela
function atualizarListaExclusao() {
    const produtosExclusaoDiv = document.getElementById('produtosExclusao');
    produtosExclusaoDiv.innerHTML = '';

    if (produtosAExcluir.length > 0) {
        produtosAExcluir.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.codigo}</td>
                <td>${produto.produto}</td>
                <td>${produto.cor}</td>
                <td>${produto.espessura}</td>
                <td>${produto.peso}</td>
                <td>${produto.sku}</td>
                <td><button onclick="removerProdutoDeExclusao('${produto.sku}')">Remover</button></td>
            `;
            produtosExclusaoDiv.appendChild(linha);
        });
        document.getElementById('btnExcluirTodos').style.display = 'inline-block';
    } else {
        document.getElementById('btnExcluirTodos').style.display = 'none';
    }

    document.getElementById('quantidadeExcluidos').innerText = `Quantidade de produtos na lista: ${produtosAExcluir.length}`;
}

// Remover produto da lista de exclusão
function removerProdutoDeExclusao(sku) {
    produtosAExcluir = produtosAExcluir.filter(produto => produto.sku !== sku);
    localStorage.setItem('produtosAExcluir', JSON.stringify(produtosAExcluir));
    atualizarListaExclusao();
}

// Excluir todos os produtos selecionados
function excluirProdutosSelecionados() {
    const confirmacao = confirm('Tem certeza que deseja excluir todos os produtos selecionados?');
    if (confirmacao) {
        let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtosAExcluir.forEach(produto => {
            produtos = produtos.filter(p => p.sku !== produto.sku);
        });

        localStorage.setItem('produtos', JSON.stringify(produtos));
        alert('Produtos excluídos com sucesso!');
        produtosAExcluir = [];
        localStorage.setItem('produtosAExcluir', JSON.stringify(produtosAExcluir));
        atualizarListaExclusao();
    }
}

// Atualizar lista ao carregar a página
atualizarListaExclusao();
