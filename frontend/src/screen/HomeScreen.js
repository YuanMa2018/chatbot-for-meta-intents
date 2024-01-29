import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/ProductCarousel'
import { resetAllFilterState } from '../actions/filterActions'
import PriceRangeSlider from '../components/filters/PriceRangeSlider'
import BrandCheckBox from '../components/filters/BrandCheckBox'
import ColorCheckBox from '../components/filters/ColorCheckBox'
import OperatingSystemCheckBox from '../components/filters/OperatingSystemCheckBox'
import ModelYearCheckBox from '../components/filters/ModelYearCheckBox'
import RAMCheckBox from '../components/filters/RAMCheckBox'
import ROMCheckBox from '../components/filters/ROMCheckBox'
import CellularTechnologyCheckBox from '../components/filters/CellularTechnologyCheckBox'
import ScreenSizeCheckBox from '../components/filters/ScreenSizeCheckBox'
import ScreenSizeRangeSlider from '../components/filters/ScreenSizeRangeSlider'
import WirelessCarrierCheckBox from '../components/filters/WirelessCarrierCheckBox'
import RatingRangeSlider from '../components/filters/RatingRangeSlider'
import GeneralRangeSlider from '../components/filters/GeneralRangeSlider'
import GeneralCheckBox from '../components/filters/GeneralCheckBox'
import NumRatingRangeSlider from '../components/filters/NumRatingRangeSlider'
import Accordion from 'react-bootstrap/Accordion'
import EnhancedTable from '../components/sorting/SortingPanel'
import ConversationStrategy from '../components/ConversationStrategy'
import { useParams, useLocation, useSearchParams } from 'react-router-dom'
import { setUserIndexAction, setUserRG01Action } from '../actions/userIndexActions'
import { setInMainPageAction, setInComparisonPageAction } from '../actions/inMainPageActions'
import { Button as MuiButton } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateMetaIntentsInfluenceStateAction } from '../actions/metaIntentsInfluenceStateActions'
import { submit_interaction_track } from '../actions/inteactionTrackActions';
import { updateMetaIntentsProfileAction } from '../actions/metaIntentsProfileActions.js'
import { update_conversation_style } from '../actions/conversationStyleAction';





const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
        black: {
            main: '#263238',
            contrastText: '#fff',
        },

    },
})

