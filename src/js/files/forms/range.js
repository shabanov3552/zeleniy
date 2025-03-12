// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit(rangeSlider) {
	if (!rangeSlider) return;

	let priceCnt = rangeSlider.closest('.price');
	if (!priceCnt) {
		console.error('Не найден родитель .price для слайдера', rangeSlider);
		return;
	}

	let dataFrom = parseInt(rangeSlider.getAttribute('data-from')) || 1;
	let dataTo = parseInt(rangeSlider.getAttribute('data-to')) || 100;

	const inputFrom = priceCnt.querySelector('.js_input-from');
	const inputTo = priceCnt.querySelector('.js_input-to');

	if (!inputFrom || !inputTo) {
		console.error('Не найдены инпуты для слайдера', rangeSlider);
		return;
	}

	const inputs = [inputFrom, inputTo];
	const changeEvent = new Event('change', { bubbles: true });

	function updateValue(values, handle) {
		inputs[handle].value = Math.round(values[handle]);
	}

	function setSlider(value, index) {
		let arr = [null, null];
		arr[index] = parseInt(value);
		slider.set(arr);
	}

	inputs.forEach((input, index) => {
		input.placeholder = index == 0 ? dataFrom : dataTo;

		input.addEventListener('change', (e) => {
			if (e.isTrusted) {
				setSlider(e.target.value, index);
			}
		})
	})

	const slider = noUiSlider.create(rangeSlider, {
		start: [dataFrom, dataTo],
		connect: true,
		step: 1,
		range: {
			'min': [dataFrom],
			'max': [dataTo]
		}
	});

	if (inputFrom.value.length || inputTo.value.length) {
		slider.set([
			parseInt(inputFrom.value),
			parseInt(inputTo.value)])
	}

	slider.on('slide', updateValue);
	slider.on('end', (v, handle) => {
		inputs[handle].dispatchEvent(changeEvent);
	});

}


const rangesSlidersFilters = document.querySelectorAll('.js-range');
rangesSlidersFilters.forEach(range => {
	rangeInit(range);
});
