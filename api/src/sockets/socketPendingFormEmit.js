//todo
module.exports = {
    start: (io, status, id) => {
        if (status === 'rejected'){
            io.emit('connection', (socket) =>{
                socket.emit(`${id}`, )
            })
        }
        else {

        }
    }
}