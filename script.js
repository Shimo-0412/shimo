document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.container');

    containers.forEach(container => {
        const blanks = container.querySelectorAll('.blank');
        const resetButton = container.querySelector('.reset');
        const showAllButton = container.querySelector('.show-all');
        const timerSpan = container.querySelector('.timer');
        let timer = 0;
        let timerInterval = null;
        let firstButtonClicked = false;

        const initialize = () => {
            blanks.forEach(blank => {
                const answerSpan = blank.querySelector('.answer');
                const button = blank.querySelector('button');
                const answer = blank.dataset.answer;
                answerSpan.innerHTML = '&nbsp;'.repeat(answer.length);
                button.classList.remove('toggled');
                button.classList.add('initial');
            });
            timer = 0;
            firstButtonClicked = false;
            clearInterval(timerInterval);
            timerSpan.textContent = timer;
        };

        initialize();

        blanks.forEach((blank, index) => {
            const button = blank.querySelector('button');
            const answerSpan = blank.querySelector('.answer');
            const answer = blank.dataset.answer;

            button.addEventListener('click', () => {
                if (!firstButtonClicked) {
                    firstButtonClicked = true;
                    timerInterval = setInterval(() => {
                        timer += 1;
                        timerSpan.textContent = timer;
                    }, 1000);
                }

                if (answerSpan.innerHTML.trim() === '&nbsp;'.repeat(answer.length).trim()) {
                    answerSpan.innerHTML = answer;
                    button.classList.remove('initial');
                    button.classList.add('toggled');
                } else {
                    answerSpan.innerHTML = '&nbsp;'.repeat(answer.length);
                    button.classList.remove('toggled');
                    button.classList.add('initial');
                }

                if (Array.from(blanks).every(b => b.querySelector('.answer').innerHTML.trim() !== '&nbsp;'.repeat(b.dataset.answer.length).trim())) {
                    clearInterval(timerInterval);
                }
            });
        });

        resetButton.addEventListener('click', () => {
            initialize();
        });

        showAllButton.addEventListener('click', () => {
            blanks.forEach(blank => {
                const answerSpan = blank.querySelector('.answer');
                const button = blank.querySelector('button');
                const answer = blank.dataset.answer;
                answerSpan.innerHTML = answer;
                button.classList.remove('initial');
                button.classList.add('toggled');
            });
            clearInterval(timerInterval);
        });
    });
});
