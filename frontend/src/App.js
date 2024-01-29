import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { Link } from 'react-router-dom'
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";
import LoginScreen from "./screen/LoginScreen";
import Register from "./screen/Register";
import ProfileScreen from "./screen/ProfileScreen";
import DownloadScreen from "./screen/DownloadScreen";
import ComparisonScreen from "./screen/ComparisonScreen";
import { listProducts } from './actions/productActions'
import Chatbot from 'react-chatbot-kit';
import { useDispatch, useSelector } from 'react-redux'

import 'react-chatbot-kit/build/main.css';
import config from './bot/config.js';
import MessageParser from './bot/MessageParser.js';
import ActionProvider from './bot/ActionProvider.js';
import { useState, useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "./images/bot.svg";
import "./App.css";
import { getAllFilterTotalValue, updateAllFilterState } from './actions/filterActions';
import CritiquingScreen from "./screen/CritiquingScreen";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import { Button as MuiButton } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateMetaIntentsInfluenceStateAction } from '../src/actions/metaIntentsInfluenceStateActions'
import { submit_interaction_track } from '../src/actions/inteactionTrackActions';

import { Container, Row, Col, Button } from 'react-bootstrap'
import ProductInComparisonPanel from "./components/ProductInComparisonPanel";

import toast from "./utils/toast";

function App() {

  const dispatch = useDispatch()
  //getAllFilterTotalValue (value range)
  useEffect(() => {
    dispatch(getAllFilterTotalValue())
    dispatch(listProducts());
  }, []);

  const [shotBot, toggleBot] = useState(false);
  const [showChatbot, toggleChatbot] = useState(true);

  const { scope_of_choice__show_more__state,
    comparison_oriented__comparison_state,
    comparison_oriented__comparison_times_in_UI,
    comparison_oriented__comparison_times_in_chatbot,
    comparison_oriented__comparison_list,
    // critique times
    critiquing_oriented__critiquing_state,
    critiquing_oriented__critiquing_times } = useSelector(state => state.metaIntentsInfluenceState)

  const { is_in_main_page, is_in_comparison_page } = useSelector((state) => state.inMainPageState)


  const saveMessages = (messages, HTMLString) => {
    console.log("----save----message----")
    console.log(messages)
    localStorage.setItem('chat_messages', JSON.stringify(messages))
  };

  const loadMessages = () => {
    // console.log("----load----message----")
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages
  };


  useEffect(() => {
    if (comparison_oriented__comparison_list.length === 1 || comparison_oriented__comparison_list.length >= 4) {
      toast.comparison("please choose 2~4 products to start comparing");
    }
  }, [comparison_oriented__comparison_list])




  return (
    <Router>
      <Header />
      <main className="py-3">
        <div className="app-chatbot-container">
          {/* <ConditionallyRender
            ifTrue={showChatbot}
            show={
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              // saveMessages={saveMessages}
              // messageHistory={loadMessages()}
              />
            }
          /> */}

          {/* // always show the chatbot */}
          {/* {showChatbot && ( */}
          {true && (

            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              // messageHistory={loadMessages()}
              messageParser={MessageParser}
            // saveMessages={saveMessages}
            />
          )}
        </div>

        <button
          className="app-chatbot-button"
          onClick={() => toggleChatbot((prev) => !prev)}
        >
          <ButtonIcon className="app-chatbot-button-icon" />
        </button>

        {!is_in_comparison_page && 
          (<button className="app-comparison-panel mb-5" >           
            <Row style={{ gap: "0px" }}>
              {comparison_oriented__comparison_list.map((one_product, id) => {
                // return (<div>123</div>)
                return (<ProductInComparisonPanel key={id} product={one_product}></ProductInComparisonPanel>)
              })
              }
            </Row>
            {(comparison_oriented__comparison_list.length > 1)
              &&
              <Link to={"/comparison"}>
                <Button variant="outline-primary" size="sm" disabled={comparison_oriented__comparison_list.length < 2} onClick={
                  () => {
                    submit_interaction_track(
                      dispatch,
                      false,
                      'comparing products',
                      'previous comparison_oriented__comparison_times_in_UI=' + comparison_oriented__comparison_times_in_UI,
                      'None',
                      'Relevant MI:  comparison oriented',
                    );
                    dispatch(updateMetaIntentsInfluenceStateAction({
                      comparison_oriented__comparison_times_in_UI: comparison_oriented__comparison_times_in_UI + 1,
                      comparison_oriented__comparison_state: 1
                    }))
                  }
                }>
                  Start to compare
                </Button>
              </Link>}
            {' '}


            {/* {(comparison_oriented__comparison_list.length >= 1)
                &&
                <div className='my-3'>
                    <p>please choose 2~4 products to start comparing</p>
                </div>} */}
          </button>)
        }

        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/products/:id" element={<ProductScreen />}></Route>
            <Route path="/comparison" element={<ComparisonScreen />}></Route>
            <Route path="/critiquing/:id" element={<CritiquingScreen />}></Route>
            {/* <Route path="/products/bySearch" element={<ProductScreen />}></Route> */}
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
            <Route path="/downloadInteraction" element={<DownloadScreen></DownloadScreen>}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;

