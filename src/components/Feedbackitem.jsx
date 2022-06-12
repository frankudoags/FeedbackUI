import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from "./shared/Card"
import { useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

// Takes in an item, destructs, and displayed inside a card to the UI
// Takes in a handle delete function that it passes the item.id to onClick, i.e event drilling( i think)
function Feedbackitem({item }) {
 const {deleteFeedback, editFeedback} = useContext(FeedbackContext)
return (
    <Card>
        <div className="num-display">{ item.rating }</div>
        <button onClick={()=>deleteFeedback(item.id) } className="close">
            <FaTimes color='purple' />
        </button>
        <button onClick={() => editFeedback(item) }  className="edit">
            <FaEdit color='purple' />
        </button>
        <div className="text-display">{ item.text }</div>
    </Card>
)
}

export default Feedbackitem