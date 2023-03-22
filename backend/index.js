// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-KOZITmgUnvv2eWPPvnaIK5uQ",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3010

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message);

    const response = await openai.createCompletion({
        // model: "text-davinci-003",
        // prompt: `${message}`,
        // max_tokens: 100,
        // temperature: 0.5,

        model: "text-davinci-003",
        prompt: `${message}`,
        temperature: 0.6, // Higher values means the model will take more risks.
        max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        top_p: 0.1, // alternative to sampling with temperature, called nucleus sampling
        frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        presence_penalty: 0,

        // model: "text-davinci-003",
        // prompt: `Human: ${message}\nAI:`,
        // temperature: 0.9,
        // max_tokens: 1000,
        // top_p: 1,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.6,
        // stop: [" Human:", " AI:"],

        // model: "text-davinci-003",
        // prompt: `You: ${message}\n\nJack:`,
        // temperature: 1,
        // max_tokens: 1000,
        // top_p: 1.0,
        // frequency_penalty: 1,
        // presence_penalty: 1,
        // stop: ["You:"],

        // model: "text-davinci-003",
        // prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou:${message}\nMarv:`,
        // temperature: 0.5,
        // max_tokens: 60,
        // top_p: 0.3,
        // frequency_penalty: 0.5,
        // presence_penalty: 0.0,
    });

    console.log(response.data.choices[0].text)
    res.json({
        // data: response.data
        message: response.data.choices[0].text,
    })
});

app.listen(port, () => {
    console.log(`example app listening at port: ${port}`)
})