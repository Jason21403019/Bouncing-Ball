const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circle_x = 160; //設定arc變數
let circle_y = 60; //設定arc變數
let radius = 20; //設定arc變數
let xSpeed = 18; //每千分之25秒球移動多少
let ySpeed = 18; //每千分之25秒球移動多少
let ground_x = 100; //地板的位置
let ground_y = 500; //地板的位置
let ground_height = 5; //地板的高度
let brickArray = [];
let count = 0;

//min,max
function getRandonmAribitrary(min, max) {
  //程式小技巧：取得最大值跟最小值中間的數
  return min + Math.floor(Math.random() * (max - min));
}

//製作磚塊物件
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visible = true;
  }
  //畫出磚塊
  drawBrick() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}
//畫大量的brick要使用for迴圈
for (let i = 0; i < 10; i++) {
  new Brick(getRandonmAribitrary(0, 950), getRandonmAribitrary(0, 550));
}

//設定滑鼠控制地板
c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX - 100;
});

function drawCircle() {
  //確認球是否撞到磚塊
  brickArray.forEach((brick) => {
    if (brick.visible && brick.touchingBall(circle_x, circle_y)) {
      count++;
      brick.visible = false;
      //改變X,Y方向速度，並且將撞擊到的磚塊從array中移除
      //從下方撞擊
      if (circle_y >= brick.y + brick.height) {
        ySpeed *= -1;
      }
      //從上方撞擊
      else if (circle_x >= brick.x + brick.width) {
        ySpeed *= -1;
      }
      //從右方撞擊
      else if (circle_x >= brick.x + brick.width) {
        xSpeed *= -1;
      }
      //從左方撞擊
      else if (circle_x <= brick.x) {
        xSpeed *= -1;
      }
      //   brickArray.splice(index, 1);
      //   if (brickArray == 0) {
      //     alert("Game Over");
      //     clearInterval(game);
      //   }
      if (count == 10) {
        alert("Game Over");
        clearInterval(game);
      }
    }
  });
  //確認球有碰到橘色地板
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    //增加球觸碰地板後的彈力
    if (ySpeed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    ySpeed *= -1;
  }
  //確認求有沒有打到邊界
  //確認右邊邊界
  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  //確認左邊邊界
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  //確認上邊邊界
  if (circle_y <= radius) {
    ySpeed *= -1;
  }
  //確認下邊邊界
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }

  //更動圓的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  //畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //畫出所有的磚塊
  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  //畫出可控制的地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, ground_height);

  //畫出圓球:有五個params(x, y, radius, starAngle, endAngle)
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
