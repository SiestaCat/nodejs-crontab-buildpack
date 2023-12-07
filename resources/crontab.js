var cron = require('node-cron');
const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream(process.argv[2])
});

rl.on('line', (line) => {
    let split = line.split('*');
    let cmd_index = split.length - 1;
    let cmd = split[cmd_index];
    delete split[cmd_index];
    let expression = split.join('*');

    cron.schedule(expression, () => {
        exec(cmd, (err, stdout, stderr) => {
            process.stdout.write(stdout);
            if(err !== null) process.stdout.write(err.toString());
        })
    });

});


