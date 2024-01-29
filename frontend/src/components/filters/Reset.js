import React from 'react';
import { resetAllFilterState } from '../../actions/filterActions'
import { resetGuidingCenterState } from '../../actions/guidingCenterStateActions';
import { resetFirstFeatureState } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import { useEffect } from 'react';


function Reset() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetAllFilterState())
        dispatch(resetGuidingCenterState())
        dispatch(resetFirstFeatureState())
    }, []);

    return <div></div>
}

export default Reset;


