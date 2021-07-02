console.log("Extension Activated!");

const query = (selector)=>{
    return document.querySelector(selector);
}
const queryAll = (selector)=>{
    return document.querySelectorAll(selector);
}

window.addEventListener("mouseup",()=>{
    seletedText = window.getSelection().toString();
    if(seletedText.length>0){
        chrome.runtime.sendMessage({"text":seletedText});
    }
})