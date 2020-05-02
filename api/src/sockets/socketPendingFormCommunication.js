
module.exports = {
    start: (io) => {
        io.on('connection', (socket) =>{
            socket.on('pendingFormID', (data) => {
                console.log(data);
            });
        });
    }
}