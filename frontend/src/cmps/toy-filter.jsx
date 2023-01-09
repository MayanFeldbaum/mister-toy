
import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [labelsArray, setLabelsArray] = useState([])



    const debounceFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        // update father cmp that filters change very type
        debounceFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log(value);
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onToggleInStock() {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, inStock: !prevFilter.inStock }))
    }

    return <section className="toy-filter full main-layout">
        <h2>Toy Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
            />

            <label htmlFor="price">Max price:</label>
            <input type="number"
                id="price"
                name="price"
                placeholder="By max price"
                value={filterByToEdit.price}
                onChange={handleChange}
            />

            <label htmlFor="inStock" >In stock</label>
            <input name="inStock" type="checkbox" onChange={() => { onToggleInStock() }} />

            <button hidden>Filter</button>
        </form>
    </section >
}