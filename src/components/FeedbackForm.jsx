import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import {useState, useContext, useEffect} from 'react'
import FeedbackContext from '../context/FeedbackContext'
// A form that takes in a function as a prop to handle a new feedback addition
function FeedbackForm() {
    // Component level states.
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setbtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

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

            <Button type="submit"
            isDisabled = {btnDisabled}
            >
                SEND
            </Button>
            </div>
            {message && <div className="message transition">{message}</div>}
        </form>
        </Card>
  )
}

export default FeedbackForm