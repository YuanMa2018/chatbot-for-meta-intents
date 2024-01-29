import { createChatBotMessage } from 'react-chatbot-kit';

import DogPicture from '../components/DogPicture';
import DoingWithOptions from '../components/options/GeneralOptions/DoingWithOptions'
import Radio_btn_accessories from '../components/options/GeneralOptions/Radio_btn_accessories'
import ShoppingForOptions from '../components/options/GeneralOptions/ShoppingForOptions'
import LiliAvatar from "../components/LiliAvatar";
import Checkbox_btn_accessories from '../components/options/GeneralOptions/Checkbox_btn_accessories';
import Slider_price from '../components/options/GeneralOptions/Slider_price';
import Recommendation from '../components/options/GeneralOptions/Recommendation';
import InlineCritiquing from '../components/options/GeneralOptions/InlineCritiquing';

import BrandCheckBox from '../components/filters/BrandCheckBox'
import CellularTechnologyCheckBox from '../components/filters/CellularTechnologyCheckBox'
import ColorCheckBox from '../components/filters/ColorCheckBox'
import ModelYearCheckBox from '../components/filters/ModelYearCheckBox'
import OperatingSystemCheckBox from '../components/filters/OperatingSystemCheckBox'
import RAMCheckBox from '../components/filters/RAMCheckBox'
import ROMCheckBox from '../components/filters/ROMCheckBox'
import ScreenSizeCheckBox from '../components/filters/ScreenSizeCheckBox'
import ScreenSizeRangeSlider from '../components/filters/ScreenSizeRangeSlider';
import WirelessCarrierCheckBox from '../components/filters/WirelessCarrierCheckBox'
import GeneralCheckBox from '../components/filters/GeneralCheckBox'
import GeneralRangeSlider from '../components/filters/GeneralRangeSlider'

import PriceRangeSlider from '../components/filters/PriceRangeSlider'
import RatingRangeSlider from '../components/filters/RatingRangeSlider'
import NumRatingRangeSlider from '../components/filters/NumRatingRangeSlider'
import Reset from '../components/filters/Reset'

import CritiquingPanel from '../components/critiquing/CritiquingPanel'


// Guiding compenents
import Guiding_Brand from '../components/guiding_components/Guiding_Brand';
import Guiding_Gaming from '../components/guiding_components/Guiding_Gaming';
import Guiding_Price from '../components/guiding_components/Guiding_Price';
import Guiding_WatchingVideo from '../components/guiding_components/Guiding_WatchingVideo';
import Guiding_ClickToStart from '../components/guiding_components/Guiding_ClickToStart';
import Guiding_Comparison from '../components/guiding_components/Guiding_Comparison';

