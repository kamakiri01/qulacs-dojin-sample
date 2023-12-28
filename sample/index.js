const { initQulacsSimulatorModule } = require("../lib");


initQulacsSimulatorModule({useWorker: false})
    .then((client => {
        console.log("client", !!client);
        client.myFunc(1);
    }))
