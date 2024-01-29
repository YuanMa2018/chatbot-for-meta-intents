import mongoose from 'mongoose';



const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: false },
  comment: { type: String, required: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  date: { type: String, required: false },
  number_of_isHelpful:{ type: Number, required: false },
}, { timestamps: true })


const productSchema = mongoose.Schema({
  page_number: {
    type: Number,
    require: false,
    default: 0
  },

  page_url_link: {
    type: String,
    require: false,
    default: "None"
  },

  url_link: {
    type: String,
    require: false,
    default: "None"
  },

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  // first_price: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // },

  price: {
    type: Number,
    required: true,
    default: 0
  },


  rating: {
    type: Number,
    required: true,
    default: 0
  },


  numRatings: {
    type: Number,
    required: true,
    default: 0
  },

  model_name: {
    type: String,
    default: "name"
  },


  wireless_carrier: {
    type: String,
    default: "n"
  },

  brand: {
    type: String,
    default: "n"
  },


  memory_storage_capacity: {
    type: String,
    default: "None"
  },


  operating_system: {
    type: String,
    default: "n"
  },

  colour: {
    type: String,
    default: "n"
  },

  color_category: {
    type: String,
    default: "n"
  },

  model_year: {
    type: String,
    default: "None"
  },

  RAM: {
    type: Number,
    default: "None"
  },

  ROM: {
    type: Number,
    default: "None"
  },

  cellular_technology: {
    type: String,
    default: "None"
  },

  included_components: {
    type: String,
    default: "None"
  },

  screen_size: {
    type: Number,
    default: "None"
  },

  description: {
    type: [String],
    required: true,
    default: "n"
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  reviews: [reviewSchema],

  category: {
    type: String,
    required: true,
    default: "n"
  },


  countInStock: {
    type: Number,
    required: true,
    default: 10
  },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product;
