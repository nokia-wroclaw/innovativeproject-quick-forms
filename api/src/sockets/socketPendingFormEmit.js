module.exports = {
    start: (app, io) => {
        app.post('/api/sockets/socketHttpGlue', (req, res) =>{
            const filledFormNumberID = Object.keys(req.body)[0];
            console.log("I'm getting to reject: " + filledFormNumberID);
            const socketio = req.app.get('socketio');

            socketio.emit('pendingFormID', {message: 'hello'});
            res.status(200);
        })
    }
}