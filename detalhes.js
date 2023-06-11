$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    $.getJSON(`https://diwserver.vps.webdock.cloud/products/${productId}`)
      .done(function(data) {
        const product = {
          title: data.title,
          description: data.description,
          price: data.price,
          brandName: data.brandName,
          category: data.category,
          rating: data.rating.rate,
          image: data.image
        };

        const cardHtml = `
          <div class="card card-container">
          <img src="${product.image}" class="card-img-top img-container" alt="${product.title}" />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Preço: R$ ${product.price}</p>
              <p class="card-text">Categoria: ${product.category}</p>
              <p class="card-text">Rating: ${product.rating}</p>
            </div>
          </div>
        `;

        $('#product').html(cardHtml);
      })
      .fail(function(error) {
        console.log('Ocorreu um erro ao buscar os detalhes do produto:', error);
        $('#productNotFound').text('Ocorreu um erro ao buscar os detalhes do produto.');
      });
  } else {
    $('#productNotFound').text('ID do produto não fornecido.');
  }
});
