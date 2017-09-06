const Slack = require('slack-node');
const request = require('request');
const fs = require('fs');

const API_TOKEN = '';
const EXPORT_FILE = 'exported.yaml'
const yaml_header = 'title: valkyriemoji\nemojis:\n'

const slack = new Slack(API_TOKEN);
if (slack.token == '') {
	console.log("error: first, you need to get API TOKEN from emoji source slack.");
	process.exit();
}

slack.api('emoji.list', { proxy: '' }, (err, res) => {
	if (err) console.log(err);

	// yaml initialize
	fs.writeFile(EXPORT_FILE, yaml_header, (err) => {
		if(err) console.log(err);
	});
	
	// append emoji to target file
	for (key in res.emoji){
		url = res.emoji[key];

		// TODO: add aliases compatibility
		if (url.match(/alias/)) {
			continue;
		}
		
		// TODO: fix this kuso code
		emoji_info = `\
    - name: ${key}\n\
      src: ${url}\n`;


		fs.appendFile(EXPORT_FILE, emoji_info, (err) => {
			if (err) console.log(err);
		});
	}
	console.log('done.');
});

