'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let locations = [];

function Location(name, minCustomer, maxCustomer, aveCookies) {

    this.name = name;
    this.minCustomer = minCustomer;
    this.maxCustomer = maxCustomer;
    this.aveCookies = aveCookies;
    this.customerPerHour = [];
    this.cookiesPerHour = [];
    this.total = 0;
    locations.push(this);

}

Location.prototype.calcCustomerPerHour = function () {
    for (let i = 0; i < hours.length; i++) {
        this.customerPerHour.push(random(this.minCustomer, this.maxCustomer));
    }
},


Location.prototype.calcCookiesPerHour = function () {
        for (let i = 0; i < hours.length; i++) {
            this.cookiesPerHour.push(Math.floor(this.customerPerHour[i] * this.aveCookies));
            this.total += this.cookiesPerHour[i];
        }
}

let seattle = new Location('seattle', 23, 65, 6.3);
let tokyo = new Location('tokyo', 3, 24, 1.2);
let dubai = new Location('dubai', 11, 38, 3.7);
let paris = new Location('paris', 20, 38, 2.3);
let lima = new Location('lima', 2, 16, 4.6);



let parent = document.getElementById('parent');
let table = document.createElement('table');
parent.appendChild(table);



function makeHeader() {
    let headerRaw = document.createElement('tr');
    table.appendChild(headerRaw);

    let nameTh = document.createElement('th');
    headerRaw.appendChild(nameTh);
    nameTh.textContent = 'location name'

    for (let i = 0; i < hours.length; i++) {
        let dataTh = document.createElement('th');
        headerRaw.appendChild(dataTh);
        dataTh.textContent = hours[i];

    }

    let lastTh = document.createElement('th');
    headerRaw.appendChild(lastTh);
    lastTh.textContent = 'daily location total'
}


Location.prototype.render = function () {
    let dataRaw = document.createElement('tr');
    table.appendChild(dataRaw);

    let nameTd = document.createElement('td');
    dataRaw.appendChild(nameTd);
    nameTd.textContent = this.name;

   

    for (let i = 0; i < hours.length; i++) {
        let dataTd = document.createElement('td');
        dataRaw.appendChild(dataTd);
        dataTd.textContent = this.cookiesPerHour[i];

    }
    
    let lastTd = document.createElement('td');
    dataRaw.appendChild(lastTd);
    lastTd.textContent = this.total;

}
function makeFooter() {
    let footerRaw = document.createElement('tr');
    table.appendChild(footerRaw);

    let nameTf = document.createElement('th');
    footerRaw.appendChild(nameTf);
    nameTf.textContent = 'total hours'

   

    for (let i = 0; i < hours.length; i++) {
        let totalPerHour = 0;
        
        let megaTotal = 0;
        
        for (let j = 0; j < locations.length; j++) {
            totalPerHour += locations[j].cookiesPerHour[i];
            megaTotal += locations[j].cookiesPerHour[i];
        }


    let footerLast = document.createElement('th');
    footerRaw.appendChild(footerLast);
    footerLast.textContent = megaTotal;
}

}

let locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit',submitter);

function submitter (event){
    event.preventDefault();

    let name = event.target.nameField.value;
    let minCustomer = event.target.minCustomerField.value;
    let maxCustomer = event.target.maxCustomerField.value;
    let aveCookies = event.target.aveCookiesField.value;
    
    let addedLocation = new location(name, minCustomer, maxCustomer, aveCookies)

    addedLocation.calcCustomerPerHour();
    addedLocation.calcCookiesPerHour();
    addedLocation.render();

  
    
}

makeHeader();

for (let i = 0; i < locations.length; i++) {
    locations[i].calcCustomerPerHour();
    locations[i].calcCookiesPerHour();
    locations[i].render();
}

makeFooter();
