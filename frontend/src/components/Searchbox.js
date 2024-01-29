import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { updateAllFilterState } from '../actions/filterActions'

function Searchbox() {

    const dispatch = useDispatch()

    const { allFilterState } = useSelector(state => state.allFilterState)
    const { currentKeyword } = allFilterState

    const [searchText,setSearchText] = useState('')
    const searchSubmitController = (e)=>{
        e.preventDefault()
        dispatch(updateAllFilterState({ currentKeyword: searchText.trim() }))
    }

    return (
        <Container>
            <Form  onSubmit={searchSubmitController} className='d-flex'>
                <Form.Control
                type='text'
                placeholder={Boolean(currentKeyword) ? currentKeyword : 'search product...' }
                value={searchText}
                className='m-2'
                onChange={(e) => setSearchText(e.target.value)}></Form.Control>
                <Button variant='outline-success' className='m-2' type='submit'>
                Search
                </Button>
            </Form>

        </Container>
    )
}

export default Searchbox
