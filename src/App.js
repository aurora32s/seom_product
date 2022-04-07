import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';

export default function App({ $target }) {
  const homePage = new HomePage({ $target });
  const productPage = new ProductPage({ $target, initialState: {} });

  this.route = () => {
    // 여기서 pathname에 따라 Page component 렌더링 처리
    const { pathname } = location;
    console.log(pathname);
    $target.innerHTML = '';

    if (pathname === '/') {
      // Homepage
      homePage.render();
    } else if (pathname.indexOf('/products/') > -1) {
      // ProductPage
      const [, , productId] = pathname.split('/');
      productPage.setState({
        productId,
      });
    } else {
      // 404 처리
      $target.innerHTML = '<h1>404 Not Found!</h1>';
    }
  };
  this.init = () => {
    this.route();
  };

  window.addEventListener('click', (event) => {
    if (event.target.className === 'link') {
      event.preventDefault();
      const { href } = event.target;

      history.pushState(null, null, href.replace(location.origin, ''));
      this.route();
    }
  });

  window.addEventListener('popstate', () => this.route());

  this.init();
}
