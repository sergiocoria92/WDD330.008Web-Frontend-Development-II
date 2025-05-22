// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderWithTemplate (template, parentElement, data, callback){
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
}}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
} 
export async function loadHeaderFooter (){
const headerTemplate = await loadTemplate("./public/partials/header.html");
const headerElement = document.querySelector("#main-header");
const footerTemplate = await loadTemplate("./public/partials/footer.html");
const footerElement = document.querySelector("#main-footer");
renderWithTemplate(headerTemplate, headerElement);
renderWithTemplate(footerTemplate, footerElement);

}



/*import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const loadPartial = async (elementId, partialPath) => {
  try {
    const response = await fetch(partialPath);
    if (!response.ok) throw new Error(`Failed to load ${partialPath}: ${response.status}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
    
    // Verifica si hay imágenes en el partial cargado
    const images = document.getElementById(elementId).querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete || img.naturalHeight === 0) {
        console.warn('Image failed to load:', img.src);
      }
    });
  } catch (error) {
    console.error(error);
    document.getElementById(elementId).innerHTML = `
      <div class="error-message">
        Error loading ${partialPath.split('/').pop()}. 
        <button onclick="location.reload()">Reload Page</button>
      </div>
    `;
  }
};*/
 
/*
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar partials en paralelo
    await Promise.all([
      loadPartial('main-header', './public/partials/header.html'),
      loadPartial('main-footer', './public/partials/footer.html')
    ]);

    // Inicializar sistema de productos
    const dataSource = new ProductData("tents");
    const productListElement = document.querySelector(".product-list");
    
    if (productListElement) {
      const productList = new ProductList("Tents", dataSource, productListElement);
      productList.init();
    } else {
      console.warn('Product list element not found');
    }

  } catch (error) {
    console.error('Initialization error:', error);
  }
});*/