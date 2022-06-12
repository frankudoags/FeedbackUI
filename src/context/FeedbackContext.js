import {createContext, useState, useEffect}  from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    // component state
    const [feedback, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // fetch feedback data when page reloads
    useEffect(() => {
        fetchFeedback()
        }, []);

        //Fetch feedback from demo backend api using fetch API
        const fetchFeedback = async () => {
            //set isLoading to true
            setIsLoading(true);
            const response = await fetch('/feedback?_sort=id&_order=desc');
            const data = await response.json();
            //set feedback to data gotten from api call
            setFeedback(data);
            //set isLoading to false
            setIsLoading(false);
        }

    // Delete event handler: takes in an ID, filters it out of the feedback array,and sets the new Feedback
    // array using setFeedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this feedback?')){
            //make api call to delete an item
            await fetch(`/feedback/${id}`,{method: 'DELETE'})
            //filter feedback and remove deleted item
            const filteredFeedback = feedback.filter(feedback => feedback.id !== id)
            //update feedback state using it's setter function
            setFeedback(filteredFeedback)
        }
    }

       // addFeedback Handler: Takes in a newFeedback object that contains a text and a rating,
    // generates an auto-incrementing id from the feedback data, pushes the newFeedback to the feedback array
    // using the spread operator, then sets the feedback state using setFeedback
    const addFeedback = async (newFeedback) => {
        //make api call to add new feedback
        const response = await fetch(
            '/feedback',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newFeedback)
            }
        )
        const data = await response.json();
        //push new feedback to feedback state and update state using setFeedback
        setFeedback([ data, ...feedback]);   
    }

    //Sets FeedbackEdit to the item that you clicked it's edit button
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true  
        })
    }

    //Update a feedback item 
    const updateFeedback = async (id, updItem) => { 
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json();
        setFeedback(feedback.map(item => item.id ===id ? {...item, ...data} : item))
        setFeedbackEdit({
                item: {},
                edit: false
            })

    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
       deleteFeedback,
       addFeedback,
       updateFeedback,
       editFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext