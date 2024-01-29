import {sendTextToDialogFlow, sendVoiceToDialogFlow} from '../controllers/dialogFlowController.js'

import express from 'express';
const router = express.Router();

router.route('/textInput').post(sendTextToDialogFlow)
router.route('/voiceInput').post(sendVoiceToDialogFlow)

export default router
