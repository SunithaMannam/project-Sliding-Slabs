window.onload = function () {

    /**
     *  action when 'Start Game' is clicked 
     * */
    const btn = document.querySelector(".btn-game");
    let game = undefined;
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
        game = new SSGame();
        game.init();
        console.log("start button clicked " + screen.getAttribute("display"));
    }

    /**
     *  function to stop the game and game canvas
     *  */
    function stop() {
        console.log(" stop button clicked ");
        btn.classList.remove('stop');
        btn.classList.add('start');
        btn.innerText = 'START GAME';
        // window.location.reload();
        game.stopGame();
        // game.gameCtx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        let img = new Image();
        img.src = 'images/gameover_1.jpg';
        img.onload = () => {
            game.gameCtx.clearRect(0, 0, game.canvas.width, game.canvas.height);
            game.gameCtx.drawImage(img, 0, 0, game.canvas.width, game.canvas.height);
        };
    }


};

/**
 * 
 * 
 *  1. screen  flickering
    2. the block before the collisonis detected it is moving and joining the next block 
    3. the block is not drawn from line 0. 

 */