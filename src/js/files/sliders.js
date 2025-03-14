/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/
import { flsModules } from "./modules.js";
// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, FreeMode, Thumbs, Autoplay } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.mp-fb__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.mp-fb__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,


			// Эффекты
			// effect: 'fade',
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			},


			// Пагинация

			pagination: {
				el: '.mp-fb__pagination',
				clickable: true,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.mp-fb__button-prev',
				nextEl: '.mp-fb__button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
	}

	if (document.querySelector('.products-slider__slider')) {
		const productsSliders = document.querySelectorAll('.products-slider__slider');
		const mediaQuery = '(max-width:991.98px)';
		let isSlidersInit = false;

		function initProductsSliders() {
			if (window.matchMedia(mediaQuery).matches) {
				productsSliders.forEach(slider => slider.parentElement.classList.add('_inactive'));
				return;
			}

			if (!isSlidersInit) {
				productsSliders.forEach(slider => {
					const prevEl = slider.parentElement.querySelector('.products-slider__button-prev');
					const nextEl = slider.parentElement.querySelector('.products-slider__button-next');

					slider.swiper = new Swiper(slider, {
						modules: [Navigation],
						observer: true,
						observeParents: true,
						slidesPerView: 2,
						spaceBetween: 60,
						speed: 800,
						navigation: {
							prevEl: prevEl,
							nextEl: nextEl,
						},
						breakpoints: {
							991.98: {
								slidesPerView: 3,
							},
							1599.98: {
								slidesPerView: 4,
							},
							2099.98: {
								slidesPerView: 5,
							}
						},
					});

					slider.parentElement.classList.remove('_inactive');
				});

				isSlidersInit = true;
			}
		}

		function destroyProductsSliders() {
			if (isSlidersInit) {
				productsSliders.forEach(slider => {
					if (slider.swiper) {
						slider.swiper.destroy();
						slider.swiper = null;
					}
					slider.parentElement.classList.add('_inactive');
				});
				isSlidersInit = false;
			}
		}

		function handleResize() {
			destroyProductsSliders();
			initProductsSliders();
		}

		initProductsSliders();
		window.addEventListener('resize', handleResize);
	}

	if (document.querySelector('.product-card__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.product-card__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			// autoHeight: true,
			speed: 400,
			allowTouchMove: true,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			effect: 'fade',
			/*
			// Эффекты
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация

			pagination: {
				el: '.product-card__pagination',
				enabled: false,
				clickable: false,
			},


			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты

			breakpoints: {
				320: {
					allowTouchMove: true,
					pagination: {
						el: '.product-card__pagination',
						enabled: false,
						clickable: false,
					},
				},
				991.98: {
					allowTouchMove: false,
					pagination: {
						el: '.product-card__pagination',
						enabled: true,
						clickable: false,
					}
				},

			},

			// События
			on: {
				afterInit: function (swiper) { updateFraction(swiper) },
				breakpoint: function (swiper) { if (swiper.currentBreakpoint == '991.98') { updateFraction(swiper) } }
			}
		});
		function updateFraction(swiper) {
			const width = 100 / swiper.slides.length;

			swiper.pagination.bullets.forEach((bullet, index) => {
				bullet.style.setProperty('--bullet-width', `${width}%`);
				bullet.style.setProperty('--bullet-position', `${width * index}%`);
				bullet.addEventListener('pointerover', () => { swiper.slideTo(index) })
			})
		}
	}

	if (document.querySelector('.bouquets__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.bouquets__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 60,
			// autoHeight: true,
			speed: 800,
			breakpoints: {
				320: {
					spaceBetween: 10,
					slidesPerView: 'auto',
					freeMode: {
						enabled: true
					}
				},
				991.98: {
					spaceBetween: 60,
					slidesPerView: 3,
					freeMode: {
						enabled: false
					}
				},
				1949.98: {
					slidesPerView: 4,
				}

			},
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.bouquets__button-prev',
				nextEl: '.bouquets__button-next',
			},

			// Брейкпоинты



			// События
			on: {
				afterInit: function (swiper) {
					changeParams(swiper)
				},
				breakpoint: function (swiper) {
					changeParams(swiper)
				}
			}
		});

		function changeParams(swiper) {
			if (swiper.el.classList.contains('bouquets__slider_columns-4')) {
				if (swiper.currentBreakpoint === '991.98') {
					swiper.params.slidesPerView = 4;
					swiper.update();
				}

				if (swiper.currentBreakpoint === '1949.98') {
					swiper.params.slidesPerView = 5;
					swiper.update();
				}
			}
		}
	}

	if (document.querySelector('.faq__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.faq__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 60,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.faq__button-prev',
				nextEl: '.faq__button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 'auto',
					spaceBetween: 10,
				},
				991.98: {
					slidesPerView: 3,
					spaceBetween: 60,
				},

			},

			// События
			// on: {

			// }
		});
	}

	if (document.querySelector('.product-detail-slider__main')) { // Указываем скласс нужного слайдера
		let thumbsProdSlider = new Swiper('.product-detail-slider__thumbs', {
			grabCursor: true,
			spaceBetween: 35,
			slidesPerView: 'auto',
			direction: "vertical",
			breakpoints: {
				320: {
					spaceBetween: 10,
				},
				991.98: {
					spaceBetween: 35,
				},
			},
		})
		// Создаем слайдер
		let mainProdSLider = new Swiper('.product-detail-slider__main', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Thumbs],
			slidesPerView: 1,
			spaceBetween: 10,
			thumbs: {
				swiper: thumbsProdSlider,
			},
			// speed: 800,
			// observer: true,
			// observeParents: true,
			// autoHeight: true,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.product-detail-slider__nav .swiper-button-prev',
			// 	nextEl: '.product-detail-slider__nav .swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
	}

	if (document.querySelector('.prod-mini-slider__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.prod-mini-slider__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, FreeMode],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			// spaceBetween: 36,
			// autoHeight: true,
			speed: 300,
			freeMode: {
				enabled: true
			},
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.prod-mini-slider__button-prev',
				nextEl: '.prod-mini-slider__button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				lock: function () {
					this.el.classList.add('swiper-lock')
				},
				unlock: function () {
					this.el.classList.remove('swiper-lock')
				},
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}
flsModules.initSliders = initSliders;
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});