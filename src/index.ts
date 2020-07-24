import * as fs from "fs";
import { createWorker, createScheduler } from 'tesseract.js';

function test() {
  const pdfsPath = "./files";
  const scheduler = createScheduler();
  const worker = createWorker();
  const worker2 = createWorker();
  const worker3 = createWorker();
  const worker4 = createWorker();

  (async () => {

    //fs.readdir(pdfsPath, async (err, files) => {

    // files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    // files = files.filter(item => !(/.pdf/g).test(item));

    // if (err) {
    //   throw new Error('Error trying to read directory');
    // }

    //for (const fileName of files) {

    try {
      await worker.load();
      await worker2.load();
      await worker3.load();
      await worker4.load();
      await worker.loadLanguage('por');
      await worker2.loadLanguage('por');
      await worker3.loadLanguage('por');
      await worker4.loadLanguage('por');
      await worker.initialize('por');
      await worker2.initialize('por');
      await worker3.initialize('por');
      await worker4.initialize('por');

      scheduler.addWorker(worker);
      scheduler.addWorker(worker2);
      scheduler.addWorker(worker3);
      scheduler.addWorker(worker4);

      const results = await Promise.all(Array(10).fill(0).map(() => (
        scheduler.addJob('recognize', `${pdfsPath}/2225-0.png`)
      )))
      console.log(results);
      //const result = await worker.recognize(`${pdfsPath}/2225-0.png`);

    } catch (error) {
      console.log(error);
    }

    await scheduler.terminate();

    /*if (text.includes('NF-e')) {
      console.log('Produto');
    } else if (text.includes('NFS-e')) {
      console.log('Serviço');
    } else console.log('Nenhuma das duas')*/
    //}
    //});
  })();
}

test();