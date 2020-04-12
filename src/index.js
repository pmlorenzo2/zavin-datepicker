
/**
 * Zavin Datepicker -> src -> Index JS
 */


const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];


/**
 * [description]
 */
const render = async (param) => {

    // Define number of items to be generated in selection year
    const selection_year_count = 10;

    // Store current values here
    let currentYear, currentMonth, currentDate;

    // Store global elements here
    let dateElement, headerElement, monthYearElement, selectionElement, selectionMonthElement, selectionYearElement, tableElement, daysBodyElement, valueElement;


    // ---------------------------------------
    // 🐬. Tasks before render
    // ---------------------------------------

    //- VALIDATE: [param] - Required
    if (!param) throw new Error("param is required");
    if (typeof param !== "object") throw new Error("param must be an object");

    //- VALIDATE: [param.id] - Required
    if (!param.id) throw new Error("param.id is required");
    if (typeof param.id !== "string") throw new Error("param.id must be a string");

    //- VALIDATE: [param.label] - Optional
    if (param.label && typeof param.label !== "string") throw new Error("param.label must be a string");

    //- VALIDATE: [param.pickerIcon] - Optional
    if (param.pickerIcon && typeof param.pickerIcon !== "string") throw new Error("param.pickerIcon must be a string");

    //- VALIDATE: [param.prevIcon] - Optional
    if (param.prevIcon && typeof param.prevIcon !== "string") throw new Error("param.prevIcon must be a string");

    //- VALIDATE: [param.nextIcon] - Optional
    if (param.nextIcon && typeof param.nextIcon !== "string") throw new Error("param.nextIcon must be a string");

    // Use date today as initial for current values
    const today = new Date();
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();
    currentDate = today.getDate();


    // ---------------------------------------
    // 🐇. Render datepicker here
    // ---------------------------------------

    // Define label element
    let labelElement;
    if (param.label) labelElement = `<h6 class="has-text-weight-bold">${param.label}</h6>`;
    else labelElement = "";

    // Define picker icon element
    let pickerIconElement;
    if (param.pickerIcon) {
        pickerIconElement = `
            <figure class="image is-24x24 has-margin-left-4">
                <img src="${param.pickerIcon}">
            </figure>
        `;
    } else {
        pickerIconElement = "";
    }

    // Define prev option element
    let prevOptionElement;
    if (param.prevIcon) {
        prevOptionElement = `
            <div class="control">
                <button class="button" type="button" id="${param.id}DatepickerPrev">
                    <figure class="image is-16x16">
                        <img src="${param.prevIcon}">
                    </figure>
                </button>
            </div>
        `;
    } else {
        prevOptionElement = "";
    }

    // Define next option element
    let nextOptionElement;
    if (param.nextIcon) {
        nextOptionElement = `
            <div class="control">
                <button class="button" type="button" id="${param.id}DatepickerNext">
                    <figure class="image is-16x16">
                        <img src="${param.nextIcon}">
                    </figure>
                </button>
            </div>
        `;
    } else {
        nextOptionElement = "";
    }

    // Retrieve and inject datepicker code to element
    document.getElementById(param.id).innerHTML = `
        <div class="dropdown zavin-datepicker is-active" id="${param.id}Datepicker">
            <a href="javascript:void(0)" class="dropdown-trigger" id="${param.id}DatepickerTrigger">
                <div>
                    ${labelElement}
                    <p id="${param.id}DatepickerDate"></p>
                </div>
                ${pickerIconElement}
            </a>
            <div class="dropdown-content">
                <section class="zavin-datepicker-header" id="${param.id}DatepickerHeader">
                    <a href="javascript:void(0)" class="zavin-datepicker-period" id="${param.id}DatepickerPeriod">
                        <h6 class="has-text-weight-bold" id="${param.id}DatepickerMonthYear"></h6>
                    </a>
                    <div class="field">
                        <div class="control-combined">
                            ${prevOptionElement}
                            <div class="control">
                                <button class="button zavin-datepicker-today" type="button" id="${param.id}DatepickerToday">Today</button>
                            </div>
                            ${nextOptionElement}
                        </div>
                    </div>
                </section>
                <section class="zavin-datepicker-selection is-hidden" id="${param.id}DatepickerSelection">
                    <div class="zavin-datepicker-month" id="${param.id}DatepickerMonth"></div>
                    <div class="zavin-datepicker-year" id="${param.id}DatepickerYear"></div>
                </section>
                <table class="zavin-datepicker-table" id="${param.id}DatepickerTable">
                    <thead>
                        <tr id="${param.id}DatepickerDaysHeader"></tr>
                    </thead>
                    <tbody id="${param.id}DatepickerDaysBody"></tbody>
                </table>
            </div>
            <input type="hidden" id="${param.id}DatepickerValue">
        </div>
    `;

    // Retrieve global elements
    dateElement = document.getElementById(`${param.id}DatepickerDate`);
    monthYearElement = document.getElementById(`${param.id}DatepickerMonthYear`);
    selectionElement = document.getElementById(`${param.id}DatepickerSelection`);
    selectionMonthElement = document.getElementById(`${param.id}DatepickerMonth`);
    selectionYearElement = document.getElementById(`${param.id}DatepickerYear`);
    tableElement = document.getElementById(`${param.id}DatepickerTable`);
    daysBodyElement = document.getElementById(`${param.id}DatepickerDaysBody`);
    valueElement = document.getElementById(`${param.id}DatepickerValue`);


    // ---------------------------------------
    // 🦀. Update datepicker elements
    // ---------------------------------------
    dateElement.textContent = `${months[currentMonth].substring(0, 3)}. ${currentDate}, ${currentYear}`;
    monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;

    // Update selection of Datepicker Month
    selectionMonthElement.innerHTML = "";
    for (let i = 0; i < months.length; i++) {

        // Set element as active if current iteration matches the current month
        let elementClass;
        if (i === currentMonth) elementClass = "zavin-datepicker-item is-active";
        else elementClass = "zavin-datepicker-item";

        selectionMonthElement.innerHTML += `<a href="javascript:void(0)" class="${elementClass}">${months[i]}</a>`;
    }

    // Update selection of Datepicker Year
    selectionYearElement.innerHTML = `<a href="javascript:void(0)" class="zavin-datepicker-item is-active">${currentYear}</a>`;
    generateYears(selection_year_count, false, selectionYearElement);
    generateYears(selection_year_count, true, selectionYearElement);

    // Update header for days in a week
    const daysHeaderElement = document.getElementById(`${param.id}DatepickerDaysHeader`);
    daysHeaderElement.innerHTML = "";
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        daysHeaderElement.innerHTML += `<th>${day.substring(0, 3)}</th>`;
    }

    // Generate days based on the initial values provided
    generateDays(currentYear, currentMonth, daysBodyElement);

    // Update Datepicker Value
    valueElement.value = generateValue(currentYear, currentMonth, currentDate);


    // ---------------------------------------
    // 🦋. Event handlers here
    // ---------------------------------------

    // EVENT: Datepicker Period is clicked
    document.getElementById(`${param.id}DatepickerPeriod`).onclick = () => {
    };
};


