/*
 * author: Colton Tshudy
 * version: 4/29/2023
 */
import { useParams, Link } from 'react-router-dom';

function Project( {title, description} ) {
    const { projectId } = useParams();
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
            <Link to="/projects">Back to Projects</Link>
        </>
    )
}

export default Project