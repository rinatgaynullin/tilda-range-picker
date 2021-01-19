class TbPriceComponent {
  constructor() {
    this.monthsCount = 12;
    this.buttonRoutText1 = 'Попробовать бесплатно';
    this.buttonRoutText2 = 'Оставить заявку';

    this.style = document.createElement('style')
    this.monthsSum = document.querySelector('#tb-card-months-sum'); 
    this.pluralizeText = document.querySelector('#tb-pluralize-text');
    this.mountCountShowPlace = document.querySelector('#tb-card-months-count');
    this.monthFinalPrice = document.querySelector("#tb-sum-per-mount");
    this.rangeSelector = document.querySelector("#tb-range");
    this.selectDurationButtons = document.querySelectorAll('.tb-select-duration-button');
    this.routeButton = document.querySelector('#tb-route-button');
    this.rangeSelectorValue = +(this.rangeSelector.value);

    this.daysFreeText = document.querySelector('.tb-head-text__free');
    this.headTextWrapper = document.querySelector('.tb-head-text__wrapper');
    this.brackets = document.querySelectorAll('.waba-three-months');
    this.bracketForWabaFull = document.querySelector('.waba-more-three-months');
    this.bracketsWrapper = document.querySelector('.tb-images-brakets__wrapper');

    this._init();
  }

  _init() {
    
    document.head.appendChild(this.style)
    
    this.changeMonthsCount();
    this.changePlaceInner();
    this.rangeSelector.addEventListener("change", (e) => {
        this.rangeSelectorValue = +(e.target.value);
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
    this.changeButtonText();
    this.monthFinalPrice.innerHTML =  this.getMounthPrice().toLocaleString("ru-RU",{style:'decimal'});
    this.monthsSum.innerHTML =  (this.getMounthPrice() * this.monthsCount).toLocaleString("ru-RU",{style:'currency', currency: 'RUB', minimumFractionDigits: 0,}) 
    
  }

  changeMonthsCount(value) {
    if (!value) this.monthsCount = 12;
   
    if (value) {
      const monthCount = +value;
      this.monthsCount = monthCount
    };
    this.mountCountShowPlace.innerHTML = this.monthsCount;
    this.pluralizeText.innerHTML = this.monthsCount === 3 ? 'месяца' : 'месяцев';
    this.monthsCount !== 12 ? this.changeSliderBackground(true) : this.changeSliderBackground(false);
    this.changePlaceInner();
    this.toggleHeadTextAndBrackets();
  }


  toggleButtonsClass(targetButton) {
    this.selectDurationButtons.forEach((button) => {
      if (button === targetButton) return button.classList.add('tb-active')
      button.classList.remove('tb-active')
    })
  }

  changeSliderBackground(isFull) {
     if (isFull) {
      this.style.innerHTML = `#tb-range::-webkit-slider-runnable-track {
        width: 100%;
        height: 20px;
        cursor: pointer;
        box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        background:  rgba(29, 190, 165, 0.7);
        box-shadow: inset 0px 0px 4px rgba(1, 179, 255, 0.4);
        border-radius: 10px;
        border: none;
      }`
      return;
     }

     this.style.innerHTML = `#tb-range::-webkit-slider-runnable-track {
      width: 100%;
      height: 20px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: linear-gradient(90deg, rgba(1, 138, 255, 0.2) 58.71%, rgba(29, 190, 165, 0.7) 60.76%);
      box-shadow: inset 0px 0px 4px rgba(1, 179, 255, 0.4);
      border-radius: 10px;
      border: none;
    }`;
  }

  toggleHeadTextAndBrackets() {
  if (this.monthsCount != 12) {
    this.daysFreeText.classList.remove('visible');
    this.headTextWrapper.classList.remove('grid-two-columns');
    this.bracketsWrapper.classList.remove('grid-two-columns');
    this.bracketForWabaFull.classList.add('visible');
    this.brackets.forEach(bracket => {
      bracket.classList.remove('visible');
    });
    return 
  }

  this.daysFreeText.classList.add('visible');
    this.headTextWrapper.classList.add('grid-two-columns');
    this.bracketsWrapper.classList.add('grid-two-columns');
    this.bracketForWabaFull.classList.remove('visible');
    this.brackets.forEach(bracket => {
      bracket.classList.add('visible');

    });
  
  }
  
  changeButtonText() {
    const value = +this.rangeSelector.value;
    
    if (value <= 3) {
      this.routeButton.innerHTML = this.buttonRoutText1;
      this.routeButton.href = 'https://textback.ru/registration'
    }
    
    if (value > 3) {
      this.routeButton.innerHTML = this.buttonRoutText2;
      this.routeButton.href = '#popup:myform'
    }
  }
  
  getMounthPrice() {
      if (this.monthsCount === 3) {
          switch(this.rangeSelectorValue) {
            case 1: // 1000 подписчиков
                return 2700;
            case 2:
                return 5400;
            case 3:
                return 6700;
            case 4:
                return 9000;
            case 5:
                return 12600;
            case 6:
                return 22000;
          }
      }
      
      if (this.monthsCount === 6) {
          switch(this.rangeSelectorValue) { //на 6 месяцев 
            case 1:
                return 2500;
            case 2:
                return 4600;
            case 3:
                return 6000;
            case 4:
                return 8000;
            case 5:
                return 11000;
            case 6:
                return 20000;
          }
      }
      
      if (this.monthsCount === 12) {
        switch(this.rangeSelectorValue) {
            case 1:
                return 2000;
            case 2:
                return 4200;
            case 3:
                return 5300;
            case 4:
                return 7000;
            case 5:
                return 9800;
            case 6:
                return 17000;
          }
      }
  }
}

const component = new TbPriceComponent();