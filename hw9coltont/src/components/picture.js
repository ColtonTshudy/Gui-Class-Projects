/*
 * author: Colton Tshudy
 * version: 4/29/2023
 */
import { useParams, Link } from 'react-router-dom';
import Pic from '../rsc/What_a_Fool_Believes_by_The_Doobie_Brothers_US_vinyl_7-inch.jpg'

function Picture() {
    const { projectId } = useParams();
    return (
        <>
            <h1>Good Evening!</h1>
            <p>take a load off, enjoy some doobie brothers</p>
            <img src={Pic} />
            <div>
                <Link to="/">Go home, it's getting late</Link>
            </div>
        </>
    )
}

export default Picture