/**
 * 상품 옵션 component
 */
export default function ProductOptions({ $target, initialState, onSelect }) {
  const $select = document.createElement('select');
  $target.appendChild($select);

  /**
   * 상품옵션 이름 렌더링 시 상품명 + 옵션명 + 재고: n개 형식으로 출력
   * 재고가 0인 상품의 경우 옵션 선택 불가
   * [
   *    {
   *        optionName: '옵션 상품',
   *        optionPrice: 1000,
   *        stock: 10
   *    },
   *    ...
   * ]
   */
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    // 현재 상태와 새로운 상태가 다를 경우에만 rendering 되도록
    // 최적화할 수 있다.
    this.render();
  };

  const createOptionFullName = ({ optionName, optionPrice, stock }) => {
    return `${optionName} ${
      optionPrice > 0 ? `(옵션가 ${optionPrice})` : ''
    } | ${stock > 0 ? `재고 ${stock}` : '재고없음'}`;
  };

  $select.addEventListener('change', (event) => {
    const optionId = parseInt(event.target.value);
    const option = this.state.find((option) => option.id == optionId);

    if (option) {
      onSelect(option);
    }
  });

  // parameter 없이 state로만 rendering 해야 합니다.
  this.render = () => {
    if (this.state && Array.isArray(this.state)) {
      $select.innerHTML = `
            <option>선택해주세요.</option>
            ${this.state
              .map(
                (option) => `
                <option
                    ${option.stock === 0 ? 'disabled' : ''}
                    value="${option.id}">
                ${createOptionFullName(option)}
                </option>
            `
              )
              .join('')}
          `;
    }
  };
  this.render();
}
