import { Link} from "react-router-dom"

export function ToyPreview({ toy }) {
    return (
        <article>
            <img src={require(`../assets/img/${toy.img}.jpg`)} alt="toy"/>
            <Link to={`/toy/${toy._id}`}><h4>{toy.name}</h4></Link>
            <span>Price: $ <span>{toy.price}</span></span>
        </article>
    )
}