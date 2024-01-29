import InteractionTrack from "../models/interactionTrackModel.js";


import path from "path";
import { Parser } from 'json2csv';

// @desc Track Interactions
// @route POST /api/interactions/submit
// @access Public

export const submit_interactions = async (req, res) => {
    const { interactions } = req.body;
    var data = JSON.parse(interactions)
    try {
        await InteractionTrack.insertMany(data);
        res.status(200).json({ message: 'Successfuly submit interactions!' })
    } catch (error) {
        console.log("error in adding interaction data to mongodb", error)
    }
}





// @desc Track Interactions
// @route GET /api/interactions/download
// @access Public

export const download_interactions = async (req, res) => {

    const interaction_data = await InteractionTrack.find()
    // console.log(interaction_data)
    const fields = [
        {
          label: '_id',
          value: '_id'
        },
        {
          label: 'user_random_id',
          value: 'user_random_id'
        },
        {
          label: 'user_index',
          value: 'user_index'
        },
        {
          label: 'user_random_generator',
          value: 'user_random_generator'
        },
        {
          label: 'components_name',
          value: 'components_name'
        },
        {
          label: 'components_context',
          value: 'components_context'
        },
        {
          label: 'components_info',
          value: 'components_info'
        },
        {
          label: 'intents',
          value: 'intents'
        },
        {
          label: 'intents_info',
          value: 'intents_info'
        },
        {
          label: 'local_timestamps',
          value: 'local_timestamps'
        },
        {
          label: 'createdAt',
          value: 'createdAt'
        }
      ];    

      return downloadResource(res, 'interactions.csv', fields, interaction_data);

}


export const downloadResource = (res, fileName, fields, data) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
  }




  