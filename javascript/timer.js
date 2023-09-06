//---Document element reference---
let timerTime = document.getElementById('timerTime'); 
let playButton = document.getElementById('playButton')

//---Internal variable---
let second = 0;
let state = 'paused'

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
        second = 0; 
    }
    else
    {
        timerTime.innerHTML = secondToDuration(second);
    }
}

/**
 * Launch the counter
 */
function play()
{
    playButton.innerHTML = "<i class='fa-solid fa-pause'></i>"
    state = 'running'

    let run = setInterval(()=>{
        if(state == 'running')
        {
            addSecond(-1);    
        }
        else
        {
            clearInterval(run);
        }
    }, 1000);
}

/**
 * Pause the counter
 */
function pause()
{
    playButton.innerHTML = "<i class='fa-solid fa-play'></i></button>"
    state = 'paused'
}

function updateBackground()
{

}

//---Event Listener---

playButton.addEventListener('click', () =>
{
    if(state == 'paused')
    {
        play();
    }
    else
    {
        pause();
    }
})

//---Running first automation---
addSecond(1500)