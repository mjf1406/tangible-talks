function makeToastNew(content, type){
    let toastElement = document.getElementById(`toast-${type}`)
    let toastContent = document.getElementById(`content-${type}`)

    toastElement.classList.toggle('hidden')
    toastContent.innerText = content
}