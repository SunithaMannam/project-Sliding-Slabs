window.onload = function () {

    /**
     *  action when 'Start Game' is clicked 
     * */
    const btn = document.querySelector(".btn-game");
    btn.onclick = function () {
        if (btn.classList.contains("start")) {
            start();
        } else {
            stop();
        }
    }

    /**
     *  function to start the game and game canvas
     *  */
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

    /**
     *  function to stop the game and game canvas
     *  */
    function stop() {
        console.log(" stop button clicked ");
    }


};