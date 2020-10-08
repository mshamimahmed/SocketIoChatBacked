const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Im9ySFdqczM1eSIsImlhdCI6MTYwMjA5OTA3ODQyMSwiZXhwIjoxNjAyMTg1NDc4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ0b2RvQXBwIiwiZGF0YSI6eyJ1c2VySWQiOiJXazMyeF9nRnoiLCJmaXJzdE5hbWUiOiJzaGFtaW0xIiwibWlkZGxlTmFtZSI6IiIsImxhc3ROYW1lIjoiQWhtZWQiLCJtb2JpbGVOdW1iZXIiOjgwNzQ5OTk5MjMsImdlbmRlciI6Im1hbGUiLCJhcGlLZXkiOiIxMjM0NTYiLCJlbWFpbCI6InNoYW1pbTJAZ21haWwuY29tIn19.J8R10LyUkBFKz12UL_KEvmbVY0aoRWVzfuYfT29gJig"
const secretKey = "mySecretKeyThatNoOneKnowsInHisWildDream"
const userId = 'Wk32x_gFz'
const socket = io('http://localhost:8081')

let clientJs = () => {

    let chatMessage = {
        senderId: userId,
        senderName: 'shamim1',
        receiverName: 'shamim1',
        receiverId: 'bIdkKm7md',
        createdOn: Date.now()
    }

    let userInfo = {
        senderId: userId,
        senderName: 'shamim1',
        receiverName: 'shamim1 ', 
        receiverId: 'bIdkKm7md',
    }

    socket.on('verifyUser', (data) => {

        console.log('Server wants to verify the user')

        //sending authtoken to setUser event
        socket.emit('setUser', (authToken))
    })

    socket.on(userId, (data) => {
        //console.log(data)
        console.log("You have received a message from  " + data.senderName)
        console.log(data.message)
    })

    socket.on(userInfo.senderName, (userInfo) => {
        //console.log(userInfo)
        console.log(userInfo.senderName + '  is typing...')
    })

    socket.on('auth-error', (data) => {
        console.log(data)
    })

    socket.on('all-onlineUsersList', (list) => {
        console.log('users list updated')
        console.log(list)
    })

    socket.on('come', (fullname) => {
        console.log(fullname + '  came online')
    })

    socket.on('leave', (fullname) => {
        console.log(fullname + '  go offline')
    })

    socket.on('message', (data) => {
        console.log(data.senderName + '  says: ' + data.groupMessage)
    })

    $("#send1").on('click', function () {

        let messageText = $("#messageToSend").val()
        chatMessage.message = messageText;
        socket.emit("chat-msg", chatMessage)

    })

    socket.on('notify', (data) => {
        console.log(data + "  is clicked a button on his side")
    })

    $("#send2").on('click', function () {

        let groupMessageText = $("#groupChat").val()
        chatMessage.groupMessage = groupMessageText;
        socket.emit("group-chat", chatMessage)

    })

    $("#messageToSend").keypress(function () {

        socket.emit("typing", userInfo)

    })

    $("#send0").click(function () {

        socket.emit("click", chatMessage.senderName)

    })
}

//calling clientJs function
clientJs();