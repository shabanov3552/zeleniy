/* Календарь */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import { Calendar } from "vanilla-calendar-pro";
import 'vanilla-calendar-pro/styles/index.css';
// import 'vanilla-calendar-pro/styles/layout.css'; // Только скелет
// import 'vanilla-calendar-pro/styles/themes/light.css'; // Светлая тема
if (document.querySelector('#calendar')) {
	const calendar = new Calendar('#calendar', {
		inputMode: true,
		positionToInput: 'auto',
		locale: 'ru-RU',
		selectionTimeMode: 24,
		selectedTheme: 'light',
		timeMaxHour: 20,
		timeMinHour: 9,
		timeStepMinute: 5,
		onChangeToInput(self) {
			if (!self.context.inputElement) return;

			const inputDelTime = document.querySelector('#DeliveryTime');

			if (self.context.selectedTime && self.context.selectedDates[0] === undefined) {
				self.context.inputElement.value = `Выберете день ${self.context.selectedTime}`;
			}

			if (self.context.selectedDates[0]) {
				self.context.inputElement.value = `${self.context.selectedDates[0]} ${self.context.selectedTime}`;
			}

			if (inputDelTime !== null) {
				inputDelTime.value = `${self.context.selectedDates[0] || 'Выберете день'} ${self.context.selectedTime}`;
			}
		},
	});

	calendar.init();
	flsModules.calendar = calendar;
}