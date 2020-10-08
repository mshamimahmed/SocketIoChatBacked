const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Iks4YTEtd3dNVCIsImlhdCI6MTYwMjA5ODk2NTIyMCwiZXhwIjoxNjAyMTg1MzY1LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ0b2RvQXBwIiwiZGF0YSI6eyJ1c2VySWQiOiJiSWRrS203bWQiLCJmaXJzdE5hbWUiOiJzaGFtaW0xIiwibWlkZGxlTmFtZSI6IiIsImxhc3ROYW1lIjoiQWhtZWQiLCJtb2JpbGVOdW1iZXIiOjgwNzQ5OTk5MjMsImdlbmRlciI6Im1hbGUiLCJhcGlLZXkiOiIxMjM0NTYiLCJlbWFpbCI6InNoYW1pbTFAZ21haWwuY29tIn19.4f9sDX_7YrmcvSBXvgUYp82FT-WH9uPXj8YGie2g1os"
const secretKey ="mySecretKeyThatNoOneKnowsInHisWildDream"
const userId = 'bIdkKm7md'
const socket = io('http://localhost:8081')

let clientJs = () => {

    let userInfo = {
        senderId: userId,
        senderName: 'shamim1',
        receiverName: 'shamim1',
        receiverId: 'Wk32x_gFz',
    }
 
    let chatMessage = {
        senderId: userId,
        senderName: 'shamim1 Ahmed',
        receiverName: 'shamim1 Ahmed',
        receiverId: 'Wk32x_gFz',
        createdOn: Date.now()
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

    socket.on('notify', (data) => {
        console.log(data + "  is clicked a button on his side")
    })

    $("#send1").on('click', function () {

        let messageText = $("#messageToSend").val()
        chatMessage.message = messageText;
        socket.emit("chat-msg", chatMessage)

    })

    $("#send2").on('click', function () {

        let groupMessageText = $("#groupChat").val()
        chatMessage.groupMessage = groupMessageText;
        socket.emit("group-chat", chatMessage)

    })

    $("#messageToSend").keypress(function () {

        socket.emit("typing", userInfo)

    })
}

//calling clientJs function
clientJs();