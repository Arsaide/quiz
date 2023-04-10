(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const questions = [ {
        question: "Горіли солом'яні стріхи над Ворсклою.",
        answers: [ "Складносурядне речення", "Безсполучникове", "Складне з різними видами зв'язку", "Називне", "Складнопідрядне" ],
        correct: 4
    }, {
        question: " І загула б та книга голосами, і всі б щось говорили не те саме.",
        answers: [ "Складносурядне речення", "Безсполучникове", "Складне з різними видами зв'язку", "Називне", "Складнопідрядне" ],
        correct: 1
    }, {
        question: "Тоді ми, вряд, упевнившись на ділі, що Гриць умер, отруєний, в четвер, предать землі звеліли до неділі, прийнявши справу криміналітер.",
        answers: [ "Складносурядне речення", "Безсполучникове", "Складне з різними видами зв'язку", "Називне", "Складнопідрядне" ],
        correct: 3
    }, {
        question: "Оскаржену Марусю Чураївну тоді суддя суворо запитав, — коли, чого і для якой причини таке незбожне діло учинила.",
        answers: [ "Складносурядне речення", "Безсполучникове", "Складне з різними видами зв'язку", "Називне", "Складнопідрядне" ],
        correct: 2
    }, {
        question: "Ну, ті сказали, що Маруся — відьма.",
        answers: [ "Складносурядне речення", "Безсполучникове", "Складне з різними видами зв'язку", "Називне", "Складнопідрядне" ],
        correct: 5
    },  {
        question: "То вам, панеове, правдиво, під сумлінням, кажу і людьми те освідчу.",
        answers: [ "Означено - особове", "Неозначено - особове", "Узагальнено - особове", "Називне", "Безособовве"],
        correct: 1
    }, {
        question: "Хай буде легко, дотиком пера",
        answers: [ "Означено - особове", "Неозначено - особове", "Узагальнено - особове", "Називне", "Безособовве"],
        correct: 5
    }, {
        question: "Здається небо й земллю розхитають.",
        answers: [ "Означено - особове", "Неозначено - особове", "Узагальнено - особове", "Називне", "Безособовве"],
        correct: 2
    } ];
    const headerContainer = document.querySelector("#header");
    const listContainer = document.querySelector("#list");
    const submitBtn = document.querySelector("#submit");
    let score = 0;
    let questionIndex = 0;
    clearPage();
    showQuestion();
    submitBtn.onclick = checkAnswer;
    function clearPage() {
        headerContainer.innerHTML = "";
        listContainer.innerHTML = "";
    }
    function showQuestion(answerText) {
        const headerTemplate = `<h2 class="title">%title%</h2>`;
        const titleHTML = headerTemplate.replace("%title%", questions[questionIndex]["question"]);
        headerContainer.innerHTML = titleHTML;
        let answerNumber = 1;
        for (answerText of questions[questionIndex]["answers"]) {
            const questionTemplate = `\n            <li>\n                <label>\n                    <input value="%number%" type="radio" class="answer" name="answer" />\n                    <span>%answer%</span>\n                </label>\n            </li>\n        `;
            const answerHTML = questionTemplate.replace("%answer%", answerText).replace("%number%", answerNumber);
            listContainer.innerHTML += answerHTML;
            answerNumber++;
        }
    }
    function checkAnswer() {
        const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
        if (!checkedRadio) {
            submitBtn.blur();
            return;
        }
        const userAnswer = parseInt(checkedRadio.value);
        if (userAnswer === questions[questionIndex]["correct"]) {
            score++;
            console.log("score", score);
        }
        if (questionIndex !== questions.length - 1) {
            console.log("NO Last question");
            questionIndex++;
            clearPage();
            showQuestion();
            return;
        } else {
            console.log("Last question");
            clearPage();
            showResults();
        }
    }
    function showResults() {
        console.log("showResult started");
        const resultsTemplate = `\n        <h2 class="title">%title%</h2>\n        <h3 class="summary">%message%</h3>\n        <p class="result">%result%</p>\n    `;
        let title, message;
        if (score === questions.length) {
            title = "Вітаємо!😄";
            message = "Ви відповіли правильно на всі запитання!🥳🎉";
        } else if (100 * score / questions.length >= 50) {
            title = "Непоганий результат!";
            message = "Ви дали більше половини правильних відповідей!😌😉";
        } else {
            title = "Варто постаратися!";
            message = "У вас менше половини правильних відповідей... 🤨🤨🤨";
        }
        let result = `${score} из ${questions.length}`;
        const finalMessage = resultsTemplate.replace("%title%", title).replace("%message%", message).replace("%result%", result);
        headerContainer.innerHTML = finalMessage;
        submitBtn.blur();
        submitBtn.innerText = "Почати заново";
        submitBtn.onclick = () => history.go();
    }
    const modalTrigger = document.querySelectorAll("[data-modal]"), modal = document.querySelector(".modal"), modalCloseBtn = document.querySelector("[data-close]");
    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    modalTrigger.forEach((btn => {
        btn.addEventListener("click", openModal);
    }));
    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }
    modalCloseBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e => {
        if (e.target === modal) closeModal();
    }));
    document.addEventListener("keydown", (e => {
        if ("Escape" === e.code && modal.classList.contains("show")) closeModal();
    }));
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    window.addEventListener("scroll", showModalByScroll);
    window["FLS"] = true;
    isWebp();
})();
