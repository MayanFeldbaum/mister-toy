// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Review } from "../cmps/review.jsx"
import { loadReviews } from "../store/actions/review.actions.js"
import { ChatApp } from "../cmps/chat-app.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
        loadReviews()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.error('Error:', err.message)
        } finally {
            console.log('done')
        }
    }


    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy name : {toy.name}</h1>
        <img src={require(`../assets/img/${toy.img}.jpg`)} alt="toy" />
        <p>Price: ${toy.price}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <div className="action-btns">
            <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link className="btn" to={`/toy`}>Back</Link>
        </div>
        <Review toyId={toyId} />
        <ChatApp toyId={toyId}/>
    </section>
}