import React from 'react'
import { Link } from 'react-router-dom'

export function ToySort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleDirectionChange() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="toy-sort">
        <Link to={`/toy/edit`}>Add Toy</Link>
        <button onClick={() => handleSortChange('name')}>By name</button>
        <button onClick={() => handleSortChange('price')}>By price</button>
        <button onClick={handleDirectionChange}>{sortBy.asc ? '^' : 'v'}</button>
    </section>
}