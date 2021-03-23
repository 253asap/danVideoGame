let scenes = [
    {image:"../assets/images/black.png",
    text:"",
    choices:[
        ]
    },
    {image:"../assets/images/datarecording.jpg",
    text:"Your job  as the new intern has been going great, but you are starting to feel overwhelmed by the workload. Your boss has already assigned you a task, when a coworker shows up and asks for your help with his new project. What would a responsible professional do?",
    choices:[
        {choiceText:"Accept right away! It is very important to seem useful. Do both of the projects with your time reduced.",points:5},
        {choiceText:"Politely inform your coworker that you are working on a project of your own, but that you will be happy to help once you have finished your responsibilities.",points:10},
        {choiceText:"Drop the original project and inform your boss later that your coworker needed help.",points:0}
        ]
    },
    {image:"../assets/images/talkstomuch.jpg",
    text:"An older, more experienced manager is in conflict with a younger employee who “socializes constantly” with co-workers. This is very troublesome when it happens during times employees are supposed to focus on their work. The employee is popular and carries a lot of influence with their co-workers. The older manager is justifiably concerned that all the socialization by the employee is reducing productivity.",
    choices:[
        {choiceText:"Ignore the problem since it makes the office more lively.",points:0},
        {choiceText:"Talk to the employee and discuss the issue.",points:10},
        {choiceText:"Threaten to fire the employee.",points:5}
        ]
    },
    {image:"../assets/images/askforhelp.jpg",
    text:"You receive a company wide email from your manager requesting your contact information for company records. You reply to this email with:",
    choices:[
        {choiceText:"No Reply",points:0},
        {choiceText:"Reply All",points:5},
        {choiceText:"Reply only to the manager",points:10}
        ]
    },
    {image:"../assets/images/unresponsiveness.jpg",
    text:"A co-worker asks you for help responding to a customer inquiry, but you refuse to lend a hand because you are working on a tight deadline. There has been tension between you two ever since, and now you need their help on a project, but they're not being very responsive. What should you do?",
    choices:[
        {choiceText:"Ask for help from a manager.",points:10},
        {choiceText:"Ask to speak to the person in private to address the unresponsiveness.",points:5},
        {choiceText:"Just don't say anything and take it.",points:0}
        ]
    },
    {image:"../assets/images/John.jpg",
    text:` During his first week on the job, John was eager to learn everything in his department. He also gave his opinion freely in discussions. He worked overtime and did excellent work. Everyone seemed to like him. One man who had been with the company for a long time said, "You can't help but like John, but you can tell that he'd leave this department in a second if it meant getting closer to the top."`,
    choices:[{choiceText:"Continue",points:0}]
    },
    {image:"../assets/images/erica.jpg",
    text:`Erica started work on the same day as John. Unlike John, however, Erica kept more to herself. She concentrated on her job and stayed in her area. She made an effort to learn from others and listened to others in order to understand situations before jumping in with suggestions. One of her co-workers said, "Erica is a really nice gal. I think she's going to make a strong employee. I like her."`,
    choices:[{choiceText:"Continue",points:0}]
    },
    {image:"../assets/images/johnerica.png",
    text:"Based on the previous info, which employee is more likely to last longer?",
    choices:[
        {choiceText:"John",points:0},
        {choiceText:"Erica",points:5}
        ]
    },
    {image:"../assets/images/good.gif",
    text:"Congratulations!! Based on your answers to the previous questions, you have been acknowledged as extremely ready for the professional world! You have a solid understanding of what it means to be an adult in a professional environment!",
    choices:[]
    },
    {image:"../assets/images/okay.gif",
    text:"Based on your answers to the previous questions, you have been deemed ready for the professional world. Although there are some areas that you could use some work in, you have a basic understanding of what it means to be an adult in a professional environment",
    choices:[]
    },
    {image:"../assets/images/bad.gif",
    text:"Based on your answers to the previous questions, you are most definitely not ready for the professional world. You need to work on all aspects of understanding what it means to be an adult in the professional world. We reccomend you play the game some more!",
    choices:[]
    }
];
let sceneIndex=0;
let totalScore = 0;
let soundMuted = false;
let textIndex=0;
let gameScreen = document.querySelector(".screen");
let gameDialogue = document.querySelector("#gameDialogue");
const choices = document.querySelectorAll(".choice");
let txt = "Welcome to the demo gameplay of ADULTING THE GAME. Story written by: Ernesto G. & Anifa C. Programmed: Asa W.           Please note anything in this demo is not final and subject to change";
let theme = new Audio("../assets/sounds/masseffect.mp3");
theme.volume = 0.08;

