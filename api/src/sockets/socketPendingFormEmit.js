module.exports = {
  start: (app, io, socketDictionary) => {
    const commands = {
      REJECT: 'reject',
      ACCEPT: 'accept'
    }

    app.post('/api/sockets/formEmit', (req, res) => {
      const data = Object.values(req.body)[0];
      const status = Object.values(req.body)[1];
      const socketio = req.app.get('io');
      if (status === commands.ACCEPT) {
        socketio.to(socketDictionary[data]).emit('pendingFormID', { message: status });
        delete socketDictionary[data];
      } else {
        socketio.to(socketDictionary[data]).emit('pendingFormID', { message: status });
      }
      res.status(200);
    })
  }
};
