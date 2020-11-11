class TbPriceComponent {
  constructor() {
    this.discount = {
      ten: 0.9,
      twenty: 0.8,
      thirty: 0.7,
    };
    this.baseMonthPrices = [
      
      {
        type: 1,
        value: 2990,
      },
      {
        type: 2,
        value: 5990,
      },
      {
        type: 3,
        value: 7990,
      },
      {
        type: 4,
        value: 9990,
      },
      {
        type: 5,
        value: 16990,
      },
      {
        type: 6,
        value: 24590,
      },
    
    ];
    this.monthsCount = 12;
    this.buttonRoutText1 = 'Попробовать бесплатно    14 дней';
    this.buttonRoutText2 = 'Оставить заявку';
    this.mountCountShowPlace = document.querySelector('#tb-card-months-count');
    this.monthFinalPrice = document.querySelector("#tb-sum-per-mount");
    this.rangeSelector = document.querySelector("#tb-range");
    this.selectDurationButtons = document.querySelectorAll('.tb-select-duration-button');
    this.routeButton = document.querySelector('#tb-route-button');

    this._init();
  }

  _init() {
    console.log(this.selectDurationButtons);
    this.changeMonthsCount();
    this.changePlaceInner();
    this.rangeSelector.addEventListener("change", (e) => {
      this.changePlaceInner();
    });
    this.selectDurationButtons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        this.changeMonthsCount(e.target.value);
        this.toggleButtonsClass(e.target);
      });
    });
  }

  changePlaceInner() {
    const value = +this.rangeSelector.value;
    const basePrice = this.baseMonthPrices.find(
      (price) => value === price.type
    );
    const discount = this.getDiscount();
    if (value <= 3) {
      this.routeButton.innerHTML = this.buttonRoutText1;
      this.routeButton.href = 'https://textback.ru/registration'
    }
    
    if (value > 3) {
      this.routeButton.innerHTML = this.buttonRoutText2;
      this.routeButton.href = 'https://textback.ru/whatsapp#popup:myform'
    }

    this.monthFinalPrice.innerHTML =  discount === 1 ? 
    (basePrice.value * discount).toLocaleString("ru-RU",{style:'decimal'}) : 
    (Math.ceil((basePrice.value * discount)/100)*100).toLocaleString("ru-RU",{style:'decimal'});
  }

  changeMonthsCount(value) {
    if (!value) this.monthsCount = 12;
   
    if (value) {
      const monthCount = +value;
      this.monthsCount = monthCount
    };
    this.mountCountShowPlace.innerHTML = this.monthsCount;
    this.changePlaceInner();
  }

  getDiscount() {
    if (this.monthsCount === 3) return 1;

    if (this.monthsCount === 6) return this.discount.twenty;

    if (this.monthsCount === 12) return this.discount.thirty;
  }

  toggleButtonsClass(targetButton) {
    this.selectDurationButtons.forEach((button) => {
      if (button === targetButton) return button.classList.add('tb-active')
      button.classList.remove('tb-active')
    })
  }
}

const component = new TbPriceComponent();
