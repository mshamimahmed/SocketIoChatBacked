const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6ImxOTXdWbHFvUCIsImlhdCI6MTYwMjA5NDg1MDg5MCwiZXhwIjoxNjAyMTgxMjUwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ0b2RvQXBwIiwiZGF0YSI6eyJ1c2VySWQiOiJPYk1pdmhRNVIiLCJmaXJzdE5hbWUiOiJzaGFtaW0xIiwibWlkZGxlTmFtZSI6IiIsImxhc3ROYW1lIjoiQWhtZWQiLCJtb2JpbGVOdW1iZXIiOjgwNzQ5OTk5MjMsImdlbmRlciI6Im1hbGUiLCJhcGlLZXkiOiIxMjM0NTYiLCJlbWFpbCI6InNoYW1pbTNAZ21haWwuY29tIn19.QESqWSyWp24gvvYc8Nl-pbNcFS8a2m-Nme-GGjSqWQA"
const secretKey = "mySecretKeyThatNoOneKnowsInHisWildDream"
const userId = 'ObMivhQ5R'
const socket = io('http://localhost:8081')

let clientJs = () => {

    let userInfo = {
        senderId: userId,
        senderName: 'Rahul Kumar',
        receiverName: 'Nausad',
        receiverId: '3ulavQsv',
    }

    let chatMessage = {
        senderId: userId,
        senderName: 'Rahul Kumar',
        receiverName: 'Nausad',
        receiverId: '3ulavQsv',
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

    $("#send3").on('click', function () {

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