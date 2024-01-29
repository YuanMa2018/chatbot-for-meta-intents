import mongoose from 'mongoose';



const interactionTrackSchema = mongoose.Schema({

  user_index: {
    type: String,
    required: true,
  },

  user_random_id: {
    type: String,
    required: true,
  },

  user_random_generator: {
    type: String,
    required: true,
  },

  components_name: {
    type: String,
    required: true,
  },

  components_context: {
    type: String,
    required: true,
  },

  components_info: {
    type: String,
    default: "None",
  },

  intents: {
    type: String,
    default: "None",
  },

  intents_info: {
    type: String,
    default: "None",
  },

  local_timestamps: {
    type: Number,
    required: true,
  },

}, { timestamps: true })

const InteractionTrack = mongoose.model('InteractionTrack', interactionTrackSchema,"interaction_track_dataset");

export default InteractionTrack;




