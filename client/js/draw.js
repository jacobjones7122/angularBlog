// document.addEventListener('DOMContentLoaded', function () {
//     var c = document.getElementById('canvas');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     // Needed var for context
//     var ctx = c.getContext('2d');

//     var mouse = {
//         x: undefined,
//         y: undefined
//     };

//     var xPos = [
//         (window.innerWidth * 0),
//         (window.innerWidth * (1 / 8)),
//         (window.innerWidth * (2 / 8)),
//         (window.innerWidth * (3 / 8)),
//         (window.innerWidth * (4 / 8)),
//         (window.innerWidth * (5 / 8)),
//         (window.innerWidth * (6 / 8)),
//         (window.innerWidth * (7 / 8))
//     ];

//     var maxHeight = (Math.floor(window.innerHeight * .65));

//     var colorArray = [
//         'rgb(168, 255, 6)',
//         'rgb(0, 255, 100)',
//         'rgb(12, 232, 219)',
//         'rgb(0, 199, 255)', 
//         'rgb(0, 139, 255)',
//         'rgb(12, 19, 232)',
//         'rgb(101, 2, 232)',
//         'rgb(126, 0, 255)' 
//     ];

//     //location of mouse
//     window.addEventListener('mousemove', function(event){
//         mouse.x = event.x;
//         mouse.y = event.y;
//     });


//     // fills the page if window resizes
//     window.addEventListener('resize', function(){
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         init();
//     })


//     function Rectangle(positionX, positionY, x, y, color){
//         this.positionX = positionX;
//         this.positionY = positionY;
//         this.x = x;
//         this.y = y;
//         this.minHeight = this.positionY;
//         this.color = color;

//         this.draw = function(){
//             ctx.fillStyle = colorArray[this.color];
//             ctx.fillRect(this.positionX, this.positionY, this.x, this.y);
//         };
    
//        // this.draw();

//         this.movement = function(){
//             if(mouse.x - this.positionX > -this.x && mouse.x - this.positionX < this.x) {
//                 if (this.positionY > maxHeight) {
//                     this.positionY -= 5;
//                     this.y += 5;
//                 }
//             } else if (this.positionY < this.minHeight){
//                 this.positionY += 5; 
//                 this.y -= 5;
//             }
//             this.draw();       
//         }
//     }


//     //creation of rectangles
//     var rectangleArray = [];

//     function init(){
//         //rectangleArray = [];
//         for (var k = 0; k < 8; k++){
//             var x = xPos[1]; 
//             var y = 100;
//             var color = k;
//             var positionX = xPos[k];
//             var positionY = window.innerHeight - 100;
//             rectangleArray.push(new Rectangle(positionX, positionY, x, y, color));
//         };
//     };

//     init();   

//     function animate() {
//         requestAnimationFrame(animate);
//         ctx.clearRect(0, 0, innerWidth, innerHeight);

//         for (var j = 0; j < rectangleArray.length; j++){
//             rectangleArray[j].movement();
//         };
//     }

//     animate();

// });