const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const outputElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
// const buttonElement = document.querySelector('button')

function changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100,
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        outputElement.textContent = data.choices[0].message.content //Lay tu console log data
        if(data.choices[0].message.content) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    }catch (error){
        console.error(error)
    }
}
submitButton.addEventListener('click', getMessage)

function clearInput() {
    inputElement.value = ''
}
// buttonElement.addEventListener('click', clearInput)