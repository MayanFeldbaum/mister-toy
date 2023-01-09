import { Link, NavLink } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (

        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>{toy.price}</span></p>
            <NavLink to={`/toy/${toy._id}`}>Details</NavLink> |
        {/* <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink> */}
        </article>
    )
}