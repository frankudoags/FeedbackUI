import {motion, AnimatePresence} from 'framer-motion'
import Feedbackitem from "./Feedbackitem"
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

// FeedbackList component which takes in feedback array and a handleDelete function
function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext)
  // A check to ensure there is data in the feedback array
    if(!isLoading &&(!feedback|| feedback.length === 0)) return <p>No FeedBack yet</p>
     //check if api call is still loading
    if(isLoading)  return <p>Loading...</p>


  // If there is data in the feedback array, map over it and display each item in the array
  //  how it works:
  // Takes in an item, destructs, and displayed inside a card to the UI
  return (
    <div className='feedback-list'>
      <AnimatePresence>
      { feedback.map((item) => (
          <motion.div 
          key = {item.id}
          initial = {{opactiy : 0}}
          animate = {{opacity: 1}}
          exit = {{opacity: 0}}
          >
            <Feedbackitem key={item.id} item={ item } />
          </motion.div>     
        ))}

      </AnimatePresence> 
    </div>
  )
}


export default FeedbackList