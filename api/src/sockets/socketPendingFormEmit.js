module.exports = {
  start: (app, io) => {
    app.post('/api/sockets/formEmit', (req, res) => {
      const data = Object.keys(req.body)[0];
      console.log(`I'm getting to reject: ${data}`);
      const socketio = req.app.get('io');
      if (data === 'accepted') {
        socketio.emit('pendingFormID', { message: 'accepted' });
      } else {
        socketio.emit('pendingFormID', { message: 'rejected' });
      }
      res.status(200);
    });
  }
};
