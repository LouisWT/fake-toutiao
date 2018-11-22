import pm2 from 'pm2';
import { postClient } from 'app/websocket';

const neighborIds = [];

const myId = process.env.NODE_APP_INSTANCE;

function broadcastMessageToNeighbor(type, message) {
  pm2.connect(() => {
    pm2.list((err, processes) => {
      if (err) {
        console.log(err);
      }
      processes.forEach((process) => {
        const ortherId = process.pm_id;
        if (Number(myId) !== Number(ortherId)) {
          neighborIds.push(ortherId);
        }
      });
      neighborIds.forEach((neighborId) => {
        // topic 字段不能少，暂且设为与 type 一样
        pm2.sendDataToProcessId(neighborId, {
          type,
          data: message,
          topic: type,
        }, (error) => {
          console.log(error);
        });
      });
    });
  });
}

process.on('message', (packet) => {
  const { type, data } = packet;
  if (type === 'token') {
    const { uuid, message } = data;
    postClient(uuid, message);
  }
});

export {
  broadcastMessageToNeighbor,
};
