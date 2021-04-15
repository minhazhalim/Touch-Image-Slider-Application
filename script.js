const sliderContainer = document.querySelector('.slider-container');
const slide = Array.from(document.querySelectorAll('.slide'));
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let currentIndex = 0;
let animationID;
slide.forEach((slides,index) => {
     const slideImage = slides.querySelector('img');
     slideImage.addEventListener('dragstart',(event) => event.preventDefault());
     slides.addEventListener('touchstart',touchStart(index));
     slides.addEventListener('touchend',touchEnd);
     slides.addEventListener('touchmove',touchMove);
     slides.addEventListener('mousedown',touchStart(index));
     slides.addEventListener('mouseup',touchEnd);
     slides.addEventListener('mousemove',touchMove);
     slides.addEventListener('mouseleave',touchEnd);
});
window.addEventListener('resize',setPositionByIndex);
window.oncontextmenu = function(event){
     event.preventDefault();
     event.stopPropagation();
     return false;
}
function getPositionX(event){
     return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}
function touchStart(index){
     return function(event){
          currentIndex = index;
          startPosition = getPositionX(event);
          isDragging = true;
          animationID = requestAnimationFrame(animation);
          sliderContainer.classList.add('grabbing');
     }
}
function touchMove(event){
     if(isDragging){
          const currentPosition = getPositionX(event);
          currentTranslate = previousTranslate + currentPosition - startPosition;
     }
}
function touchEnd(){
     cancelAnimationFrame(animationID);
     isDragging = false;
     const moveBy = currentTranslate - previousTranslate;
     if(moveBy < -100 && currentIndex < slide.length - 1){
          currentIndex += 1;
     }
     if(moveBy > 100 && currentIndex > 0){
          currentIndex -= 1;
     }
     setPositionByIndex();
     sliderContainer.classList.remove('grabbing');
}
function animation(){
     setSliderPosition();
     if(isDragging){
          requestAnimationFrame(animation);
     }
}
function setPositionByIndex(){
     currentTranslate = currentIndex * -window.innerWidth;
     previousTranslate = currentTranslate;
     setSliderPosition();
}
function setSliderPosition(){
     sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
}