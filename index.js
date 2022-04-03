const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const prompts = [];

app.listen(PORT, () => console.log(`listening on PORT:${PORT}!`));

app.get('/', (req, res) => {
	res.json('Welcome to my writing prompt API!');
});

app.get('/prompts', (req, res) => {
	axios
		.get('https://writing-prompt-s.tumblr.com/tagged/writing%20prompts')
		.then(response => {
			const html = response.data;
			const $ = cheerio.load(html);

			$('p', html).each(function () {
				const prompt = $(this).text();
				prompts.push({
					prompt,
				});
			});
		});
	res.json(prompts);
});
