const lista = document.getElementById('lista')


const apiUrl = 'http://localhost:3000/musicas';


let edicao = false;
let idEdicao = 0;


let titulo = document.getElementById('titulo');
let genero = document.getElementById('genero');
let logo = document.getElementById('logo');
let cantor = document.getElementById('cantor');
let ano = document.getElementById('ano');
let descricao = document.getElementById('descricao');
let nota = document.getElementById('nota');



const getMusicas = async () => {
    
    const response = await fetch(apiUrl)
    
    const musicas = await response.json();

    

    
    musicas.map((musica) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${musica.logo}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${musica.titulo} - ${musica.genero}</h5>
                <span class="badge bg-primary">${musica.ano}</span>
                <p class="card-text">R$ ${musica.cantor}</p>
                <p class="card-text">${musica.descricao}</p>
                <div>
                    <button class="btn btn-primary" onclick="editMusica('${musica.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteMusica('${musica.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}



const submitForm = async (event) => {
    
    event.preventDefault();

    
    const musica = {
        titulo: titulo.value,
        genero: genero.value,
        logo: logo.value,
        cantor: cantor.value,
        ano: ano.value,
        descricao: descricao.value,
        nota: nota.value
    }
    

    if(edicao) {
        putMusica(musica, idEdicao);
    } else {
        createMusica(musica);
    }

    clearFields();
    lista.innerHTML = '';
}

const createMusica = async(musica) => {
    
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(musica),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    
    const response = await fetch(request);

    const result = await response.json();
    
    alert(result.message)
    
    getMusicas();

}

const putMusica = async(musica, id) => {
    
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(musica),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    
    const response = await fetch(request);

    const result = await response.json();
    
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getMusicas();
}



const deleteMusica = async (id) => {
    
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getMusicas();
}



const getMusicaById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}



const editMusica = async (id) => {
    
    edicao = true;
    idEdicao = id;

    
    const musica = await getMusicaById(id);

    
    titulo.value = musica.titulo;
    genero.value =  musica.genero;
    logo.value = musica.logo;
    cantor.value = musica.cantor;
    ano.value = musica.ano;
    descricao.value = musica.descricao;
    nota.value = musica.nota;
}


const clearFields = () => {
    titulo.value = '';
    genero.value = '';
    logo.value = '';
    cantor.value = '';
    ano.value = '';
    descricao.value = '';
    nota.value = '';
}

getMusicas();