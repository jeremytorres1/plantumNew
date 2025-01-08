document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    fetchWikipediaArticle(query);
});

document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const query = event.target.value;
        fetchWikipediaArticle(query);
    }
});

function fetchWikipediaArticle(query) {
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.title && data.extract) {
                document.getElementById('article-title').textContent = data.title;
                document.getElementById('article-content').textContent = data.extract;
            } else {
                document.getElementById('article-title').textContent = 'Artículo no encontrado';
                document.getElementById('article-content').textContent = 'Lo sentimos, no se encontró ningún artículo relacionado con tu búsqueda.';
            }
        })
        .catch(error => {
            console.error('Error al obtener el artículo de Wikipedia:', error);
            document.getElementById('article-title').textContent = 'Error';
            document.getElementById('article-content').textContent = 'Hubo un error al intentar obtener el artículo de Wikipedia.';
        });
}