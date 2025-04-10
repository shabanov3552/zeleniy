/* Календарь */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';


// console.log(calendar);


function initCalendar(inputSelector, inputHideSelector) {
	if (document.querySelector(inputSelector)) {
		let calendar = new AirDatepicker(inputSelector, {
			timepicker: true,
			minDate: new Date(),
			maxHours: 20,
			minHours: 9,
			minutesStep: 30,
			onSelect({ date, formattedDate, datepicker }) {

				const inputDelTime = document.querySelector(inputHideSelector);

				if (inputDelTime !== null) {
					inputDelTime.value = formattedDate;
				}
			}
		});
	}
}
initCalendar('#calendar', '#DeliveryTime');
flsModules.initCalendar = initCalendar;
// window.flsModules.initCalendar('#calendar', '#DeliveryTime');
// import 'vanilla-calendar-pro/styles/layout.css'; // Только скелет
// import 'vanilla-calendar-pro/styles/themes/light.css'; // Светлая тема
// function initCalendar(calendarSelector, inputSelector) {
// 	if (document.querySelector(calendarSelector)) {

// 		const calendar = new Calendar(calendarSelector, {
// 			inputMode: true,
// 			positionToInput: 'auto',
// 			locale: 'ru-RU',
// 			selectionTimeMode: 24,
// 			selectedTheme: 'light',
// 			timeMaxHour: 20,
// 			timeMinHour: 9,
// 			timeStepMinute: 5,
// 			onChangeToInput(self) {
// 				if (!self.context.inputElement) return;

// 				const inputDelTime = document.querySelector(inputSelector);

// 				if (self.context.selectedTime && self.context.selectedDates[0] === undefined) {
// 					self.context.inputElement.value = `Выберете день ${self.context.selectedTime}`;
// 				}

// 				if (self.context.selectedDates[0]) {
// 					self.context.inputElement.value = `${self.context.selectedDates[0]} ${self.context.selectedTime}`;
// 				}

// 				if (inputDelTime !== null) {
// 					inputDelTime.value = `${self.context.selectedDates[0] || 'Выберете день'} ${self.context.selectedTime}`;
// 				}
// 			},
// 			// onInit(self) {
// 			// 	console.log(self);
// 			// },
// 		});

// 		calendar.init();
// 	}
// }
// flsModules.calendar = initCalendar;

// initCalendar('#calendar', '#DeliveryTime');