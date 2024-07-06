const display =document.getElementById("watch");
const laps=document.getElementById("laps");
let timer=null;
let startTime=0;
let elapsedTime=0;/*The Amount of time passed since the start of the event*/ 
let isrunning=false;
let lapsarray=[];

function start(){
    if(!isrunning)
    {
        isrunning=true;
        startTime=Date.now()-elapsedTime;/*Date.now returns the Current time in milliseconds. */
        timer=setInterval(update,10)/*Call a function or excute witha fixed time delay. To stop setInterval we have to use clearInterval() */
        document.getElementById("Start").textContent = "Stop";
    }
    else{
        isrunning=false;
        clearInterval(timer);
        document.getElementById("Start").textContent="Start";
    }
}

function reset(){
    clearInterval(timer);
    startTime=0;
    elapsedTime=0;
    isrunning=false;
    display.textContent="00:00:00:00";
    laps.textContent="";
    lapsarray=[];
    document.getElementById("Start").textContent="Start";
}

function lap(){
    if(isrunning)
    {
        elapsedTime=Date.now()-startTime;
        let hours=Math.floor(elapsedTime/(1000*60*60));
        let mins=Math.floor(elapsedTime/(1000*60)%60);
        let secs=Math.floor(elapsedTime/1000 % 60);
        let millisecs=Math.floor(elapsedTime%1000 /10);
    
        hours=String(hours).padStart(2,"0");
        mins=String(mins).padStart(2,"0");
        secs=String(secs).padStart(2,"0");
        millisecs=String(millisecs).padStart(2,"0");
    
        const lapElement = document.createElement("div");
    /*createElement() method in JavaScript is used to create a new HTML element with a specified tag name. */
        lapElement.textContent = `${hours}:${mins}:${secs}:${millisecs}`;

    // Add the new lap to the laps array and limit to the latest 5
        lapsarray.push(lapElement);
        if (lapsarray.length > 7) {
            lapsarray.shift();//array.shift() removes and return the first element of the array
        }

    
        laps.innerHTML = "";//This line clears any existing content inside the laps element
        for (let i = 0; i < lapsarray.length; i++) {
            laps.appendChild(lapsarray[i]);//appendChild() is used to add lap elements to the laps
        }
    }
}


function update()
{
    let currentTime = Date.now();
    elapsedTime=currentTime-startTime;

    let hours=Math.floor(elapsedTime/(1000*60*60));
    let mins=Math.floor(elapsedTime/(1000*60)%60);
    let secs=Math.floor(elapsedTime/1000 % 60);
    let millisecs=Math.floor(elapsedTime%1000 /10);

    hours=String(hours).padStart(2,"0");
    mins=String(mins).padStart(2,"0");
    secs=String(secs).padStart(2,"0");
    millisecs=String(millisecs).padStart(2,"0");

    display.textContent=`${hours}:${mins}:${secs}:${millisecs}`;

}