/*Get our elements*/

let player = document.querySelector('.container');
let video = player.querySelector('.viewer');
let progress = player.querySelector('.progress');
let progressSlider = player.querySelector('.progress-slider');
let toggle = player.querySelector('.toggle');
let skipButton = player.querySelectorAll('[data-skip]');
let ranges = player.querySelectorAll('.player__slider')


/*function checkButtons(e){
    console.log(e)
}

skipButton.forEach(button => button.addEventListener('click', checkButtons));*/

//Build out functions 

function togglePlay() {
    let method = video.paused ? 'play' : 'pause';
    video[method]();
    /* it is the same what codes up if(video.paused){
            video.play();
        } else{
            video.pause();
        }*/
}

function updateButton() {
    let icon = this.paused ? '►' : '| |';
    toggle.textContent = icon;
}


function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
    console.log(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    let progress = parseFloat(video.currentTime / video.duration) * 100 + '%';
    progressSlider.style.width = `${progress}`;


};

function changeHandleProgress(e) {
    let positionOnTheProgress = (e.layerX / progress.offsetWidth) * video.duration;
    console.log(e.layerX / progress.offsetWidth);
    console.log(positionOnTheProgress);
    video.currentTime = positionOnTheProgress;
    progressSlider.style.width = positionOnTheProgress + 'px';
}

function fullScreen() {
    let fullWidth = window.outerWidth;
    let fullHeigth = window.outerHeight;
    
/*    player.classList.toggle('fullscreen');
    video.classList.toggle('fullscreen');*/
/*
    player.style.width = fullWidth + 'px';
    player.style.height = fullHeigth + 'px';
    video.style.width = fullWidth + 'px';
    video.style.height = fullHeigth + 'px';
    console.log(video.offsetHeight);
    console.log(fullWidth);*/
}


//Hook-up the event listener
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

let mousedown = false;

video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', changeHandleProgress);
progress.addEventListener('mousemove', (e) => mousedown && changeHandleProgress(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


skipButton.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let screen = false;
video.addEventListener('dblclick', fullScreen);

