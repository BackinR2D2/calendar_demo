const months = ['May', 'June', 'July'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const downButton = document.querySelector('.downButton');
const upButton = document.querySelector('.upButton');
const calendarMonth = document.querySelector('.calendarMonth');
const calendarTable = document.querySelector('.calendarTable');
const calendarTbody = document.querySelector('tbody');
const modal = document.querySelector('#eventModal');
let monthIndex = 0;

const calendarData = [
	{
		id: 1,
		month: 'May',
		day: 10,
		eventLink: 'https://zoom.com/room/1',
		eventMaterial: 'https://drive.google.com/',
		eventTitle: 'Event 1',
	},
	{
		id: 2,
		month: 'May',
		day: 13,
		eventLink: 'https://zoom.com/room/1',
		eventMaterial: 'https://drive.google.com/',
		eventTitle: 'Event 2',
	},
	{
		id: 3,
		month: 'June',
		day: 3,
		eventLink: 'https://zoom.com/room/1',
		eventMaterial: 'https://drive.google.com/',
		eventTitle: 'Event 3',
	},
	{
		id: 4,
		month: 'July',
		day: 6,
		eventLink: 'https://zoom.com/room/1',
		eventMaterial: 'https://drive.google.com/',
		eventTitle: 'Event 4',
	},
];

function daysInMonth(month, year) {
	// month - 5 (May) / 6 (June) / 7 (July)
	return new Date(year, month, 0).getDate();
}

const firstDayInMonthIndex = (monthIndex, year = new Date().getFullYear()) =>
	new Date(`${year}-${monthIndex + 1}-01`).getDay(); // returns the index of the day in the week (1 - Monday, 2 - Tuesday...)

const displayCalendarMetaData = () => {
	const tr = document.createElement('tr');
	days.forEach((day) => {
		const th = document.createElement('th');
		th.textContent = day;
		tr.append(th);
	});
	calendarTbody.append(tr);
};

const handleCloseModal = () => {
	setTimeout(() => {
		modal.classList.remove('modal-dialog-centered');
	}, 500);
};

const initializeModal = (event) => {
	const eventModalDialog = document.createElement('div');
	eventModalDialog.classList.add('model-dialog');
	const eventTemplate = `
	<div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="eventTitle">${event.eventTitle}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="handleCloseModal()"></button>
            </div>
            <div class="modal-body">
				<p>${event.eventLink}</p>
				<p>${event.eventMaterial}</p>
			</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="handleCloseModal()">Close</button>
            </div>
          </div>
	`;
	eventModalDialog.innerHTML = eventTemplate;
	modal.innerHTML = eventModalDialog.innerHTML;
	modal.classList.add('modal-dialog-centered');
};

const displayCalendarData = () => {
	const currentYear = new Date().getFullYear();
	calendarMonth.textContent = `${months[monthIndex]} ${currentYear}`;
	let monthIndexParameter;

	switch (monthIndex) {
		case 0:
			monthIndexParameter = 5;
			break;
		case 1:
			monthIndexParameter = 6;
			break;
		case 2:
			monthIndexParameter = 7;
			break;
	}

	const numberOfDaysInMonth = daysInMonth(monthIndexParameter, currentYear); // 5 - May, 6 - June, 7 - July
	const firstDayIndex = firstDayInMonthIndex(monthIndexParameter - 1); // 4 - May, 5 - June, 6 - July
	let counter = 1;
	let index = 0;
	const tableRows = [];
	for (let i = 0; i < Math.ceil(numberOfDaysInMonth / 7); i++) {
		const tr = document.createElement('tr');
		tableRows.push(tr);
	}
	if (firstDayIndex >= 6) {
		const tr = document.createElement('tr');
		tableRows.push(tr);
	}
	for (let i = 1; i <= 7; i++) {
		const td = document.createElement('td');
		tableRows[index].append(td);
	}

	for (let i = firstDayIndex; i <= 7; i++) {
		tableRows[index].children[i - 1].textContent = counter;
		counter += 1;
	}

	calendarTbody.append(tableRows[index]);
	index += 1;

	for (let i = 1; i < tableRows.length; i++) {
		for (let j = 1; j <= 7; j++) {
			const td = document.createElement('td');
			if (counter <= numberOfDaysInMonth) {
				td.textContent = counter;
				counter += 1;
			}
			tableRows[i] && tableRows[i].append(td);
		}
		calendarTbody.append(tableRows[i]);
	}

	for (let i = 1; i < calendarTbody.children.length; i++) {
		for (let j = 0; j < calendarTbody.children[i].children.length; j++) {
			const event = calendarData.find(
				(el) =>
					el.month === months[monthIndex] &&
					el.day === Number(calendarTbody.children[i].children[j].textContent)
			);
			if (event) {
				calendarTbody.children[i].children[j].classList.add('event');
				calendarTbody.children[i].children[j].setAttribute(
					'title',
					event.eventTitle
				);
				calendarTbody.children[i].children[j].setAttribute(
					'data-bs-toggle',
					'modal'
				);
				calendarTbody.children[i].children[j].setAttribute(
					'data-bs-target',
					`#eventModal`
				);
				calendarTbody.children[i].children[j].addEventListener('click', () => {
					initializeModal(event);
				});
			}
		}
	}
};

window.addEventListener('load', () => {
	displayCalendarData();
});

upButton.addEventListener('click', () => {
	if (monthIndex === 2) {
		monthIndex = 0;
	} else {
		monthIndex += 1;
	}
	calendarTbody.innerHTML = '';
	displayCalendarMetaData();
	displayCalendarData();
});

downButton.addEventListener('click', () => {
	if (monthIndex === 0) {
		monthIndex = 2;
	} else {
		monthIndex -= 1;
	}
	calendarTbody.innerHTML = '';
	displayCalendarMetaData();
	displayCalendarData();
});
