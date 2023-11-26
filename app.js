const toggleSidebar = document.getElementById('toggle-sidebar')
const sidebarFooter = document.getElementById('sidebar-footer')
const sidebarHeader = document.getElementById('sidebar-header')
const sidebarChatRooms = document.getElementById('sidebar-chat-rooms')
const buttonSettings = document.getElementById('button-settings')
const buttonAddChatRoom = document.getElementById('button-add-chat-room')
const modalSettings = document.getElementById('modal-settings')
const modalAddChatRoom = document.getElementById('modal-add-chat-room')
const dialogs = document.getElementsByName('dialog')
const dialogSelects = document.getElementsByName('dialog-select')
const submitAddChatRoom = document.getElementById('submit-add-chat-room')
const closeAlertButtons = document.getElementsByName('close-alert')

setElementHeight(sidebarHeader, sidebarFooter, sidebarChatRooms)
let resizeTimer
window.addEventListener('resize', function(event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        setElementHeight(sidebarHeader, sidebarFooter, sidebarChatRooms)
    }, 200);
  });

toggleSidebar.addEventListener('click', toggleSideBar)
buttonSettings.addEventListener('click', function() { modalSettings.showModal() })
buttonAddChatRoom.addEventListener('click', function() { modalAddChatRoom.showModal() })
submitAddChatRoom.addEventListener('click', async function(event){ 
    event.preventDefault()
    let form = document.querySelector('form')
    if (!form.checkValidity()) return form.reportValidity()
    
    let chatRoomName = document.getElementById('chat-room-name')
    let chatRoomIcon = document.getElementById('chat-room-icon')

    let chatRooms = await db.chat_rooms.toArray()
    chatRooms = chatRooms.map(e => e.name)
    if (chatRooms.includes(chatRoomName.value)) return alert("A chat room with that name already exists. Please input a unique name.")

    await db.chat_rooms.put( { name : chatRoomName.value, icon: chatRoomIcon.value } )
        .then(function(){
            makeToastNew("Chat room added!", "success")
        })
        .catch(function(error){
            console.error(error.message)
            makeToastNew("Failed to create chat room!", "error")
        })
    
    chatRoomName.value = ''
    chatRoomIcon.value = 'text'
    modalAddChatRoom.close()
})

dialogs.forEach(dialog => {
    dialog.addEventListener('click', function(event){
        let rect = dialog.getBoundingClientRect();
        let isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
            && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            dialog.close();
        } 
    })
});
dialogSelects.forEach(select => {
    select.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
closeAlertButtons.forEach(button => {  
    button.addEventListener('click', function(){
        button.parentNode.classList.toggle('hidden')
    })
});


function setElementHeight(aboveElement, belowElement, elementToSet){
    let aboveElementHeight = (aboveElement) ? aboveElement.offsetHeight : 0
    let belowElementHeight = (belowElement) ? belowElement.offsetHeight : 0
    let viewportHeight = document.documentElement.clientHeight
    let height = viewportHeight - aboveElementHeight - belowElementHeight
    elementToSet.style.height = `${height}px`
}

function toggleSideBar(){

}