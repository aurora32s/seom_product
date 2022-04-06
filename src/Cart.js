/**
 * state
 * productName: 상품명
 * basePrice: 상품 기본 가격
 * selectedOptions: [Option]
 */
export default function Cart({ $target, initialState, onRemove }) {
  const $cart = document.createElement('div');
  $target.appendChild($cart);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  const totalOptionPrice = () => {
    const { basePrice, selectedOptions } = this.state;
    if (!Array.isArray(selectedOptions)) return 0;
    return selectedOptions.reduce(
      (total, option) => total + (basePrice + option.optionPrice) * option.ea,
      0
    );
  };

  this.render = () => {
    const { productName, basePrice, selectedOptions } = this.state;
    if (!Array.isArray(selectedOptions)) return;
    $cart.innerHTML = `
        <ul>
            ${selectedOptions.map(
              (option) => `
                <li>
                    ${productName} - ${option.optionName} | 
                    ${basePrice} + ${option.optionPrice} |
                    ${option.ea}개
                    <button data-option-id="${option.id}">삭제</butotn>
                </li>
            `
            )}
        </ul>
        ${
          selectedOptions.length > 0 ? `<div>${totalOptionPrice()}원</div>` : ''
        }
      `;
  };

  $cart.addEventListener('click', (event) => {
    const { optionId } = event.target.dataset;

    if (!optionId) {
      alert('잘못된 요청입니다.');
      return;
    }

    const { selectedOptions } = this.state;
    const selectedOption = selectedOptions.find(
      (option) => option.id === parseInt(optionId)
    );

    if (!selectedOption) {
      alert('잘못된 요청입니다.');
      return;
    }
    onRemove(optionId);
  });
  this.render();
}
