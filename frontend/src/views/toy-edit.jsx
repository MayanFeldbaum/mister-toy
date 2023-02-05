import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { saveToy } from '../store/actions/toy.action'

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
            console.log('Success: ', toy)
        } catch (err) {
            console.error('Error:', err.message)
        } finally {
            console.log('Always run')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            const toy = await saveToy(toyToEdit)
            console.log('toy saved', toy);
            showSuccessMsg('toy saved!')
            navigate('/toy')
        } catch (err) {
            console.error('Error:', err.message)
        } finally {
            console.log('Always run')
        }
    }

    return <section className="toy-edit">
        <h2>{toyId ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <button className="btn">{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link className="btn btn-a" to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}