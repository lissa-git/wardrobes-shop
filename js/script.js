//функция определения поддержки WebP
function testWebP(callback) { 

  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

//полифил для IE 10-11
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const anchors = document.querySelectorAll('a[href*="#"]')
if (anchors) {
  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  });
};


$(document).ready(function () {
  $('#materials').slick({
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    speed: 1900,
    autoplaySpeed: 3300,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-btn materials-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-btn materials-next"> <img src="img/arrow-right.svg" alt=""></button>',
    responsive: [{
        breakpoint: 1251,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 701,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });
});
$(document).ready(function () {
  $('#furniture').slick({
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    speed: 1900,
    autoplaySpeed: 3300,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-btn materials-prev"> <img src="img/arrow-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-btn materials-next"> <img src="img/arrow-right.svg" alt=""></button>',
    responsive: [{
        breakpoint: 1251,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 701,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 1,
          arrows: false,
        }
      },
    ]
  });
});
$(document).ready(function () {
  $('.reviews-slider').slick({
    dots: true,
    slidesToShow: 1,
    infinite: true,
    speed: 900,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-btn reviews-prev"> <img src="img/arrow-brown-left.svg" alt=""></button>',
    nextArrow: '<button type="button" class="slick-btn reviews-next"> <img src="img/arrow-brown-right.svg" alt=""></button>',
    responsive: [{
      breakpoint: 601,
      settings: {
        arrows: false,
      }
    }, ]
  });
});

//countdown

function time() {
  var d1 = new Date();
  var d2 = Date.UTC(d1.getUTCFullYear(),
                    d1.getUTCMonth(),
                    d1.getUTCDate() + (d1.getUTCHours() < 23 ? 0 : 1),
                    23);
  var dh = d2 - d1;
  var hours = Math.floor(dh / 3600000);
  var dm = dh - 3600000 * hours;
  var min = Math.floor(dm / 60000);
  var ds = dm - 60000 * min;
  var sec = Math.floor(ds / 1000);
  var dmilli = ds - 1000 * sec;
  setTimeout(time, dmilli);
  hours = ('0' + hours).slice(-2);
  min = ('0' + min).slice(-2);
  sec = ('0' + sec).slice(-2);
  if (document.getElementById('d')) {
        document.getElementById('d').innerText = 0;
        document.getElementById('h').innerText = hours;
        document.getElementById('m').innerText = min;
        document.getElementById('s').innerText = sec;
      }
}
time();



//about mobile show more
$(document).ready(function () {
  $('.about-mobile__more-btn').click(function () {
    $(this).text(function (i, text) {
      return text === "Смотреть ещё" ? "Скрыть" : "Смотреть ещё";
    })
    $(this).parent().children('p.about-mobile__all-text').toggle('normal');
    return false;
  });
});


//phone mask
let elements = document.querySelectorAll('._phone');
if (elements) {
  for (let i = 0; i < elements.length; i++) {
    new IMask(elements[i], {
      mask: '+{375}(00)000-00-00',
    });
  }
};

//form validation
function emailTest(input) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
};

function phoneTest(input) {
  return /^\+375\(?(17|29|33|44)\)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/.test(input.value);
};

function formAddError(input) {
  input.classList.add('_error');
};

function formRemoveError(input) {
  input.classList.remove('_error');
};


const forms = document.querySelectorAll('._form');
if (forms) {
  forms.forEach(function (formWrapper) {
    const confirmBtn = formWrapper.querySelector('.btn');
    confirmBtn.addEventListener('click', function (e) {
      e.preventDefault();
      let error = 0;
      formWrapper.querySelectorAll('._req').forEach(function (input) {
        formRemoveError(input);
        switch (true) {
          case (input.classList.contains('_phone')):
            if (input.value === '' || !phoneTest(input)) {
              formAddError(input);
              error++;
            };
            break;
          case (input.classList.contains('_mail')):
            if (input.value === '' || !emailTest(input)) {
              formAddError(input);
              error++;
            };
            break;
          case (input.classList.contains('_phone-mail')):
            if (input.value === '' || !emailTest(input) || !phoneTest(input)) {
              formAddError(input);
              error++;
            }
            break;
          default:
            if (input.value === '') {
              formAddError(input);
              error++;
            };
            break;
        };
      });
      if (error === 0) {
        formWrapper.nextElementSibling.classList.add('popup-succeed--active');
        formWrapper.querySelectorAll('._req').forEach(function (input) {
          input.value = '';
        });
        formWrapper.classList.remove('cost__popup--active');
      };
    });
  });
};


