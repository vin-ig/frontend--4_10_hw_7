let clients = [
    {
        firstName: 'Александр',
        lastName: 'Иванчук',
        date: '11-29-1990',
        phone: '8 (929) 988-90-09',
        amounts: [2546, 2098, 764, 7266]
    },
    {
        firstName: 'Анатолий',
        lastName: 'Стаценко',
        date: '02-12-1987',
        phone: null,
        amounts: [563, 8287, 889]
    },
    {
        firstName: 'Марина',
        lastName: 'Петрова',
        date: '07-26-1997',
        phone: '8 (899) 546-09-08',
        amounts: [6525, 837, 1283, 392]
    },
    {
        firstName: 'Иван',
        lastName: 'Караванов',
        date: '09-12-1999',
        phone: null,
        amounts: [7634, 283, 9823, 3902]
    },
    {
        firstName: 'Оксана',
        lastName: 'Абрамова',
        date: '01-24-2002',
        phone: '8 (952) 746-99-22',
        amounts: [342, 766, 362]
    },
]

let bestClients = [
    {
        firstName: 'Рэйчел',
        lastName: 'Грин',
        date: '05-05-1970',
        phone: '8 (929) 988-90-09',
        amounts: [1100, 1200, 1300, 1400]
    },
    {
        firstName: 'Моника',
        lastName: 'Геллер',
        date: '04-22-1969',
        phone: null,
        amounts: [500, 8000, 800]
    },
    {
        firstName: 'Чендлер',
        lastName: 'Бинг',
        date: '01-22-1968',
        phone: '8 (899) 546-09-08',
        amounts: []
    },
    {
        firstName: 'Джо',
        lastName: 'Трибиани',
        date: '01-09-1968',
        phone: '8 (899) 546-09-08',
        amounts: [500, 8000, 800]
    },
]


// Часть 1
function getUserInput(text) {
    let result = prompt(text)
    return result ? result : null
}


let newClient = {
    firstName: getUserInput('Ваше имя?'),
    lastName: getUserInput('Ваша фамилия?'),
    date: getUserInput('Ваша дата рождения (мм-дд-гггг)?'),
    phone: getUserInput('Ваш телефон?'),
    amounts: [],
}

while (true) {
    if (!confirm(`Добавить покупку для клиента ${getFullName(newClient)}?`)) {
        break
    }
    let amount = +getUserInput('Введите сумму покупки')
    if (amount) {
        newClient.amounts.push(amount)
    }
}

clients.push(newClient)


// Часть 2
function getFullName(client) {
    return (client.firstName ?? '') + ' ' + (client.lastName ?? '')
}


function getBirthDay(date_str) {
    let date = new Date(date_str)
    let dateNow = new Date()
    let suffix = date.getDate() === dateNow.getDate() && date.getMonth() === dateNow.getMonth() ? ' (сегодня)' : ''
    return date.toLocaleString('ru-RU', {day: 'numeric', 'month': 'long'}) + suffix
}

function getAllAmount(numbers) {
    let sum = 0
    numbers.forEach((num) => {sum += num})
    return sum
}


function getAverageAmount(numbers) {
    let result = numbers.length !== 0 ? getAllAmount(numbers) / numbers.length : 0
    return result.toFixed(1)
}


function whoSpentMore(clients) {
    let max = 0
    let buyers = []
    for (let client of clients) {
        let allAmount = getAllAmount(client.amounts)
        let clientName = getFullName(client)

        if (allAmount > max) {
            buyers = [clientName]
            max = allAmount
        } else if (allAmount === max && allAmount !== 0) {
            buyers.push(clientName)
        }
    }

    let msg
    if (buyers.length === 0) {
        msg = 'Никто ничего не потратил'
    } else if (buyers.length === 1) {
        msg = `Больше всех потратил ${buyers[0]}. Сумма покупок: ${max}`
    } else {
        msg = `Больше всех потратили: ${buyers.join(', ')}. Сумма покупок: ${max}`
    }
    console.log(msg)
}


let showClients = (clients) => {
    for (let client of clients) {
        let clientName = getFullName(client)
        let avgAmount = getAverageAmount(client.amounts)
        let birthDay = getBirthDay(client.date)
        alert(`Клиент ${clientName} имеет среднюю сумму чека ${avgAmount}. День рождения клиента: ${birthDay}`)
    }
}

try {
    showClients(clients)
} catch(error) {
    console.log('Вызвана функция без параметров')
    console.log(error.message)
}
whoSpentMore(clients)

setTimeout(() => {
    showClients(bestClients)
    whoSpentMore(bestClients)
}, 3000)
