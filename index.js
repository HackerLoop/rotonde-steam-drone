'use strict';

const newClient = require('rotonde-client/src/Client');

const client = newClient('ws://127.0.0.1:4224/');

var throttle = 0;

client.eventHandlers.attach('STEAM_CONTROLLER', (e) => {
  throttle = (throttle + e.data.TRIGGER_RIGHT_VALUE / 255 * 2000) / 3;
  const roll = e.data.PAD_B / 127 * 1000 + 1000;
  const pitch = -e.data.PAD_D / 127 * 1000 + 1000;
  if (throttle <= 10) {
    return;
  }
  client.sendAction('SET_GCSRECEIVER', {
    Channel: [
      throttle,
      roll * 0.5,
      pitch * 0.5,
      1000,
      0,
      0,
      0,
      0
    ]
  });
});

client.connect()