const config = {
  initialMessages: [createChatBotMessage(
    `Hi, I’m your assistant to help you find idea smartphone, you can text me your demand, or if you need guidance, just type “help” at any time.`,
    {
      widget: 'Guiding_ClickToStart',
    }
  )],
  botName: "Jun",
  customStyles: {
    // botMessageBox: {
    //   backgroundColor: '#376B7E',
    // },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  customComponents: {
    botAvatar: (props) => <LiliAvatar {...props} />
  },
  widgets: [
    {
      widgetName: 'Guiding_ClickToStart',
      widgetFunc: (props) => <Guiding_ClickToStart {...props} />,
    },
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: "shoppingForOptions",
      widgetFunc: (props) => <ShoppingForOptions {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "doingWithOptions",
      widgetFunc: (props) => <DoingWithOptions {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "radio_btn_accessories",
      widgetFunc: (props) => <Radio_btn_accessories {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "checkbox_btn_accessories",
      widgetFunc: (props) => <Checkbox_btn_accessories {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "slider_price",
      widgetFunc: (props) => <Slider_price {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "recommendation",
      widgetFunc: (props) => <Recommendation {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "inlineCritiquing",
      widgetFunc: (props) => <InlineCritiquing {...props} />,
      // mapStateToProps: ["gist"],
    },






    {
      widgetName: "BrandCheckBox",
      widgetFunc: (props) => <BrandCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "CellularTechnologyCheckBox",
      widgetFunc: (props) => <CellularTechnologyCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "ColorCheckBox",
      widgetFunc: (props) => <ColorCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "ModelYearCheckBox",
      widgetFunc: (props) => <ModelYearCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "OperatingSystemCheckBox",
      widgetFunc: (props) => <OperatingSystemCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "RAMCheckBox",
      widgetFunc: (props) => <RAMCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "ROMCheckBox",
      widgetFunc: (props) => <ROMCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "ScreenSizeCheckBox",
      widgetFunc: (props) => <ScreenSizeCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "ScreenSizeRangeSlider",
      widgetFunc: (props) => <ScreenSizeRangeSlider {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "WirelessCarrierCheckBox",
      widgetFunc: (props) => <WirelessCarrierCheckBox {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "PriceRangeSlider",
      widgetFunc: (props) => <PriceRangeSlider {...props} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "RatingRangeSlider",
      widgetFunc: (props) => <RatingRangeSlider {...props} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "NumRatingRangeSlider",
      widgetFunc: (props) => <NumRatingRangeSlider {...props} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "Reset",
      widgetFunc: (props) => <Reset {...props} />,
      // mapStateToProps: ["gist"],
    },


    {
      widgetName: "CritiquingPanel",
      widgetFunc: (props) => <CritiquingPanel {...props} isInline={true} chatbot_form={true} />,
      // mapStateToProps: ["gist"],
    },



    {
      widgetName: "CameraScoreRange",
      widgetFunc: (props) => <GeneralRangeSlider
        {...props}
        title="Camera Score"
        additional_title="(smaller is better)"
        filter_name_current_state="currentCameraScoreRange"
        filter_name_all_range="totalCameraScoreRange"
        chatbot_form={true}
        hide_button={true}
      ></GeneralRangeSlider>,
    },

    {
      widgetName: "BatteryScoreRange",
      widgetFunc: (props) => <GeneralRangeSlider
        {...props}
        title="Battery Score"
        additional_title="(smaller is better)"
        filter_name_current_state="currentBatteryScoreRange"
        filter_name_all_range="totalBatteryScoreRange"
        chatbot_form={true}
        hide_button={true}
      ></GeneralRangeSlider>,
    },

    {
      widgetName: "StabilityScoreRange",
      widgetFunc: (props) => <GeneralRangeSlider
        {...props}
        title="Stability Score"
        additional_title="(smaller is better)"
        filter_name_current_state="currentStabilityScoreRange"
        filter_name_all_range="totalStabilityScoreRange"
        chatbot_form={true}
        hide_button={true}
      ></GeneralRangeSlider>,
    },



    {
      widgetName: "ComputingPowerRating",
      widgetFunc: (props) => <GeneralCheckBox {...props}
        title="Computing Power Rating"
        filter_name_current_state="currentComputingPowerRating"
        filter_name_all_values="allComputingPowerRating"
        chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "InstructionForUseRating",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Instruction For Use Rating"
        filter_name_current_state="currentInstructionForUseRating"
        filter_name_all_values="allInstructionForUseRating"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "BackupPCRating",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Backup PC Rating"
        filter_name_current_state="currentBackupPCRating"
        filter_name_all_values="allBackupPCRating"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "BiometricUnlockRating",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Biometric Unlock Rating"
        filter_name_current_state="currentBiometricUnlockRating"
        filter_name_all_values="allBiometricUnlockRating"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "HeadphoneJack3mm5",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Headphone Jack 3.5mm"
        filter_name_current_state="currentHeadphoneJack3mm5"
        filter_name_all_values="allHeadphoneJack3mm5"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "MemoryCardSlot",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Memory Card Slot"
        filter_name_current_state="currentMemoryCardSlot"
        filter_name_all_values="allMemoryCardSlot"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "DualSim",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Dual Sim"
        filter_name_current_state="currentDualSim"
        filter_name_all_values="allDualSim"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },



    {
      widgetName: "NetworkSensitivityRating",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Network Sensitivity Rating"
        filter_name_current_state="currentNetworkSensitivityRating"
        filter_name_all_values="allNetworkSensitivityRating"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },


    {
      widgetName: "SurfingRating",
      widgetFunc: (props) => <GeneralCheckBox
        {...props}
        // isInline={true}
        // hide_title={true}
        title="Surfing Rating"
        filter_name_current_state="currentSurfingRating"
        filter_name_all_values="allSurfingRating"
        isInline={true} chatbot_form={true}
      ></GeneralCheckBox>,

    },




    // Guiding components
    {
      widgetName: "Guiding_Brand",
      widgetFunc: (props) => <Guiding_Brand {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "Guiding_Gaming",
      widgetFunc: (props) => <Guiding_Gaming {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "Guiding_Price",
      widgetFunc: (props) => <Guiding_Price {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "Guiding_WatchingVideo",
      widgetFunc: (props) => <Guiding_WatchingVideo {...props} />,
      // mapStateToProps: ["gist"],
    },
    {
      widgetName: "Guiding_Comparison",
      widgetFunc: (props) => <Guiding_Comparison {...props} />,
      // mapStateToProps: ["gist"],
    },

    
  ]
};

export default config;



