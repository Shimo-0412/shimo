document.addEventListener('DOMContentLoaded', () => {
    const blanks = document.querySelectorAll('.blank');
    const resetButton = document.getElementById('reset');

    blanks.forEach(blank => {
        const button = blank.querySelector('button');
        const answerSpan = blank.querySelector('.answer');
        const answer = blank.dataset.answer;

        // 初期状態のクラスを設定
        button.classList.add('initial');

        button.addEventListener('click', () => {
            if (answerSpan.textContent.trim() === "") {
                answerSpan.textContent = answer;
                button.classList.remove('initial');
                button.classList.add('toggled');
            } else {
                answerSpan.textContent = ' '.repeat(answer.length);
                button.classList.remove('toggled');
                button.classList.add('initial');
            }
        });
    });

    resetButton.addEventListener('click', () => {
        blanks.forEach(blank => {
            const answerSpan = blank.querySelector('.answer');
            const button = blank.querySelector('button');
            const answer = blank.dataset.answer;
            answerSpan.textContent = ' '.repeat(answer.length);

            // ボタンの状態をリセット
            button.classList.remove('toggled');
            button.classList.add('initial');
        });
    });
});