const closePopupBtns = document.querySelectorAll('.popup-succeed__close');
if (closePopupBtns) {
  closePopupBtns.forEach(function (closePopupBtn) {
    closePopupBtn.addEventListener('click', function () {
      closePopupBtn.parentNode.parentNode.classList.remove('popup-succeed--active');
    });
  });
};


//slider tabs

const tabBtns = document.querySelectorAll('input[name="tabs"]');
const materialsSlider = document.querySelector('#materials');
const furnitureSlider = document.querySelector('#furniture');

tabBtns.forEach(function (tabBtn) {
  tabBtn.addEventListener("change", function () {
    if (tabBtn.getAttribute('data-tab') === "materials") {
      materialsSlider.classList.remove('tabs-slider--hidden');
      furnitureSlider.classList.add('tabs-slider--hidden');
    } else {
      materialsSlider.classList.add('tabs-slider--hidden');
      furnitureSlider.classList.remove('tabs-slider--hidden');
    }
  });
});


//catalog sections links
const catalogLinks = document.querySelectorAll('.sections-item');

if (catalogLinks) {
  catalogLinks.forEach(function (catalogLink) {
    catalogLink.addEventListener('click', function () {
      window.location.href = 'catalog.html';
    });
  });
}

//cost test

document.querySelectorAll('.cost-test').forEach(function (costTestWrapper) {
  const testBtn = costTestWrapper.querySelector('.test-btn');
  const costType = costTestWrapper.querySelector('.cost-type');
  const costSize = costTestWrapper.querySelector('.cost-size');
  const costCompartments = costTestWrapper.querySelector('.cost-compartments');
  const costPopup = costTestWrapper.querySelector('.cost-popup');
  const closeAllBtns = costTestWrapper.querySelectorAll('.close-btn');

  testBtn.addEventListener('click', function () {
    costType.classList.add('cost__question--active');
    costTestWrapper.classList.add('type-height');

    const typeInputs = costTestWrapper.querySelectorAll('input[name="cost-type"]');
    typeInputs.forEach(function (typeInput) {
      typeInput.addEventListener('change', function () {
        if (costType.querySelector('.cost-bottom__next').classList.contains('inactive-btn')) {
          costType.querySelector('.cost-bottom__next').classList.remove('inactive-btn')
        }
      });
    });
    const costTypeNext = costType.querySelector('.cost-bottom__next');
    costTypeNext.addEventListener('click', function () {
      if (!costTypeNext.classList.contains('inactive-btn')) {
        costType.classList.remove('cost__question--active');
        costSize.classList.add('cost__question--active');
        costTestWrapper.classList.remove('type-height');
        costTestWrapper.classList.add('size-height');
      }
    });

    const sizeInputs = costTestWrapper.querySelectorAll('input[name="cost-size"]');
    sizeInputs.forEach(function (sizeInput) {
      sizeInput.addEventListener('change', function () {
        if (costSize.querySelector('.cost-bottom__next').classList.contains('inactive-btn')) {
          costSize.querySelector('.cost-bottom__next').classList.remove('inactive-btn')
        }
      });
    });

    const costSizePrev = costSize.querySelector('.cost-bottom__prev');
    if (costSizePrev) {
      costSizePrev.addEventListener('click', function () {
        costSize.classList.remove('cost__question--active');
        costType.classList.add('cost__question--active');
        costTestWrapper.classList.remove('size-height');
        costTestWrapper.classList.add('type-height');
      });
    };

    const costSizeNext = costSize.querySelector('.cost-bottom__next');
    costSizeNext.addEventListener('click', function () {
      if (!costSizeNext.classList.contains('inactive-btn')) {
        costSize.classList.remove('cost__question--active');
        costCompartments.classList.add('cost__question--active');
        costTestWrapper.classList.remove('size-height');
        costTestWrapper.classList.add('compartments-height');
      }
    });

    const compartmentInputs = costTestWrapper.querySelectorAll('input[name="cost-compartments"]');
    compartmentInputs.forEach(function (compartmentInput) {
      compartmentInput.addEventListener('change', function () {
        if (costCompartments.querySelector('.cost-bottom__next').classList.contains('inactive-btn')) {
          costCompartments.querySelector('.cost-bottom__next').classList.remove('inactive-btn')
        }
      })
    });

    const costCompartmentsPrev = costCompartments.querySelector('.cost-bottom__prev');
    if (costCompartmentsPrev) {
      costCompartmentsPrev.addEventListener('click', function () {
        costCompartments.classList.remove('cost__question--active');
        costSize.classList.add('cost__question--active');
        costTestWrapper.classList.remove('compartments-height');
        costTestWrapper.classList.add('size-height');
      });
    };

    const costCompartmentsNext = costCompartments.querySelector('.cost-bottom__next');
    costCompartmentsNext.addEventListener('click', function () {
      if (!costCompartmentsNext.classList.contains('inactive-btn')) {
        costPopup.classList.add('cost__popup--active');
      }
    });
    const xClose = costPopup.querySelector('.cost__close-x');
    if (xClose) {
      xClose.addEventListener('click', function () {
        costPopup.classList.remove('cost__popup--active');
        costPopup.querySelectorAll('.cost__popup-input').forEach(function (input) {
          input.classList.remove('_error');
          input.value = '';
        });
      })
    };
    closeAllBtns.forEach(function (closeAllBtn) {
      closeAllBtn.addEventListener('click', function () {
        costType.classList.remove('cost__question--active');
        costSize.classList.remove('cost__question--active');
        costCompartments.classList.remove('cost__question--active');
        costTestWrapper.classList.remove('type-height');
        costTestWrapper.classList.remove('size-height');
        costTestWrapper.classList.remove('compartments-height');
        costPopup.classList.remove('cost__popup--active');
        costPopup.nextElementSibling.classList.remove('cost-bottom__popup--active');
        costPopup.querySelectorAll('._req').forEach(function (input) {
          input.value = ''
        });
        const nextBtns = costTestWrapper.querySelectorAll('.cost-bottom__next');
        nextBtns.forEach(function (nextBtn) {
          nextBtn.classList.add('inactive-btn');
        })
        //removing radio checked
        const testInputs = costTestWrapper.querySelectorAll('.cost-test__input');
        testInputs.forEach(function (testInput) {
          testInput.checked = false;
        });
      });
    })
  });
});