//setting up functions
const nextScene = ()=>{
    sceneIndex++;
    gameDialogue.innerHTML = "";
    textIndex=0;
}
const chooseOption =(ele)=>{
    totalScore+=parseInt(ele.dataset.value);
    console.log(totalScore);
    sceneIndex++
    if(sceneIndex>7){
        if(totalScore>=30){
            sceneIndex=9;
            theme.pause();
            theme = new Audio("../assets/sounds/title.mp3");
            theme.volume = 0.10;
            theme.play()
        }
        if(totalScore>=35){
            sceneIndex=8;
            theme.pause();
            theme = new Audio("../assets/sounds/happy.mp3");
            theme.volume = 0.10;
            theme.play();
        }
        if(totalScore<30){
            sceneIndex=10;
            theme.pause();
            theme = new Audio("../assets/sounds/loss.mp3");
            theme.volume = 0.10;
            theme.play();
        }
    }
    gameScreen.style.backgroundImage= `url('${scenes[sceneIndex].image}')`;
    gameDialogue.innerHTML="";
    textIndex=0;
    txt = scenes[sceneIndex].text;
    textAppear();
    if(textIndex<txt.length-1){
        setTimeout(()=>{
            if(scenes[sceneIndex].choices.length===0){
                fade(gameScreen);
                return;
            }
            for(let i=0;i<choices.length;i++){
            choices[i].innerHTML = scenes[sceneIndex].choices[i].choiceText;
            choices[i].setAttribute("data-value",scenes[sceneIndex].choices[i].points);
            fade(choices[i]);
        }
        }, 2700);
    }
}
const resetGame = ()=>{}
const fade =(element)=>{
    let classeNames = element.className.split(" ");
    for(let i =0;i<classeNames.length;i++){
        if(classeNames[i]==="fadeIn"){
            playSound("select");
            choices.forEach(choice=>{
                choice.classList.remove("fadeIn");
                choice.classList.add("fadeOut");
                gameScreen.classList.remove("fadeIn");
                gameScreen.classList.add("fadeOut");
            });
            break;
        }
        gameScreen.classList.remove("fadeOut");
        gameScreen.classList.add("fadeIn");
        element.classList.remove("fadeOut");
        element.classList.add("fadeIn");
    }
}

const muteSounds=()=>{}
const playSound=(sound)=>{
    let audio;
    switch(sound){
        case "select":
            audio = new Audio(`../assets/sounds/${sound}.mp3`);
            audio.volume=0.12;
            audio.play();
            break;
        case "knocking":
            audio = new Audio(`../assets/sounds/${sound}.mp3`);
            audio.play();
            break;
        case "opening":
            audio = new Audio(`../assets/sounds/${sound}.mp3`);
            audio.play();
            break;
        case "typing":
            audio = new Audio(`../assets/sounds/${sound}.mp3`);
            audio.volume=0.12;
            audio.play();
            break;
        case "walking":
            audio = new Audio(`../assets/sounds/${sound}.mp3`);
            audio.play();
            break;
        case "hover":
            audio = new Audio(`../assets/sounds/${sound}.wav`);
            audio.volume=0.03;
            audio.play();
            break;
    }
}
const textAppear =()=>{
    if(textIndex<txt.length){
        
        if(textIndex%4===0){
            playSound("typing");
        }
        document.getElementById("gameDialogue").innerHTML += txt.charAt(textIndex);
        textIndex++;
        setTimeout(textAppear, 15);
    }
}
choices.forEach((el)=>{
    el.addEventListener("click",()=>fade(el));
    el.addEventListener("click", ()=>{
        setTimeout(()=>{
            chooseOption(el)
        },1000);
    });
    el.addEventListener("mouseover",()=>{
        playSound("hover");
    })
    // el.addEventListener("click",()=>playSound(el));
});
document.getElementById("start").addEventListener("click",()=>{
    theme.play();
})
// gameScreen.addEventListener("click",chooseOption)
textAppear();