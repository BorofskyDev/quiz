const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the make of time machine in "Back to the Future?"',
        choice1: 'GM',
        choice2: 'DeLorean',
        choice3: 'Ford',
        choice4: 'Honda',
        answer: 2,
    },

    {
        question: 'From one of the most famous 80s movies, who said the line "My way is not very sportsman-like?"',
        choice1: 'Harrison Ford',
        choice2: 'Hulk Hogan',
        choice3: 'Eddie Murphy',
        choice4: 'Andre the Giant',
        answer: 4,
    },

    {
        question: '"Shes your Queen-to-be, A Queen-to-be forever, A Queen who will do whatever...',
        choice1: 'An object of affection',
        choice2: 'To be used at your discretion',
        choice3: 'To quench your royal fire',
        choice4: 'His Highness desires',
        answer: 4,
    },

    {
        question: 'What song do they sing in the bar in Top Gun?',
        choice1: 'Youve Lost that Loving Feeling',
        choice2: 'Danger Zone',
        choice3: 'Take My Breath Away',
        choice4: 'Lead Me On',
        answer: 1,
    },

    {
        question: 'In the movie WarGames, what famous scientist is Dr Falken based on?',
        choice1: 'Albert Einstein',
        choice2: 'Enrico Fermi',
        choice3: 'Stephen Hawking',
        choice4: 'Max Planck',
        answer: 3,
    },

    {
        question: 'In The Breakfast Club, why is Allison Reynolds in detention?',
        choice1: 'Because she had nothing better to do',
        choice2: 'Late for class',
        choice3: 'Bullied a kid',
        choice4: 'Getting caught for doing drugs',
        answer: 1,
    },

    {
        question: 'What is the first film Jesse Ventura appeared in?',
        choice1: 'The Running Man',
        choice2: 'Thunderground',
        choice3: 'Predator',
        choice4: 'Fargo',
        answer: 3,
    },

    {
        question: 'What is the name of the AI Defense Network in Terminator?',
        choice1: 'Satnet',
        choice2: 'Bluesky',
        choice3: 'Terminator',
        choice4: 'Skynet',
        answer: 4,
    },

    {
        question: 'What 1988 comedy weaved together live action and animation to great success?',
        choice1: 'Who Framed Roger Rabbit',
        choice2: 'Space Jam',
        choice3: 'The Secret Life of Pets',
        choice4: 'Harvey',
        answer: 1,
    },

    {
        question: 'In Ghostbusters the role of Peter Venkman went to Bill Murray. However, who was originally supposed to have the role?',
        choice1: 'Dan Aykroyd',
        choice2: 'John Belushi',
        choice3: 'Steve Martin',
        choice4: 'Eddie Murphy',
        answer: 2,
    }

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/finish.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()