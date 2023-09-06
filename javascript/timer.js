//---Document element reference---
let timerTime = document.getElementById('timerTime'); 
let playButton = document.getElementById('playButton'); 
let workingText = document.getElementById('working'); 
let pausingText = document.getElementById('pausing')

//---Internal variable---
let second = 0;
let state = 'paused';
let workState = 'working';
let run;

//---Function---

/**
 * Format a partial duration to a complete duration.
 * @param {*} string time string
 * @param {*} pad the completor
 * @param {*} length the lenght of the duration
 * @returns The new duration
 */
function formatHour(string, pad, length) 
{
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

/**
 * Render an amount of second to a complete text duration
 * @param {*} second the amout of second
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
            setSecond(300);
        }
        else if(workState == 'pausing')
        {            
            pausingText.style.textDecoration = 'none';
            workingText.style.textDecoration = 'underline';
            workState = 'working';
            setSecond(1500);
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

function reset() 
{
    clearInterval(run)
    setSecond(1500);
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

//---Running first automation---
reset();