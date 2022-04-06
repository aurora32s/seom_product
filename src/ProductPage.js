import { request } from './api.js';
import Cart from './Cart.js';
import ProductOptions from './ProductOptions.js';

/**
 * @state
 * {
 *  productId: 1,
 *  product: Product,
 *  optionData: [],
 *  selectedOption: []
 * }
 */
export default function ProductPage({ $target, initialState }) {
  const $product = document.createElement('div');
  $target.appendChild($product);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState.productId !== this.state.productId) {
      requestOptionData(nextState.productId);
      return;
    }
    this.state = nextState;

    const { product, options, selectedOptions } = this.state;
    productOptions.setState(options);
    cart.setState({
      productName: product.name,
      basePrice: product.basePrice,
      selectedOptions: selectedOptions,
    });
  };

  const productOptions = new ProductOptions({
    $target: $product,
    initialState: [],
    onSelect: (option) => {
      const nextState = { ...this.state };

      if (!nextState.selectedOptions) {
        nextState.selectedOptions = [{ ...option, ea: 1 }];
        this.setState(nextState);
        return;
      }

      const { selectedOptions } = nextState;
      const selectedOptionIndex = selectedOptions.findIndex(
        (selectedOption) => selectedOption.id == option.id
      );
      // 이미 선택한 옵션인 경우
      console.log(selectedOptionIndex);
      if (selectedOptionIndex >= 0) {
        nextState.selectedOptions[selectedOptionIndex].ea++;
      } else {
        nextState.selectedOptions.push({ ...option, ea: 1 });
      }
      this.setState(nextState);
    },
  });
  const cart = new Cart({
    $target: $product,
    initialState: {},
    onRemove: (optionId) => {
      const nextState = { ...this.state };
      const selectedOptionIndex = nextState.selectedOptions.findIndex(
        (selectedOption) => selectedOption.id == optionId
      );
      nextState.selectedOptions.splice(selectedOptionIndex, 1);
      this.setState(nextState);
    },
  });

  const fetchOptionData = async (productId) => {
    // 상품 옵션 정보 요청
    const product = await request(`/products/${productId}`);

    this.setState({
      ...this.state,
      product,
    });

    const productOptions = await request(
      `/product-options?product.id=${product.id}`
    );
    // 상품 재고 정보 요청
    const stocks = await Promise.all(
      productOptions
        .map((productOption) => productOption.id)
        .map((id) => {
          return request(`/product-option-stocks?productOption.id=${id}`);
        })
    );
    const productData = productOptions.map((productOption) => {
      const stock = stocks.find((stock) => stock[0].id === productOption.id);
      return { ...productOption, stock: stock[0].stock };
    });
    return productData;
  };

  const requestOptionData = (productId) => {
    fetchOptionData(productId).then((options) => {
      this.setState({
        ...this.state,
        options,
      });
    });
  };

  this.init = () => {
    requestOptionData(this.state.productId);
  };
  this.init();
}