//removing error on typing text
const formInputs = document.querySelectorAll('._req');
if (formInputs) {
  formInputs.forEach(function (input) {
    input.addEventListener('keyup', function () {
      input.classList.remove('_error');
    })
  });
};
//side pages links handler
const pageLinks = document.querySelectorAll('.catalog-link');

if (pageLinks) {
  pageLinks.forEach(function (pageLink) {
    pageLink.getAttribute("href");
    pageLink.addEventListener('click', function () {
      window.location.href = pageLink.getAttribute("href");
    })

  })
}


//catalog filter

const filterBtn = document.querySelector('.catalog-filter__btn');
const filter = document.querySelector('.filter');
const filterClose = document.querySelector('.filter__close');
const acceptFilter = document.querySelector('.accept-filter');
const resetFilter = document.querySelector('.reset-filter');
const filterInputs = document.querySelectorAll('.filter__input');
const sorting = document.querySelectorAll('.sort-by');
const filtering = document.querySelectorAll('.filter-by');
const materialsInputs = document.querySelectorAll('.materials-input');
const allTypesBtn = document.querySelector('.type-all');



const catalog = document.querySelector('.catalog__talbe');
if (catalog) {
  const iso = new Isotope(catalog, {
    itemSelector: '.catalog-item',
    masonry: {
      columnWidth: 400
    },
    getSortData: {
      price: function (itemElem) {
        let price = Number(itemElem.getAttribute('data-price'));
        return price;
      }
    }
  });

  acceptFilter.addEventListener('click', function () {
    sorting.forEach(function (sortValue) {
      if (sortValue.checked) {
        if (sortValue.getAttribute('data-sort')) {
          let sortBy = sortValue.getAttribute('data-sort');
          if (sortValue.getAttribute('data-id') == 'price-asc') {
            iso.arrange({
              sortBy: `${sortBy}`
            });
          } else {
            iso.arrange({
              sortBy: `${sortBy}`,
              sortAscending: false
            });
          }
        }
      }
    });
    let filterBy = "";
    filtering.forEach(function (filterValue) {
      if (filterValue.checked) {
        if (filterBy === "") {
          filterBy = filterValue.getAttribute('data-filter');
        } else {
          filterBy = filterBy + ", " + filterValue.getAttribute('data-filter');
        }
      }
    });
    if (filterBy === "*" || filterBy === "") {
      document.querySelector('.catalog__pages').classList.remove('catalog__pages--hidden');
    } else {
      document.querySelector('.catalog__pages').classList.add('catalog__pages--hidden');
    }
    iso.arrange({
      filter: `${filterBy}`
    });
    filter.classList.remove('filter--active');
  });


  filterBtn.addEventListener('click', function () {
    filter.classList.add('filter--active');
  });

  filterClose.addEventListener('click', function () {
    filter.classList.remove('filter--active');
  });

  resetFilter.addEventListener('click', function () {
    filterInputs.forEach(function (filterInput) {
      filterInput.checked = false;
      document.querySelector('.catalog__pages').classList.remove('catalog__pages--hidden');
    });
  });

  allTypesBtn.addEventListener('click', function () {
    if (allTypesBtn.checked) {
      materialsInputs.forEach(function (materialsInput) {
        materialsInput.checked = false;
      });
    }
  });

  materialsInputs.forEach(function (materialsInput) {
    materialsInput.addEventListener('click', function () {
      if (allTypesBtn.checked) {
        allTypesBtn.checked = false;
      }
    })
  });
};


