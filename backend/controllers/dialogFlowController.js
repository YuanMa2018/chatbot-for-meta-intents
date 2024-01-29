import dotenv from "dotenv";

import Dialogflow from '@google-cloud/dialogflow';
import { v4 as uuid } from 'uuid';
import Path from "path";
const __dirname = Path.resolve();


// @desc chat with dialogflow
// @route POST /api/dialogflow/textInput
// @access Public
export const sendTextToDialogFlow = async (req, res) => {

    const { message } = req.body;

    // Create a new session
    const sessionClient = new Dialogflow.SessionsClient({
        // keyFilename: Path.join(__dirname, "./backend/key.json"),
        keyFilename: Path.join(__dirname, "./backend/general-urtterance-label.json"),
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
        // process.env.PROJECT_ID,
        // "test1-uaah",
        "general-urtterance-label-obk9",

        uuid()
    );

    // The dialogflow request object
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: message,
                languageCode: 'en-US',
            },
        },
    };

    // Sends data from the agent as a response
    try {
        const responses = await sessionClient.detectIntent(request);
        res.status(200).send({ data: responses });
    } catch (e) {
        console.log(e);
        res.status(422).send({ e });
    }

}



// @desc chat with dialogflow
// @route POST /api/dialogflow/voiceInput
// @access Public
export const sendVoiceToDialogFlow = async (req, res) => {
    res.status(200).send({ data: "VOICE ENDPOINT CONNECTION SUCCESSFUL" })
}
