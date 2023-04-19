function toggle_menu(){
    content.classList.toggle("main-actived")
    content.classList.toggle("main-desactived")
}

function received_message(msg){
    let div = document.createElement("div")
    div.classList.add(...["block","received"])
    div.innerHTML = msg
    div.style.height="0px"
    div.style.padding="0px"
    chat_box.insertBefore(div,chat_box.firstElementChild)
    collapse(div)
    div.open()
}

function sent_message(msg){
    let div = document.createElement("div")
    div.classList.add(...["block","sent"])
    div.innerHTML = msg
    div.style.height="0px"
    div.style.padding="0px"
    chat_box.insertBefore(div,chat_box.firstElementChild)
    collapse(div)
    div.open()
}

function hr(){
    let div = document.createElement("hr")
    
    div.style.margin = "0px"
    div.style.height = "0px"

    setTimeout(()=>{
        div.style.margin = "10px"
        div.style.height = "1px"
    },100)

    chat_box.insertBefore(div,chat_box.firstElementChild)
    

    // collapse(div)
    // div.open()
}

function chat_scroll_final(){
    chat_box.scrollTo(0,chat_box.scrollHeight+100)
}

function restart_scroll(){ chat_box.scrollTo(0,0) }


function collapse(el){

    el.close = function(){
        el.style.height = 0+"px"
        el.style.padding = "0em"
    }

    el.open = function(){

        // el.style.padding = "0px";
        // el.style.height = "0px";
        el.style.overflow = "hidden";

        setTimeout(()=>{
            el.style.removeProperty("padding")
            el.style.height = (el.scrollHeight+20)+"px"
            // el.style.height = (el.scrollHeight+30)+"px"
        },50)
        
        setTimeout(()=>{
            el.removeAttribute('style')
            // el.style.removeProperty("overflow")
        },1000)
    }
}


// parte 2 - questões
let questions = []
fetch("files/inquerito.txt")
.then(e=>{ return e.text() })
.then(e=>{ 
    let r1 = /\n|\r\n/g
    let r2 = /\n\n|\r\n\r\n/g
    let r3 = /\n\n\n|\r\n\r\n\r\n/g
    let texts = e.split(r3)
    texts.map(e=>{
        // let t = e.replace(r1,"!@@!")
        let p1 = e.split("##")[0].trim().replace(r1,"<br>")
        let p2 = e.split("##")[1].trim().replace(r1,"<br>")
        // let p1 = t.match(/{{.+?}}/g)[0].replace(/!@@!/g,"\n").slice(2,-2)
        // let p2 = e.split("}}\r\n").at(-1)
        questions.push({
            a: p1,
            b: p2
        })
    })
    // received_message(questions[0].a)
    render_questions()
    choice_num_question(0)

})

// parte 3

let num = 0

chat_box.addEventListener('scroll',function(){
    if(chat_box.scrollTop == 1){
        chat_box.scrollTop = 0
    }
})

// received_message(questions[0].a)
inp_send.addEventListener('keyup',function(e){

    

    if(e.key == "Enter" && this.value == ""){
        next_question()
        return
    }
    else if(e.key == "Enter" && this.value != ""){
        message_send()
        return
    }

})

function message_send(){

    if(inp_send.value == ""){
        next_question()
        return
    }

    sent_message(inp_send.value)
    setTimeout(()=>{ next_question() },1000)
    inp_send.value = ""
}

function next_question(){
    received_message(questions[num].b)
    num++
    choice_num_question(num)
}

function choice_num_question(n){
    num = n
    
    if(n > 0) hr()

    received_message(questions[num].a)

    let menu_children = [...document.querySelectorAll(".menu > p")]

    menu_children.map(e=>{
        e.removeAttribute('style')
    })

    menu.children[n].style.transition = "0.5s"
    menu.children[n].style.backgroundColor = "var(--pink)"

}

function render_questions(){
    questions.map((e,i)=>{
        let title = e.a.slice(0,25)+"..."
        let p = document.createElement('p')
        p.onclick=()=>choice_num_question(i)
        p.innerHTML = title
        document.querySelector(".menu").appendChild(p)
    });
}