//images switch
const smallImages = document.querySelectorAll('.product-card__img');
const bigImages = document.querySelectorAll('.product-card__main-img');

if (smallImages) {
  smallImages.forEach(function (smallImage) {
    smallImage.addEventListener("click", function () {
      let imageId = smallImage.getAttribute('data-img');
      smallImages.forEach(function (smallImage) {
        if (smallImage.getAttribute('data-img') == imageId) {
          smallImage.classList.add('product-card__img--hidden');
        } else {
          smallImage.classList.remove('product-card__img--hidden');
        }
      })
      bigImages.forEach(function (bigImage) {
        if (bigImage.getAttribute('data-img') == imageId) {
          bigImage.classList.add('product-card__main-img--active');
        } else {
          bigImage.classList.remove('product-card__main-img--active');
        }
      });
    });
  });
};

//product card popups

const productCard = document.querySelector('.product-card__main');
const orderBtn = document.querySelector('.product-card__order-btn');
const calculateBtn = document.querySelector('.product-card__calculate-btn');
const orderPopup = document.querySelector('.order-popup');
const calculatePopup = document.querySelector('.calculate-popup');
const cardPopupClose = document.querySelectorAll('.product-card__close-x');

if (productCard) {
  orderBtn.addEventListener('click', function () {
    orderPopup.classList.add('cost__popup--active');
  });
  calculateBtn.addEventListener('click', function () {
    calculatePopup.classList.add('cost__popup--active');
  });
  cardPopupClose.forEach(function (cardPopupCloseBtn) {
    cardPopupCloseBtn.addEventListener('click', function () {
      cardPopupCloseBtn.parentNode.parentNode.classList.remove('cost__popup--active');
      cardPopupCloseBtn.parentNode.parentNode.querySelectorAll('.cost__popup-input').forEach(function (input) {
        input.classList.remove('_error');
        input.value = '';
      });
    });
  });
};


//images zoom 
$(document).ready(function () {
  $('#zoom_4').elevateZoom();
  $('#zoom_1').elevateZoom();
  $('#zoom_2').elevateZoom();
  $('#zoom_3').elevateZoom();
});

//mobile menu

const menuBtns = document.querySelectorAll('.mobile-nav__btn');
const mobileBtns = document.querySelectorAll('.mobile-nav__btn');

if (menuBtns){
  menuBtns.forEach(function(menuBtn){
    menuBtn.addEventListener('click', function(){
      menuBtn.parentNode.nextElementSibling.classList.add('header-nav--active');
    });
    menuBtn.parentNode.nextElementSibling.children[0].addEventListener('click', function(){
      menuBtn.parentNode.nextElementSibling.classList.remove('header-nav--active');
    })
  });
  
  mobileBtns.forEach(function(menuBtn){
    menuBtn.addEventListener('click', function(){
      menuBtn.nextElementSibling.classList.add('header-nav--active');
    });
    menuBtn.nextElementSibling.children[0].addEventListener('click', function(){
      menuBtn.nextElementSibling.classList.remove('header-nav--active');
    })
  });
};
