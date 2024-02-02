const persons = [];
const persDate = [];

const addPerson = document.getElementById('addPerson');
const calcStats = document.getElementById('calcStats');

const inpId = document.getElementById('personId');
const inpName = document.getElementById('firstName');
const inpLastName = document.getElementById('lastName');
const inpDate = document.getElementById('birthDate');

const personsList = document.getElementById('personsList');

addPerson.onclick = function () {
    if (findPerson(persons, inpId.value) === -1 || inpId.value === '') {
        const newPers = new Person(+inpId.value, inpName.value, inpLastName.value, inpDate.value);
        persons.push(newPers);
    }

    printPersons();

    console.log(persons)

    inpId.value = '';
    inpName.value = '';
    inpLastName.value = '';
    inpDate.value = '';

}

calcStats.onclick = function () {
    calcAge(persons);
    //console.log(persDate);

    const max = persDate.reduce((maxValue, currentValue, currentIndex) => {
        if (currentValue > maxValue.value) {
            maxValue.value = currentValue;
            maxValue.index = currentIndex;
        }
        return maxValue;
    }, { value: -Infinity, index: -1 });

    const min = persDate.reduce((accum, b) => b < accum ? b : accum);
    function minInd(persDate) {
        const minIndex = persDate.reduce((res, currentAge, currentIndex, array) => {
            if (currentAge < array[res]) {
                return currentIndex;
            }
            return res;
        }, 0);
        console.log(minIndex);
        return minIndex;
    }

    const allAge = persDate.reduce((accum, b) => b + accum);

    console.log(`Максимальное значение: ${max.value}`);
    console.log(`Индекс максимального значения: ${max.index}`);
    console.log(`Максимальное значение: ${min}`);
    console.log(`Индекс максимального значения: ${minInd(persDate)}`);
    console.log(`Средний возраст: ${allAge / persDate.length}`);

    printStatistick = function () {
        while (stats.firstChild) {
            stats.removeChild(stats.firstChild);
        }

        const li1 = document.createElement('li');
        li1.append(document.createTextNode(`Max age => ${persons[max.index]} => ${max.value} years`));
        stats.append(li1);

        const li2 = document.createElement('li');
        li2.append(document.createTextNode(`Min age =>  ${persons[minInd(persDate)]} => ${min} years`));
        stats.append(li2);

        const li3 = document.createElement('li');
        li3.append(document.createTextNode(`Midl age  => ${allAge / persDate.length} years`));
        stats.append(li3);
    }

    printStatistick();
}


printPersons = function () {
    while (personsList.firstChild) {
        personsList.removeChild(personsList.firstChild);
    }

    for (let i = 0; i < persons.length; i++) {
        const li = document.createElement('li');
        li.append(document.createTextNode(persons[i].toString()));
        personsList.append(li);
    }
}

function findPerson(persons, id) {
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === id) {
            return i;
        }
    }
    return -1;
}

function calcAge(persons) {
    console.log(persons);
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();

    for (let i = 0; i < persons.length; i++) {
        let parts = persons[i].brithDate.split("-");
        let inputYear = parseInt(parts[0]);
        let inputMonth = parseInt(parts[1]);
        let inputDay = parseInt(parts[2]);
        let age = currentYear - inputYear;
        if (currentMonth < inputMonth || (currentMonth === inputMonth && currentDay < inputDay)) {
            age--; // Уменьшите возраст, если текущая дата меньше введенной даты
        }
        persDate[i] = age;
    }
    return persDate;
    //console.log(persDate);
}


function Person(id, name, lastName, brithDate, age) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.brithDate = brithDate;
    this.toString = function () {
        return `ID: ${this.id}, first name: ${this.name}, Last name: ${this.lastName}, Date brithday: ${this.brithDate}`;
    }
};
