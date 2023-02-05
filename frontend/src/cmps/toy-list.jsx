import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemoveToy }) {

    return <section className="toy-list">
        <img className="teaser" src={require(`../assets/img/play.jpg`)} alt="toy" />
        {toys.map(toy =>
            <div className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />
                <div className="preview-btns">
                    <button onClick={() => { onRemoveToy(toy._id) }} title="Remove">x</button>
                    <Link to={`/toy/edit/${toy._id}`} className="fas fa-edit" title="edit"></Link>
                    <Link to={`/toy/${toy._id}`} className="fas fa-info" title="Details"></Link>
                </div>
            </div>)}
    </section>
}
