import React from "react";

import lili from "../images/lili.png";
// import lili from "../images/bot.svg";


const LiliAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none" }}
      >
        <img alt="Lili" src={lili} width="40dp"/>
      </div>
    </div>
  );
};



export default LiliAvatar;