// Expose
export default { render };


/**
 * Generate the years forward or backward from the given year
 *
 * @param {Number} count
 * @param {Boolean} isNext
 * @param {Element} datepickerYear
 */
const generateYears = (count, isNext, datepickerYear) => {

    // Retrieve selection of years
    const datepickerYearItems = datepickerYear.querySelectorAll("a.zavin-datepicker-item");

    // Extract year from selection
    let datepickerYearItem, year;
    if (isNext) datepickerYearItem = datepickerYearItems[datepickerYearItems.length - 1];
    else datepickerYearItem = datepickerYearItems[0];
    year = parseInt(datepickerYearItem.textContent);

    // Generate years forward or backward depending on the params set
    const years = [];
    for (let i = 0; i < count; i++) {
        if (isNext) {
            years.push(year += 1);
        } else {
            if (year !== 0) years.push(year -= 1);
            else break;
        }
    }

    // Loop and create Calendar Picker Item for each year
    for (let i = 0; i < years.length; i++) {
        const anchor = document.createElement("a");
        anchor.href = "javascript:void(0)";
        anchor.classList = "calendar-picker-item";
        anchor.textContent = years[i];

        // Identify where to place the element
        if (isNext) datepickerYear.append(anchor);
        else datepickerYear.prepend(anchor);
    }
};


/**
 * Generate the days of a given month and year in calendar format
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Element} tableBody
 */
const generateDays = (year, month, tableBody) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get date today for reference purposes
    const today = new Date();

    // Sometimes the first day of the month doesn't start at Sunday
    let offset = firstDay.getDay();

    // Render the days in calendar format
    let dayCount = 1;
    tableBody.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const tableRow = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            const tableData = document.createElement("td");

            // If the first count starts at Sunday then simply render it,
            // Else keep adding spacing until it aligns on its designated day
            if (offset === 0) {
                const anchor = document.createElement("a");
                anchor.href = "javascript:void(0)";
                anchor.textContent = dayCount;

                // Mark anchor as "today" if provided date matches the date today
                if (year === today.getFullYear() && month === today.getMonth() && dayCount === today.getDate()) anchor.classList.add("is-today");

                tableData.appendChild(anchor);
                tableRow.appendChild(tableData);

                // If we've reached the last date stop the count,
                // Else keep incrementing the count
                if (dayCount === lastDay.getDate()) break;
                else dayCount++;

            } else {
                tableRow.appendChild(tableData);
                offset--;
            }
        }
        tableBody.appendChild(tableRow);
    }
};


/**
 * Generate datepicker value given the year, month, and date
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 *
 * @return {String} value
 */
const generateValue = (year, month, date) => {
    const datepickerMonth = month + 1; // Increment by 1 since this is an index

    // Extract value for month
    // NOTE: Month must be double digit
    let valueMonth;
    if (datepickerMonth < 10) valueMonth = "0" + datepickerMonth;
    else valueMonth = datepickerMonth;

    // Extract value for date
    // NOTE: Date must be double digit
    let valueDate;
    if (date < 10) valueDate = "0" + date;
    else valueDate = date;

    let value = `${year}-${valueMonth}-${valueDate}`;
    return value;
};
