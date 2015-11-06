app.controller('snakeCtrl', ['$scope', '$timeout', '$window' ,function($scope, $timeout, $window){

  var boardsize = 15;

  var direction = {
    left: 37,
    right: 39,
    up: 38,
    down: 40
  };

  var colors = {
    game_over: '#DDE8E0',
    fruit: '#749CA8',
    snakehead: '#BC5E21',
    snakebody: '#F9E0A8',
    board: '#000'
  };

  var snake = {
    direction: direction.left,
    parts: [{
      x: -1,
      y: -1
    }]
  };

  var fruit = {
    x: -1,
    y: -1
  };

  var interval, tempdirection, gameover;

  $scope.score = 0;

  $scope.setStyling = function(col, row) {
    if (gameover) {
      return colors.game_over;
    } else if (fruit.x == row && fruit.y == col) {
      return colors.fruit;
    } else if (snake.parts[0].x == row && snake.parts[0].y == col) {
      return colors.snakehead;
    } else if ($scope.board[col][row] === true) {
      return colors.snakebody;
    }
    return  colors.board

  };

    function update() {
      var newHead = getnewhead();
      if (boardcollision(newHead) || selfcollision(newHead)) {
        return gameOver();
      } else if (fruitcollision(newHead)) {
        eatfruit();
      }
        var oldtail = snake.parts.pop();

        $scope.board[oldtail.y][oldtail.x] = false;

        snake.parts.unshift(newHead);

        $scope.board[newHead.y][newHead.x] = true;

        snake.direction = tempdirection;
        $timeout(update, interval);

    }

function getnewhead() {
    var newHead = angular.copy(snake.parts[0]);

    if (tempdirection === direction.left) {
      newHead.x -= 1;
    } else if (tempdirection === direction.right) {
      newHead.x += 1;
    } else if (tempdirection === direction.up) {
      newHead.y -= 1;
    } else if (tempdirection === direction.down) {
      newHead.y += 1;
    }

    return newHead;
  }



  function boardcollision(part) {
      return part.x === boardsize || part.x === -1 || part.y === boardsize || part.y === -1;
    };

  function selfcollision(part){
      return $scope.board[part.y][part.x] === true;
    };

  function fruitcollision (part) {
      return part.x === fruit.x && part.y === fruit.y;
    }



  function fruitmove () {
      var x = Math.floor(Math.random() * boardsize);
      var y = Math.floor(Math.random() * boardsize);

      if ($scope.board[y][x] === true) {
        return fruitmove();
      }
      fruit = {
        x: x,
        y: y
      };
    }

  function eatfruit(){
      $scope.score++;
      var tail = angular.copy(snake.parts[snake.parts.length - 1]);
      snake.parts.push(tail);
      fruitmove();

      if ($scope.score % 5 === 0) {
        interval -= 15;
      }
    }

  function gameOver() {
    gameover = true;

    $timeout(function() {
      gameover = false;
    }, 500);

    setupboard();
  }


  function setupboard() {
    $scope.board = [];
    for (var i = 0; i < boardsize; i++) {
      $scope.board[i] = [];
      for (var j = 0; j < boardsize; j++) {
        $scope.board[i][j] = false;
      }
    }
  }


  setupboard();

  $window.addEventListener("keyup", function(e) {
    if (e.keyCode === direction.left && snake.direction !== direction.right) {
      tempdirection = direction.left;
    } else if (e.keyCode === direction.up && snake.direction !== direction.down) {
      tempdirection = direction.up;
    } else if (e.keyCode === direction.right && snake.direction !== direction.left) {
      tempdirection = direction.right;
    } else if (e.keyCode === direction.down && snake.direction !== direction.up) {
      tempdirection = direction.down;
    }
  });

  $scope.startGame = function() {
    $scope.score = 0;
    snake = {
      direction: direction.left,
      parts: []
    };
    tempdirection = direction.left;
    gameover = false;
    interval = 150;

    for (var i = 0; i < 4; i++) {
      snake.parts.push({
        x: 10 + i,
        y: 10
      });
    }
    fruitmove();
    update();
  }

}])
