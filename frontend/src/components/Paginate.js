import React, { useState, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateAllFilterState } from '../actions/filterActions'
import { listProducts } from '../actions/productActions'

function Paginate() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)

    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentPageNumber, currentAllPageNumber } = allFilterState
    // console.log("currentPageNumber")
    // console.log(currentPageNumber)
    // console.log("currentAllPageNumber",currentAllPageNumber)

    const onClickHandler = (index) => {
        console.log("---index---",index)
        console.log("---currentPageNumber---",currentPageNumber)
        setPage(index)
        dispatch(updateAllFilterState({ currentPageNumber: index }))
    }

///////////////////IMPORTANT///////////////
    useEffect(() => {
        
        if (currentPageNumber) {
            setPage(currentPageNumber)
        }
    }, [currentPageNumber]);


    return (
        currentAllPageNumber > 1 &&
        (
            <Pagination>
                {page <= 10 || <Pagination.Ellipsis />}
                {
                    [...Array(currentAllPageNumber).keys()].map((x, index) => {
                        if ((index + 1) >= page - 5 & (index + 1) <= page + 5) {
                            return (
                                <Pagination.Item key={index}
                                    active={x + 1 === page}
                                    onClick={(e) => onClickHandler(x + 1)}
                                >
                                    {x + 1}
                                </Pagination.Item>
                            )
                        }
                    }
                    )
                }
                {page >= 38 || <Pagination.Ellipsis />}
            </Pagination>
        )
    )
}


export default Paginate





