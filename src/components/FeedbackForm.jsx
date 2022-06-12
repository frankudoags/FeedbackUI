import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import {useState, useContext, useEffect} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
    // Component level states.
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setbtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    //Bring in addfeedback function, feedbackEdit variable, and UpdateFeedback function from feedback context
    //using useContext() hook
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    //Using useEffect hook to monitor feedbackEdit changes and update UI accordingly
    //If feedbackEdit edit state is true, then we are editing a feedback, so we need to set the text and rating to the feedbackEdit values
    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setbtnDisabled(false);
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

// Handles Text Change on change, checks that the text is not empty and that it is more than 10 characters,
// else the button state is set to disabled, And the error message is displayed if text is less than 10 chars.
// If all necessary conditions are met, setText is used to set the text state to whatever is the target value.
    const handleTextChange = (e) => {
        if(text ==='') {
            setbtnDisabled(true);
            setMessage(null);
            return
        }
        else if(text !=='' && text.trim().length <=10) {
            setbtnDisabled(true);
            setMessage('Review must be at least 10 characters, please.')
            return
        }
        else {
            setbtnDisabled(false);
            setMessage(null);
        }
        setText(e.target.value);
    };

    // Handles form submission when button state is enabled, checks again that length of text is longer than 10 char,
    // creates a new object with the text and rating and passes it to the handleAdd prop that was passed in.
    //If edit state is true, it edits and updates the feedback item.
    //If edit state is false, it adds a new feedback item.
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
                feedbackEdit.edit = false;
            } else {
            addFeedback(newFeedback);
            }
            setText('');
            setbtnDisabled(true);
        }
    }
  return (
    <Card>
        <form onSubmit={ handleSubmit }>
            <h2>How would you rate your service with us?</h2>
            {/* Rating is set onClick by the select prop being passed into the RatingSelect component */}
           <RatingSelect select ={(rating) => setRating(rating)}/>
           
           {/* Input text field and submit button */}
            <div className="input-group">             
                <input 
                type="text"
                 onChange={handleTextChange} 
                 placeholder='Leave a review' 
                 value={text}/>

            {/* Submit Button */}
            <Button type="submit" isDisabled = {btnDisabled}>SEND</Button>
            </div>
            {message && <div className="message transition">{message}</div>}
        </form>
        </Card>
  )
}

export default FeedbackForm