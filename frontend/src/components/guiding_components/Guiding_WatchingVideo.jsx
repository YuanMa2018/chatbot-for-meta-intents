import React from "react";
import Options from "./Options/Options";

const Guiding_WatchingVideo = (props) => {
    const options = [
        {
          name: "Yes",
          handler: props.actionProvider.handle_Next_Question,
          id: 1,
        },
        {
          name: "No",
          handler: props.actionProvider.handle_Next_Question,
          id: 2,
        },
      ];
    
      return <Options options={options} />;
};

export default Guiding_WatchingVideo;


