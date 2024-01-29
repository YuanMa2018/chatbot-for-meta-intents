import store from '../store';
import { add_new_one_state } from '../actions/guidingCenterStateActions'



class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.guiding_state = []
  }


  greet = () => {
    const greetingMessage = this.createChatBotMessage(
      "Hi, friend. ",
    );
    this.updateChatbotState(greetingMessage);
  };

  handleBrand = () => {
    const message = this.createChatBotMessage(
      "Please pick the brand which you like",
      {
        widget: 'BrandCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleCellularTechnology = () => {
    const message = this.createChatBotMessage(
      "Please pick the Cellular Technology which you like",
      {
        widget: 'CellularTechnologyCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleColor = () => {
    const message = this.createChatBotMessage(
      "Please pick the color which you like",
      {
        widget: 'ColorCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleModelYear = () => {
    const message = this.createChatBotMessage(
      "Please pick the model year",
      {
        widget: 'ModelYearCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleNumRatingRange = () => {
    const message = this.createChatBotMessage(
      "Please pick the Number of Rating Range which you like",
      {
        widget: 'NumRatingRangeSlider',
      }
    )
    this.updateChatbotState(message);
  }

  handleOperatingSystem = () => {
    const message = this.createChatBotMessage(
      "Please pick the Operating System which you like",
      {
        widget: 'OperatingSystemCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handlePrice = () => {
    const message = this.createChatBotMessage(
      "Please select the price range you like",
      {
        widget: 'PriceRangeSlider',
      }
    )
    this.updateChatbotState(message);
  }

  handleRAM = () => {
    const message = this.createChatBotMessage(
      "Please pick the RAM which you like",
      {
        widget: 'RAMCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleROM = () => {
    const message = this.createChatBotMessage(
      "Please pick the ROM which you like",
      {
        widget: 'ROMCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleRatingRange = () => {
    const message = this.createChatBotMessage(
      "Please select rating range which you like",
      {
        widget: 'RatingRangeSlider',
      }
    )
    this.updateChatbotState(message);
  }

  handleScreenSize = () => {
    const message = this.createChatBotMessage(
      "Please pick the screen size which you like",
      {
        // widget: 'ScreenSizeCheckBox',
        widget: 'ScreenSizeRangeSlider',
      }
    )
    this.updateChatbotState(message);
  }

  handleWirelessCarrier = () => {
    const message = this.createChatBotMessage(
      "Please pick the Wireless Carrier which you like",
      {
        widget: 'WirelessCarrierCheckBox',
      }
    )
    this.updateChatbotState(message);
  }

  handleReset = () => {
    const message = this.createChatBotMessage(
      "Reset is done",
      {
        widget: 'Reset',
      }
    )
    this.updateChatbotState(message);
  }

  handleClear = () => {
    this.setState({ messages: [] })
  }




  // Dialogflow 
  handleResponse = async (message) => {
    this.updateChatbotState(this.createChatBotMessage(message));
  }






  handleDog = () => {
    const message = this.createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: 'dogPicture',
      }
    );

    this.updateChatbotState(message);
  };

  handleBike = () => {
    const message = this.createChatBotMessage(
      "Here's a nice Bike for you!",
      {
        widget: 'bikePicture',
      }
    );

    this.updateChatbotState(message);
  };





  // Outdated - for testing
  // First question
  howMuchDoYouWantToSpendOnIt = () => {
    const message = this.createChatBotMessage(
      "How much do you want to spend on it?",
      {
        withAvatar: true,
        widget: "slider_price",
      }
    );

    this.updateChatbotState(message);
  }

  // First question
  whoAreYouShoppingFor = () => {
    const message = this.createChatBotMessage(
      "Hi, who are you shopping for?",
      {
        withAvatar: true,
        widget: "shoppingForOptions",
      }
    );

    this.updateChatbotState(message);
  };

  // Second question
  whatAreYouGoingToDoWithIt = () => {
    const message = this.createChatBotMessage(
      "OK, what are you going to do with it?",
      {
        withAvatar: true,
        widget: "doingWithOptions",
      }
    );

    this.updateChatbotState(message);
  }

  // Third question
  whichAccessoriesDoYouWant = () => {
    const message = this.createChatBotMessage(
      "OK, which accessories do you want?",
      {
        withAvatar: true,
        widget: "checkbox_btn_accessories",
      }
    );

    this.updateChatbotState(message);
  }



  // Recommendation
  recommendation = () => {
    // this.inlineCritiquing();
    const message = this.createChatBotMessage(
      // "OK, We have some bikes for you, suitbale for city, \
      //   which are not so expensive, easy to ride,\
      //   here is a bike you might like",
      " ",
      {
        withAvatar: true,
        widget: "recommendation",
      }
    );

    this.updateChatbotState(message);
  }

  inlineCritiquing = () => {
    const message = this.createChatBotMessage(
      " ",
      {
        withAvatar: true,
        widget: "inlineCritiquing",
      },
    );

    this.updateChatbotState(message);
  }




  handleCritiquing = (msg) => {

    const message = this.createChatBotMessage(
      "This is our recommendation for you, you can adjust it to get a more suitble product",
      {
        withAvatar: true,
        widget: "CritiquingPanel",
      },
    );

    this.updateChatbotState(message);
  }


  // new product features widget from stiftungwaren test

  handleCameraScoreRange = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "CameraScoreRange"
      },
    );
    this.updateChatbotState(message);
  }
  handleBatteryScoreRange = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "BatteryScoreRange"
      },
    );
    this.updateChatbotState(message);
  }
  handleStabilityScoreRange = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "StabilityScoreRange"
      },
    );
    this.updateChatbotState(message);
  }
  handleSurfingRating = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "SurfingRating"
      },
    );
    this.updateChatbotState(message);
  }
  handleBackupPCRating = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "BackupPCRating"
      },
    );
    this.updateChatbotState(message);
  }
  handleComputingPowerRating = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "ComputingPowerRating"
      },
    );
    this.updateChatbotState(message);
  }
  handleInstructionForUseRating = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "InstructionForUseRating"
      },
    );
    this.updateChatbotState(message);
  }
  handleNetworkSensitivityRating = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "NetworkSensitivityRating"
      },
    );
    this.updateChatbotState(message);
  }
  handleHeadphoneJack3mm5 = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "HeadphoneJack3mm5"
      },
    );
    this.updateChatbotState(message);
  }
  handleBiometricUnlockRating = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "BiometricUnlockRating"
      },
    );
    this.updateChatbotState(message);
  }
  handleMemoryCardSlot = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "MemoryCardSlot"
      },
    );
    this.updateChatbotState(message);
  }
  handleDualSim = () => {
    const message = this.createChatBotMessage(
      "Do you have specific demand for current feature?",
      {
        withAvatar: true,
        widget: "DualSim"
      },
    );
    this.updateChatbotState(message);
  }





  //Guiding Center

  //synchronize redux state
  sync_redux_state = () => {
    const { guidingCenterState } = store.getState()
    console.log(guidingCenterState);
    store.dispatch(add_new_one_state({ "test1": 1 }))
    const { guidingCenterState: test2 } = store.getState()
    console.log(test2);
  }

  handle_initial_Question =()=>{
    const { conversation_style } = store.getState().conversationStyleState
    
    if (conversation_style === 1) {
      const message = this.createChatBotMessage(
        "Please tell me you requirement for the smartphone",
        {
          withAvatar: true,
        },
      );
  
      this.updateChatbotState(message);
    }
    else if (conversation_style === 2) {
      this.handle_Next_Question()
    }
  }

  handle_Next_Question = (msg) => {
    const { guidingCenterState, firstRankFeatureState, conversationStyleState } = store.getState()
    const { first_rank_feature } = firstRankFeatureState
    const { conversation_style } = conversationStyleState
    // console.log("---first_rank_feature---",first_rank_feature)
    if (conversation_style === 1) {
      this.handle_remind_user_ask_next_question()
    }
    else if (conversation_style === 2) {
      switch (first_rank_feature) {

        case "price":
          this.handlePrice();
          break;

        case "brand":
          this.handleBrand();
          break;

        case "color_category":
          this.handleColor();
          break;

        case "operating_system":
          this.handleOperatingSystem();
          break;

        case "rating":
          this.handleRatingRange();
          break;

        case "numRatings":
          this.handleNumRatingRange();
          break;

        case "model_year":
          this.handleModelYear();
          break;

        case "RAM":
          this.handleRAM();
          break;

        case "ROM":
          this.handleROM();
          break;

        // case "cellular_technology":
        //   this.handleCellularTechnology();
        //   break;

        // "screenSizes",
        case "screen_size":
          this.handleScreenSize();
          break;

        case "wireless_carrier":
          this.handleWirelessCarrier();
          break;



        // New features from stiftungwarentest 08.12.2022
        case "camera_score":
          this.handleCameraScoreRange();
          break;

        case "battery_score":
          this.handleBatteryScoreRange();
          break;

        case "Stability_score":
          this.handleStabilityScoreRange();
          break;

        // case "music_player_score":
        //   this.handle_unknown_intents("music quality");
        //   break;

        case "surfing_rating":
          this.handleSurfingRating();
          break;

        case "backup_PC_rating":
          this.handleBackupPCRating();
          break;

        case "computing_power_rating":
          this.handleComputingPowerRating();
          break;

        case "instruction_for_use_rating":
          this.handleInstructionForUseRating();
          break;

        case "network_sensitivity_rating":
          this.handleNetworkSensitivityRating();
          break;

        // case "display_score":
        //   this.handle_unknown_intents("display quality");
        //   break;

        case "Headphone_jack_3mm_5":
          this.handleHeadphoneJack3mm5();
          break;

        case "biometric_unlock_rating":
          this.handleBiometricUnlockRating();
          break;

        case "memory_card_slot":
          this.handleMemoryCardSlot();
          break;

        case "dual_sim":
          this.handleDualSim();
          break;

        default:
          this.handle_unknown_intents();
          break;
      }
    }

    // Predefined question list
    // const { guidingCenterState: initial_state } = guidingCenterState
    // switch (initial_state.length) {
    //   case 0:
    //     this.handle_Guiding_Price();
    //     store.dispatch(add_new_one_state({ "test1": 1 }))
    //     break;
    //   case 1:
    //     this.handle_Guiding_Brand();
    //     store.dispatch(add_new_one_state({ "test1": 1 }))
    //     break;
    //   case 2:
    //     this.handle_Guiding_Gaming();
    //     store.dispatch(add_new_one_state({ "test1": 1 }))
    //     break;
    //   case 3:
    //     this.handle_Guiding_WatchingVideo();
    //     store.dispatch(add_new_one_state({ "test1": 1 }))
    //     break;

    //   default:
    //     this.handleCritiquing()
    //     break;

    // }
  }


  //Guiding process
  handle_Guiding_Brand = (msg) => {

    const message = this.createChatBotMessage(
      "Please select your favorate smartphone brand: ",
      {
        withAvatar: true,
        widget: "Guiding_Brand",
      },
    );

    this.updateChatbotState(message);
  }

  handle_Guiding_Gaming = (msg) => {

    const message = this.createChatBotMessage(
      "Do you often use samrtphone to play games? ",
      {
        withAvatar: true,
        widget: "Guiding_Gaming",
      },
    );

    this.updateChatbotState(message);
  }

  handle_Guiding_Price = (msg) => {

    const message = this.createChatBotMessage(
      "what is your ideal price range for a smartphone",
      {
        withAvatar: true,
        widget: "Guiding_Price",
      },
    );

    this.updateChatbotState(message);
  }

  handle_Guiding_WatchingVideo = (msg) => {

    const message = this.createChatBotMessage(
      "Do you often use samrtphone to watch videos? ",
      {
        withAvatar: true,
        widget: "Guiding_WatchingVideo",
      },
    );

    this.updateChatbotState(message);
  }

  handle_comparison = (msg) => {

    const message = this.createChatBotMessage(
      "Please try to use comparison function ",
      {
        withAvatar: true,
        // widget: "Guiding_WatchingVideo",
      },
    );

    this.updateChatbotState(message);
  }




  // remind user to ask new question
  handle_remind_user_ask_next_question = (msg) => {

    const message = this.createChatBotMessage(
      "Do you have requirements for smartphone?",
      {
        withAvatar: true,
      },
    );

    this.updateChatbotState(message);
  }

  // remind user to ask new question
  handle_unknown_intents = (msg) => {

    const message = this.createChatBotMessage(
      "Sorry, We don't have such information in our database, please ask another question : )",
      {
        withAvatar: true,
      },
    );

    this.updateChatbotState(message);
  }

  please_input_info = (msg) =>{
    const message = this.createChatBotMessage(
      "Please tell me your preference",
      {
        withAvatar: true,
      },
    );

    this.updateChatbotState(message);
  }

  you_are_welcome=(msg)=>{
    const message = this.createChatBotMessage(
      "You are welcome!",
      {
        withAvatar: true,
      },
    );

    this.updateChatbotState(message);
  }

  pureMessageResponse=(msg)=>{
    const message = this.createChatBotMessage(
      msg,
      {
        withAvatar: true,
      },
    );

    this.updateChatbotState(message);
  }






  // remind user to compare
  handle_remind_user_to_compare = (msg) => {

    const message = this.createChatBotMessage(
      "Do you want to compare the current product with others that you previously checked?",
      {
        withAvatar: true,
        widget: "Guiding_Comparison",
      },
    );

    this.updateChatbotState(message);
  }


  updateChatbotState = (message) => {

    // NOTE: This function is set in the constructor, and is passed in      
    // from the top level Chatbot component. The setState function here     
    // actually manipulates the top level state of the Chatbot, so it's     
    // important that we make sure that we preserve the previous state.
    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider
