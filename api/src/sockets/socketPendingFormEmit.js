module.exports = {
  start: (app, io, socketDictionary) => {
    const commands = {
      REJECT: 'reject',
      ACCEPT: 'accept'
    }

    app.post('/api/sockets/formEmit', (req, res) => {
      const formID = Object.values(req.body)[0];
      const status = Object.values(req.body)[1];
      const feedbackMessage = Object.values(req.body)[2];
      const socketio = req.app.get('io');

      if (status === commands.ACCEPT) {
        socketio.to(socketDictionary[formID]).emit('pendingFormID', { message: commands.ACCEPT});
        delete socketDictionary[formID];
      } else {
        socketio.to(socketDictionary[formID]).emit('pendingFormID', { message: commands.REJECT,
          feedbackMessage: feedbackMessage });
      }
      res.status(200);
    })
  }
};
