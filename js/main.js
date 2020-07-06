window.onload = function () {
    const btn = document.querySelector(".btn-game");
    btn.onclick = function () {
        if (btn.classList.contains("start")) {
            start();
        } else {
            stop();
        }
    }

    function start() {
        btn.classList.remove('start');
        btn.classList.add('stop');
        btn.innerText = 'STOP GAME';
        const screen = document.querySelector("#ss-canvas");
        screen.style.display = 'inline';
        let game = new SSGame();
        game.init();
        console.log("start button clicked " + screen.getAttribute("display"));
    }

    function stop() {
        console.log(" stop button clicked ");
    }



};