import {createContext, useState, useEffect}  from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })


    useEffect(() => {
        fetchFeedback()
        }, []);

        //Fetch feedback from demo backend api
        const fetchFeedback = async () => {
            setIsLoading(true);
            const response = await fetch('/feedback?_sort=id&_order=desc');
            const data = await response.json();
            setFeedback(data);
            setIsLoading(false);
        }

    // Delete event handler: takes in an ID, filters it out of the feedback array,and sets the new Feedback
    // array using setFeedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete this feedback?')){
            await fetch(`/feedback/${id}`,{method: 'DELETE'})
            const filteredFeedback = feedback.filter(feedback => feedback.id !== id)
            setFeedback(filteredFeedback)
        }
    }

       // addFeedback Handler: Takes in a newFeedback object that contains a text and a rating,
    // generates an auto-incrementing id from the feedback data, pushes the newFeedback to the feedback array
    // using the spread operator, then sets the feedback state using setFeedback
    const addFeedback = async (newFeedback) => {
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