document.addEventListener('DOMContentLoaded', () => {
    const blanks = document.querySelectorAll('.blank');
    const resetButton = document.getElementById('reset');
    const timerDisplay = document.getElementById('timer');
    let startTime;
    let timerInterval;
    let isTimerRunning = false;

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
        resetTimer();
    };

    // タイマー関連関数
    function startTimer() {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 10);
        isTimerRunning = true;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00.00';
        isTimerRunning = false;
    }

    function updateTimer() {
        const now = new Date();
        const elapsedTime = now - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);

        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
    }

    // 初期化関数を呼び出して初期状態を設定
    initialize();

    blanks.forEach((blank, index) => {
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

            // タイマーの開始と停止の制御
            if (index === 0 && !isTimerRunning) {
                startTimer();
            } else if (index === blanks.length - 1 && isTimerRunning) {
                stopTimer();
            }
        });
    });

    resetButton.addEventListener('click', () => {
        initialize();
    });
});