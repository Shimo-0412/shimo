document.addEventListener('DOMContentLoaded', () => {
    const blanks = document.querySelectorAll('.blank');
    const resetButton = document.getElementById('reset');

    // 初期化関数を定義
    const initialize = () => {
        blanks.forEach(blank => {
            const answerSpan = blank.querySelector('.answer');
            const button = blank.querySelector('button');
            const answer = blank.dataset.answer;
            answerSpan.innerHTML = '&nbsp;'.repeat(answer.length);

            // ボタンの状態をリセット
            button.classList.remove('toggled');
            button.classList.add('initial');
        });
    };

    // 初期化関数を呼び出して初期状態を設定
    initialize();

    blanks.forEach(blank => {
        const button = blank.querySelector('button');
        const answerSpan = blank.querySelector('.answer');
        const answer = blank.dataset.answer;

        button.addEventListener('click', () => {
            if (answerSpan.textContent.trim() === "") {
                answerSpan.innerHTML = answer;
                button.classList.remove('initial');
                button.classList.add('toggled');
            } else {
                answerSpan.innerHTML = '&nbsp;'.repeat(answer.length);
                button.classList.remove('toggled');
                button.classList.add('initial');
            }
        });
    });

    resetButton.addEventListener('click', () => {
        initialize();
    });
});
