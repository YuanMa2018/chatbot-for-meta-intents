import React from 'react'

function RatingStar({rating, numRatings, color, isUseful}) {
    return (
        <div className='rating'>

            <span >
                <i
                style={{color}} 
                className={
                    rating >= 1
                        ? "fas fa-star"
                        : rating >= 0.5
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                }></i>
            </span>

            <span >
                <i
                style={{color}} 
                className={
                    rating >= 2
                        ? "fas fa-star"
                        : rating >= 1.5
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                }></i>
            </span>

            <span >
                <i
                style={{color}} 
                className={
                    rating >= 3
                        ? "fas fa-star"
                        : rating >= 2.5
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                }></i>
            </span>

            <span >
                <i
                style={{color}} 
                className={
                    rating >= 4
                        ? "fas fa-star"
                        : rating >= 3.5
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                }></i>
            </span>

            <span >
                <i
                style={{color}} 
                className={
                    rating >= 5
                        ? "fas fa-star"
                        : rating >= 4.5
                            ? "fas fa-star-half-alt"
                            : "far fa-star"
                }></i>
            </span>

            <span style={{fontSize:"10px"}}>
                {!isUseful? (numRatings ? (rating +" stars ("+numRatings+") "):rating) : (isUseful && "   "+numRatings+(" people found this helpful"))}
                {/* {numRatings && (rating +" stars ("+numRatings+") ")}
                {isUseful && (" people found this helpful")} */}
            </span>
        </div>
    )
}

RatingStar.defaultProps = {
    color:"#f8e825",
    isUseful:false
}

export default RatingStar;

