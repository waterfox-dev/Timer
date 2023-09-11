//---Document element reference---
let timerTime = document.getElementById('timerTime'); 
let playButton = document.getElementById('playButton'); 
let workingText = document.getElementById('working'); 
let pausingText = document.getElementById('pausing');
let workInput = document.getElementById('workInput'); 
let pauseInput = document.getElementById('pauseInput');
let configButton = document.getElementById('configButton');
let timerConfig = document.getElementById('timerConfig')

//---Internal variable---
let second = 0;
let state = 'paused';
let workState = 'working';
let workDuration = 1500; 
let pauseDuration = 300;
let run;

//---Function---

/**
 * Format a partial duration to a complete duration.
 * @param {string} inputString time string
 * @param {string} pad the completor
 * @param {int} length the lenght of the duration
 * @returns The new duration
 */
function formatHour(inputString, pad, length) 
{
    return (new Array(length + 1).join(pad) + inputString).slice(-length);
}

/**
 * Render an amount of second to a complete text duration
 * @param {int} second the amout of second
 * @returns the complete text
 */
function secondToDuration(second)
{
    const textMinutes = Math.floor(second / 60);
    const textSeconds = second - textMinutes * 60;
    return formatHour(textMinutes, '0', 2) + ':' + formatHour(textSeconds, '0', 2);
}

/**
 * Add a number of seconds to the counter
 * @param {*} addingSecond the number of seconds
 */
function addSecond(addingSecond)
{
    second = second + addingSecond;
    if(second < 0)
    {
        if(workState == 'working')
        {
            pausingText.style.textDecoration = 'underline';
            workingText.style.textDecoration = 'none';
            workState = 'pausing';
            setSecond(pauseDuration);
        }
        else if(workState == 'pausing')
        {            
            pausingText.style.textDecoration = 'none';
            workingText.style.textDecoration = 'underline';
            workState = 'working';
            setSecond(workDuration);
        }
    }
    else
    {
        timerTime.innerHTML = secondToDuration(second);
    }
}

/**
 * Set second to the counter
 * @param {*} s second value
 */
function setSecond(s)
{
    second = s
    timerTime.innerHTML = secondToDuration(second);

}

/**
 * Launch the counter
 */
function play()
{
    playButton.innerHTML = "<i class='fa-solid fa-pause'></i>"


    let run = setInterval(()=>{
        if(state == 'running')
        {
            addSecond(-1);
        }
    }, 1000);
}

/**
 * Reset the counter
 */
function reset() 
{
    clearInterval(run)
    setSecond(workDuration);
    workingText.style.textDecoration = 'underline';
    pausingText.style.textDecoration = 'none';
    playButton.innerHTML = "<i class='fa-solid fa-play'></i>"
}

//---Event Listener---

playButton.addEventListener('click', () =>
{
    if(state == 'paused')
    {
        state = 'running';
        play();
    }
    else
    {
        state = 'paused';
        reset()
    }
})

workInput.addEventListener('change', (event) => {
    workDuration = event.target.value * 60;
    sessionStorage.setItem('pomWorkDur', event.target.value * 60);
    reset();
});

pauseInput.addEventListener('change', (event) => {
    pauseDuration = event.target.value * 60;
    sessionStorage.setItem('pomPauseDur', event.target.value * 60);
    reset();
});

configButton.addEventListener('click', () =>{
    timerConfig.hidden = !timerConfig.hidden;
});

//---Running first automation---
console.log(sessionStorage);

if(sessionStorage.getItem('pomWorkDur'))
{
    workDuration = sessionStorage.getItem('pomWorkDur');
}

if(sessionStorage.getItem('pomPauseDur')) 
{
    pauseDuration = sessionStorage.getItem('pomPauseDur');
}

workInput.value = workDuration / 60;
pauseInput.value = pauseDuration / 60;

reset();

