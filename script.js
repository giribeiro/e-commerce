$(document).ready(function () {
  const getProductList = () => {
    $.get('https://diwserver.vps.webdock.cloud/products', function (response) {
      const results = $('#product-list');

      results.empty();

      const { products } = response;

      if (products.length > 0) {
        for (let i = 0; i < 9; i++) {
          let product = products[i];

          let html = `
              <div class="card col-sm-3">
                <img src="${product.image}" class="card-img-top img-container" alt="Pão de queijo" />
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">R$ ${product.price}</p>
                  <a href="detalhes.html?id=${product.id}" class="btn btn-secondary">Detalhes</a>
                </div>
              </div>
          `;

         
          results.append(html);
        }
      } else {
        results.append('<p class="text-center">Nenhum produto encontrado.</p>');
      }
    });
  };

  const mostWanted = () => {
    $.get('https://diwserver.vps.webdock.cloud/products?page=25', function (response) {
      const table = $('#table')
      const { products } = response;

      if (products.length > 0) {
        for (let i = 0; i < 9; i++) {
          let product = products[i];

          let tr = `
            <tr>
              <td>${i + 1}</td>
              <td>${product.title}</td>
              <td>R$${product.price}</td>
            </tr>
          `
          table.append(tr)
        }
      } else {
        table.append('<p class="text-center">Nenhum produto encontrado.</p>');
      }
    });
  }

  const searchProducts = () => {
    let searchInput = $('#searchInput').val();

    $.get('https://diwserver.vps.webdock.cloud/products/search?query=' + searchInput, function (products) {
      let results = $('#product-list');
      const clear = $('#clear')
      results.empty();
      clear.empty();
      clear.removeClass()

      if (products.length > 0) {
        for (let i = 0; i < products.length; i++) {
          let product = products[i];
          let html = `
            <div class="col-md-4 col-sm-6 mt-2">
              <div class="card card-container card-hover p-3">
                <img src="${product.image}" class="card-img-top img-container" alt="Pão de queijo" />
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">R$ ${product.price}</p>
                  <a href="detalhes.html?id=${product.id}" class="btn btn-secondary">Detalhes</a>
                </div>
              </div>
            </div>
          `;
          results.append(html);
        }
      } else {
        results.append('<p class="text-center">Nenhum produto encontrado.</p>');
      }
    });
  };

  const getCategories = () => {
    $.get('https://diwserver.vps.webdock.cloud/products/categories', function (categories) {
      let select = $('#select');
      categories.forEach(function (category) {
        select.append('<option class="bg-light" style="color: black;" value="' + category + '">' + category + '</option>');
      });
    });
  };

  const filterByCategory = () => {
    let selectedCategory = $('#select').val();

    console.log(selectedCategory + 'aaaaaa')

    if (selectedCategory) {
      $.get('https://diwserver.vps.webdock.cloud/products/category/' + selectedCategory, function (response) {
        let results = $('#product-list');
        const clear = $('#clear')
        results.empty();
        clear.empty();
        clear.removeClass()

        const { products } = response;

        if (products.length > 0) {
          for (let i = 0; i < products.length; i++) {
            let product = products[i];
            let html = `
              <div class="col-md-4 col-sm-6 mt-2">
                <div class="card card-container card-hover p-3">
                  <img src="${product.image}" class="card-img-top img-container" alt="Pão de queijo" />
                  <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">R$ ${product.price}</p>
                    <a href="detalhes.html?id=${product.id}" class="btn btn-secondary">Detalhes</a>
                  </div>
                </div>
              </div>
            `;
            results.append(html);
          }
        } else {
          results.append('<p class="text-center">Nenhum produto encontrado.</p>');
        }
      });
    }
  };

  getProductList();
  mostWanted();

  $('#searchButton').click(searchProducts);

  $('#select').change(filterByCategory);

  getCategories();
});
