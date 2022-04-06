import ProductPage from './ProductPage.js';

const $target = document.querySelector('.app');
const DEFAULT_PRODUCT_ID = 1;

new ProductPage({
  $target,
  initialState: {
    productId: DEFAULT_PRODUCT_ID,
  },
});
