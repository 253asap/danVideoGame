let scenes = [
    {image:"../assets/images/black.png",
    text:"",
    choices:[
        ]
    },
    {image:"../assets/images/datarecording.jpg",
    text:"Your job  as the new intern has been going great, but you are starting to be overwhelmed by the workload. Your boss has already assigned you a task, when a coworker shows up and asks for your help with his new project. What would a responsible professional do?",
    choices:[
        {choiceText:"Your job  as the new intern has been going great, but you are starting to be overwhelmed by the workload. Your boss has already assigned you a task, when a coworker shows up and asks for your help with his new project. What would a responsible professional do?",points:5},
        {choiceText:"Politely inform your coworker that you are working on a project of your own, but that you will be happy to help once you have finished your responsibilities.",points:10},
        {choiceText:"Drop the original project and inform your boss later that your coworker needed help.",points:0}
        ]
    },
    {image:"../assets/images/talkstomuch.jpg",
    text:"An older, more experienced manager is in conflict with a younger employee who “socializes constantly” with co-workers. This is very troublesome when it happens during times employees are supposed to focus on their work. The employee is popular and carries a lot of influence with their co-workers. The older manager is justifiably concerned that all the socialization by the employee is reducing productivity.",
    choices:[
        {choiceText:"lorem",points:0},
        {choiceText:"lorem",points:0},
        {choiceText:"lorem",points:0}
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
    text:"They ask you for help responding to a customer inquiry, but you refuse to lend a hand because you are working on a tight deadline and don't want to waste time. There has been tension between you two ever since, and now you need their help on a project, but they're not being very responsive.",
    choices:[
        {choiceText:"Ask for help from a manager.",points:10},
        {choiceText:"Ask to speak to the person in private to address the unresponsiveness.",points:5},
        {choiceText:"just don't say anything and take it.",points:0}
        ]
    },
    {image:"../assets/images/John.jpg",
    text:` During his first week on the job, John was eager to learn everything and to know everyone in his department. He gave his opinion freely in discussions. He worked overtime and did excellent work. Everyone seemed to like him. One man who had been with the company for a long time said, "You can't help but like John, but you can tell that he'd leave this department in a second if it meant getting closer to the top."`,
    choices:[]
    },
    {image:"../assets/images/erica.jpg",
    text:`Erica started work on the same day as John. Unlike John, however, Erica kept more to herself. She concentrated on her job and stayed in her area. She made an effort to learn from others and listened to others in order to understand situations before jumping in with suggestions. One of her co-workers said, "Erica is a really nice gal. I think she's going to make a strong employee. I like her."`,
    choices:[]
    },
    {image:"../assets/images/johnerica.png",
    text:"Based on the previous info, which employee is more likely to last longer?",
    choices:[
        {choiceText:"John",points:5},
        {choiceText:"Erica",points:0}
        ]
    }
];
let sceneIndex=0;
let totalScore = 0;
let soundMuted = false;
let textIndex=0;
let gameScreen = document.querySelector(".screen");
let gameDialogue = document.querySelector("#gameDialogue");
const choices = document.querySelectorAll(".choice");
let txt = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Molestiae recusandae reiciendis at perferendis adipisci expedita fuga quis ducimus debitis, deleniti magnam velit itaque. Molestias aliquidd";

//setting up functions
const nextScene = ()=>{
    sceneIndex++;
    gameDialogue.innerHTML = "";
    textIndex=0;
}
const chooseOption =()=>{
    sceneIndex++
    gameScreen.style.backgroundImage= `url('${scenes[sceneIndex].image}')`;
    gameDialogue.innerHTML="";
    textIndex=0;
    txt = scenes[sceneIndex].text;
    textAppear();
    if(textIndex<txt.length-1){
        setTimeout(()=>{
            if(scenes[sceneIndex].choices.length===0){
                fade(gameScreen);
                return
            }
            for(let i=0;i<choices.length;i++){
            choices[i].innerHTML = scenes[sceneIndex].choices[i].choiceText;
            fade(choices[i]);
        }
        }, 4000);
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
        setTimeout(chooseOption,1000);
    });
    // el.addEventListener("click",()=>playSound(el));
});
// gameScreen.addEventListener("click",chooseOption)
textAppear();