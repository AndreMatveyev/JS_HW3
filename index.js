// Задача 1
// Создать функцию - конструктор, которая будет иметь внутри 
// все свойства обьекта emplyee из массива emplyeeArr;
const Emploee = function(employee) {
    for (const key in employee) {
        this[key] = employee[key];
    }
    // Задача 7
    // Создать дескриптор со свойством fullInfo который будет записывать 
    // все свойства переданные ему в экземпляр от которого он вызывается. 
    // И выдавать все свойства, если к нему обратиться, в виде строки 
    // <Название свойства> - <значение> через запятую.
    Object.defineProperty(this, 'fullInfo', {
        det() {
            let arr = [];
            for (const key in this) {
                if (typeof this[key] !== 'function') {
                    arr.push(key + ' - ' + this[key]);
                }
            }
            return arr.join(', ');
        },

        set(properties) {
            for (const key in properties) {
                // Если свойства в передаваемом объекте не было объявленно 
                // в классе, то это свойство не записываем в экземпляр
                if (this.hasOwnProperty(key) && properties[key].length) {
                    this[key] = properties[key];
                }
            }
        }
    });
}

const employeeObj = new Emploee(emplyeeArr[0]);
console.log(employeeObj);
console.log(employeeObj.fullInfo);
employeeObj.fullInfo = {name: 'Вася', salary: 9000, email: 'ex@mail.ua'};
console.log(employeeObj);

// Задача 2
// Добавить функции - конструктору метод (помним про prototype): 
// getFullName который вернет полное имя начиная с фамилии в виде строки
Emploee.prototype.getFullName = function() {
    return `${this.surname} ${this.name}`
}

console.log(employeeObj.getFullName);

// Задача 3
// Создать новый массив на основе emplyeeArr в котором будут содержаться те же обьекты, 
// но созданные функцией - конструктором Emploee. Новый массив должен содержать имя 
// emplyeeConstructArr.
let createEmployesFromArr = (arr) => {
    const employeesList = [];
    for (const employee of arr) {
       const emplyeeConstruct = new Emploee(employee);
       employeesList.push(emplyeeConstruct);
    }
    return employeesList;
}

const emplyeeConstructArr = createEmployesFromArr(emplyeeArr);
console.log(emplyeeConstructArr);

// Задача 4
// Создать функцию которая вернет массив со всеми полными именами 
// каждого employee, содержащегося в emplyeeConstructArr;
const getFullNamesFromArr = (arr) => {
    const fullNamesList = [];
    for (const employee of arr) {
        const fullName = employee.getFullName();
        fullNamesList.push(fullName);
    }
    return fullNamesList;
}
    
console.log(getFullNamesFromArr(emplyeeConstructArr));

// Задача 5
// Создать функцию которая вернет среднее значение зарплаты всех employee
const getMiddleSalary = (arr) => {
    let sumSalary = 0;
    for (const employee of arr) {
        sumSalary += employee.salary;
    }
    return Math.round(sumSalary / arr.length);
}

console.log(getMiddleSalary(emplyeeConstructArr));

// Задача 6
// Создать функцию которая выберет наугад работника из массива emplyeeConstructArr. 
// Вы должны учитывать в функции длинну массива, так как если работников 7, 
// а рандомное число будет равно больше 7, то результат будет undefined. 
// Вы можете использовать обьявленную функцию в сомой же себе. 
const getRandomEmployee = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}
    
console.log(getRandomEmployee(emplyeeConstructArr));