function HomeScreen() {

    const location = useLocation()
    const [searchParams] = useSearchParams();
    // ?user_index=%caseNumber%&RG01=
    // user_RG01:  1 => user initiative
    // user_RG01:  2 => system initiative
    const user_index = searchParams.get('user_index') || '-1'
    const user_RG01 = searchParams.get('RG01') || '-1'


    // Get meta-intent profile from links
    const MI_profile_Interest_In_Detail__from_url = searchParams.get('MI_profile_Interest_In_Detail') || '-1'
    const MI_profile_Scope_Of_Choice__from_url = searchParams.get('MI_profile_Scope_Of_Choice') || '-1'
    const MI_profile_Dialog_Initiation__from_url = searchParams.get('MI_profile_Dialog_Initiation') || '-1'
    const MI_profile_Comparison_Orientation__from_url = searchParams.get('MI_profile_Comparison_Orientation') || '-1'
    const MI_profile_Explanation_Orientation__from_url = searchParams.get('MI_profile_Explanation_Orientation') || '-1'


    // New features from stiftungwarentest 08.12.2022
    const dispatch = useDispatch()
    const { loading, error, products } = useSelector(state => state.productList)
    // console.log("---products---",products)

    const { scope_of_choice__show_more__state,
        comparison_oriented__comparison_state,
        comparison_oriented__comparison_times_in_UI,
        comparison_oriented__comparison_times_in_chatbot,
        comparison_oriented__comparison_list,

        // critique times
        critiquing_oriented__critiquing_state,
        critiquing_oriented__critiquing_times } = useSelector(state => state.metaIntentsInfluenceState)

    const {
        MI_profile_Interest_In_Detail,
        MI_profile_Scope_Of_Choice,
        MI_profile_Dialog_Initiation,
        MI_profile_Comparison_Orientation,
        MI_profile_Explanation_Orientation, } = useSelector(state => state.metaIntentsProfileState)

    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentPriceRange, currentBrands, currentKeyword, currentDualSim,
        currentMemoryCardSlot,
        currentColors,
        currentOperatingSystems,
        currentRatingRange,
        currentNumRatingRange,
        currentModelYears,
        currentRAMs,
        currentROMs,
        currentCellularTechnologies,
        currentScreenSizes,
        currentScreenSizeRange,
        currentWirelessCarriers,
        currentCameraScoreRange,
        currentBatteryScoreRange,
        currentStabilityScoreRange,
        currentMusicPlayerScoreRange,
        currentSurfingRating,
        currentBackupPCRating,
        currentComputingPowerRating,
        currentInstructionForUseRating,
        currentNetworkSensitivityRating,
        currentDisplayScoreRange,
        currentHeadphoneJack3mm5,
        currentBiometricUnlockRating } = allFilterState


    const resetFilter = () => {
        dispatch(resetAllFilterState())
    }

    useEffect(() => {
        // console.log("---user_index---", user_index)  update_conversation_style
        dispatch(setUserIndexAction(parseInt(user_index)))
        dispatch(setUserRG01Action(parseInt(user_RG01)))
        dispatch(setInMainPageAction(true))
        dispatch(setInComparisonPageAction(false))
    }, [])



    useEffect(() => {
        // first time to update MI profile
        if (MI_profile_Interest_In_Detail == -1
            && MI_profile_Scope_Of_Choice == -1
            && MI_profile_Dialog_Initiation == -1
            && MI_profile_Comparison_Orientation == -1
            && MI_profile_Explanation_Orientation == -1
        ) {
            dispatch(updateMetaIntentsProfileAction({
                MI_profile_Interest_In_Detail: MI_profile_Interest_In_Detail__from_url,
                MI_profile_Scope_Of_Choice: MI_profile_Scope_Of_Choice__from_url,
                MI_profile_Dialog_Initiation: MI_profile_Dialog_Initiation__from_url,
                MI_profile_Comparison_Orientation: MI_profile_Comparison_Orientation__from_url,
                MI_profile_Explanation_Orientation: MI_profile_Explanation_Orientation__from_url,
            }))
            if (MI_profile_Scope_Of_Choice__from_url == 1) {
                dispatch(updateMetaIntentsInfluenceStateAction({
                    scope_of_choice__show_more__state: 2,
                }))
            }

            if (MI_profile_Dialog_Initiation__from_url == 0) {
                dispatch(updateMetaIntentsInfluenceStateAction({
                    initiative_preference__user_initiative__state: 0,
                }))
                // conversation style 1 : remind user to ask next question
                // conversation style 2 : generate a new question to ask user
                dispatch(update_conversation_style(2))
            }
        }
    }, [])




    return (
        <Container>
            <Meta></Meta>

            {
                Boolean(currentKeyword) | currentPriceRange.length !== 0 |
                    currentBrands.length !== 0 |
                    currentDualSim.length !== 0 |
                    currentMemoryCardSlot.length !== 0 |
                    currentColors.length !== 0 |
                    currentOperatingSystems.length !== 0 |
                    currentRatingRange.length !== 0 |
                    currentNumRatingRange.length !== 0 |
                    currentModelYears.length !== 0 |
                    currentRAMs.length !== 0 |
                    currentROMs.length !== 0 |
                    currentCellularTechnologies.length !== 0 |
                    currentScreenSizes.length !== 0 |
                    currentScreenSizeRange.length !== 0 |
                    currentWirelessCarriers.length !== 0 |
                    currentCameraScoreRange.length !== 0 |
                    currentBatteryScoreRange.length !== 0 |
                    currentStabilityScoreRange.length !== 0 |
                    currentMusicPlayerScoreRange.length !== 0 |
                    currentSurfingRating.length !== 0 |
                    currentBackupPCRating.length !== 0 |
                    currentComputingPowerRating.length !== 0 |
                    currentInstructionForUseRating.length !== 0 |
                    currentNetworkSensitivityRating.length !== 0 |
                    currentDisplayScoreRange.length !== 0 |
                    currentHeadphoneJack3mm5.length !== 0 |
                    currentBiometricUnlockRating.length !== 0

                    // show reset or not
                    ? (true ? null : <Link to={"/?user_index=" + user_index + "&RG01=" + user_RG01}><Button className='my-3' onClick={resetFilter}>Reset Filters</Button></Link>)
                    :
                    // Show Carousel or not
                    (true ? null : <ProductCarousel></ProductCarousel>)
            }

            <h1 className='my-3'>Recommended Product</h1>


            {/* Critique function */}
            {/* {(comparison_oriented__comparison_state === 0 && critiquing_oriented__critiquing_state === 0)
                &&
                <Button variant="outline-primary" size="sm" onClick={() => {
                    dispatch(updateMetaIntentsInfluenceStateAction({ critiquing_oriented__critiquing_state: 1 }))
                }}>Similar product with different features</Button>}
            {' '}

            {(comparison_oriented__comparison_state === 0 && critiquing_oriented__critiquing_state === 1)
                &&
                <Button variant="outline-primary" size="sm" onClick={() => {
                    dispatch(updateMetaIntentsInfluenceStateAction({ critiquing_oriented__critiquing_state: 0 }))
                }}>Cancel</Button>}
            {' '}

            {(comparison_oriented__comparison_state === 0 && critiquing_oriented__critiquing_state === 1)
                &&
                <div className='my-3'>
                    <p>click product to critique</p>
                </div>}
            {' '} */}

            {/* // show conversation style transfer or not  */}
            {false &&
                <ConversationStrategy></ConversationStrategy>
            }

            {/* // sorting */}
            {/* <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Sorting</Accordion.Header>
                    <Accordion.Body>
                        <EnhancedTable></EnhancedTable>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> */}


            {/* // Show fileter or not */}
            {false &&
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Filters</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col md={4}>
                                    <PriceRangeSlider></PriceRangeSlider>
                                </Col>
                                <Col md={4}>
                                    <RatingRangeSlider></RatingRangeSlider>
                                </Col>
                                <Col md={4}>
                                    <NumRatingRangeSlider></NumRatingRangeSlider>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <GeneralRangeSlider
                                        title="Camera Score"
                                        additional_title="(smaller is better)"
                                        filter_name_current_state="currentCameraScoreRange"
                                        filter_name_all_range="totalCameraScoreRange"
                                    ></GeneralRangeSlider>
                                </Col>
                                <Col md={4}>
                                    <GeneralRangeSlider
                                        title="Battery Score"
                                        additional_title="(smaller is better)"
                                        filter_name_current_state="currentBatteryScoreRange"
                                        filter_name_all_range="totalBatteryScoreRange"
                                    ></GeneralRangeSlider>
                                </Col>
                                <Col md={4}>
                                    <GeneralRangeSlider
                                        title="Stability Score"
                                        additional_title="(smaller is better)"
                                        filter_name_current_state="currentStabilityScoreRange"
                                        filter_name_all_range="totalStabilityScoreRange"
                                    ></GeneralRangeSlider>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <ScreenSizeRangeSlider></ScreenSizeRangeSlider>
                                </Col>
                            </Row>

                            {/* Stiftungwaren test change their metric from 2018 to 2022, 
                        so some metrics are missing in old data: 
                            1. music player score, 
                            2. display score. */}

                            {/* <Row>
                            <Col md={4}>
                                <GeneralRangeSlider 
                                title="Music Player Score" 
                                filter_name_current_state="currentMusicPlayerScoreRange"
                                filter_name_all_range="totalMusicPlayerScoreRange"
                                ></GeneralRangeSlider>
                            </Col>
                            <Col md={4}>
                                <GeneralRangeSlider 
                                title="Display Score" 
                                filter_name_current_state="currentDisplayScoreRange"
                                filter_name_all_range="totalDisplayScoreRange"
                                ></GeneralRangeSlider>
                            </Col>
                        </Row> */}



                            <Row>
                                <BrandCheckBox isInline={true}></BrandCheckBox>
                            </Row>

                            <Row>
                                <ColorCheckBox isInline={true}></ColorCheckBox>
                            </Row>

                            <Row>
                                <OperatingSystemCheckBox isInline={true}></OperatingSystemCheckBox>
                            </Row>

                            <Row>
                                <ModelYearCheckBox isInline={true}></ModelYearCheckBox>
                            </Row>

                            <Row>
                                <RAMCheckBox isInline={true}></RAMCheckBox>
                            </Row>

                            <Row>
                                <ROMCheckBox isInline={true}></ROMCheckBox>
                            </Row>

                            {/* <Row>
                            <CellularTechnologyCheckBox isInline={true}></CellularTechnologyCheckBox>
                        </Row> */}

                            {/* <Row>
                            <ScreenSizeCheckBox isInline={true}></ScreenSizeCheckBox>
                        </Row> */}

                            {/* <Row>
                            <WirelessCarrierCheckBox isInline={true}></WirelessCarrierCheckBox>
                        </Row> */}



                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Computing Power Rating"
                                    filter_name_current_state="currentComputingPowerRating"
                                    filter_name_all_values="allComputingPowerRating"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Instruction For Use Rating"
                                    filter_name_current_state="currentInstructionForUseRating"
                                    filter_name_all_values="allInstructionForUseRating"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Backup PC Rating"
                                    filter_name_current_state="currentBackupPCRating"
                                    filter_name_all_values="allBackupPCRating"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Biometric Unlock Rating"
                                    filter_name_current_state="currentBiometricUnlockRating"
                                    filter_name_all_values="allBiometricUnlockRating"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Headphone Jack 3.5mm"
                                    filter_name_current_state="currentHeadphoneJack3mm5"
                                    filter_name_all_values="allHeadphoneJack3mm5"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Memory Card Slot"
                                    filter_name_current_state="currentMemoryCardSlot"
                                    filter_name_all_values="allMemoryCardSlot"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Dual Sim"
                                    filter_name_current_state="currentDualSim"
                                    filter_name_all_values="allDualSim"
                                ></GeneralCheckBox>
                            </Row>


                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Network Sensitivity Rating"
                                    filter_name_current_state="currentNetworkSensitivityRating"
                                    filter_name_all_values="allNetworkSensitivityRating"
                                ></GeneralCheckBox>
                            </Row>

                            <Row>
                                <GeneralCheckBox
                                    isInline={true}
                                    hide_title={false}
                                    title="Surfing Rating"
                                    filter_name_current_state="currentSurfingRating"
                                    filter_name_all_values="allSurfingRating"
                                ></GeneralCheckBox>
                            </Row>

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            }


            {loading ? (<Loader>Loading</Loader>)
                : error ? (<Message variant="danger">{error}</Message>)
                    : (
                        <Container>
                            <Row>

                                <Col xs={9}>
                                    <Row xs={1} md={4} >
                                        {
                                            products.slice(0, (scope_of_choice__show_more__state + 1) * 4).map((product) =>
                                            (
                                                <Col key={product._id} >
                                                    <Product product={product} />
                                                </Col>
                                            ))}
                                    </Row>

                                    <div className="d-flex flex-column justify-content-center">
                                        <ThemeProvider theme={theme}>
                                            <MuiButton color="neutral" className="mt-2 mb-4" size="middle" onClick={() => {
                                                // dispatch, 
                                                // chatbot_form, 
                                                // components_name, 
                                                // components_info, 
                                                // intents='None', 
                                                // intents_info='None'
                                                submit_interaction_track(
                                                    dispatch,
                                                    false,
                                                    'show more products',
                                                    'previous scope_of_choice__show_more__state=' + scope_of_choice__show_more__state,
                                                    'None',
                                                    'Relevant MI: scope of choice',
                                                );
                                                dispatch(updateMetaIntentsInfluenceStateAction({ scope_of_choice__show_more__state: scope_of_choice__show_more__state + 1 }));
                                            }}>
                                                {scope_of_choice__show_more__state < 3 && "Show more products"}
                                                {scope_of_choice__show_more__state === 3 && "Show all products"}
                                            </MuiButton>
                                        </ThemeProvider>
                                    </div>
                                </Col>


                            </Row>
                            {scope_of_choice__show_more__state <= 3 || <Paginate></Paginate>}

                        </Container>
                    )
            }

        </Container>
    )
}

export default HomeScreen

