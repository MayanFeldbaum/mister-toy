import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../services/event-bus.service'
import { loadReviews, addReview, removeReview } from '../store/actions/review.actions'

export function Review({toyId}) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const filterBy = useSelector((storeState) => storeState.reviewModule.filterBy)
    filterBy.toyId=toyId
    const [reviewToEdit, setReviewToEdit] = useState({ txt: '',toyId})

    useEffect(() => {
        loadReviews(filterBy)
    }, [filterBy])

    const handleChange = ev => {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
    }

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('All fields are required')
        try {
            await addReview(reviewToEdit)
            showSuccessMsg('Review added')
            setReviewToEdit({ txt: '',toyId})
        } catch (err) {
            showErrorMsg('Cannot add review')
        }
    }

    const onRemove = async reviewId => {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    function canRemove(review) {
        return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
    }


    return (
        <div className="review-app">
            <h1>Reviews</h1>
            {reviews && <ul className="review-list">
                {reviews.map(review => (
                    <li key={review._id}>
                        {canRemove(review) &&
                            <button onClick={() => onRemove(review._id)}>X</button>}
                        <h3>{review.txt}</h3>
                        {/* <h3>By: {loggedInUser.fullname}</h3> */}
                        {/* <p>
                            By:
                            <Link to={`/user/${review.byUser._id}`}>
                                {review.byUser.fullname}
                            </Link>
                        </p> */}
                    </li>
                ))}
            </ul>}
            {loggedInUser &&
                <form onSubmit={onAddReview}>
                       <textarea
                        name="txt"
                        onChange={handleChange}
                        value={reviewToEdit.txt}
                    ></textarea>
                    <button>Add</button>
                </form>}
            <hr />
        </div>
    )
}