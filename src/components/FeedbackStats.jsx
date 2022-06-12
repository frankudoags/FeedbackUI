import React from 'react'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
    const { feedback } = useContext(FeedbackContext)
    // Takes in the feedback data as a prop
    // calculate the average ratings using the reduce method
    let average = feedback.reduce((acc, cur) => {
        return acc + cur.rating;
    }, 0)/ feedback.length ;

    //Resetting average rating to have a single decimal place and
    //removing any floating zeros if it's a whole number
    average = average.toFixed(1).replace(/[.,]0$/,'');

  return (
    <div className="feedback-stats">
        <h4>{feedback.length} {feedback.length > 1 ? 'Reviews' : 'Review'}</h4>
        <h4>Average rating: {isNaN(average) ? '0' : average}</h4>
    </div>
  )
}


export default FeedbackStats