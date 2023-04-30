/*
 * author: Colton Tshudy
 * version: 4/29/2023
 */
import MediaCard from './card'
import { Outlet } from 'react-router-dom'

function Projects() {
    return (
        <div className='flex-row'>
            <MediaCard title='Project 1' index={1}/>
            <MediaCard title='Project 2' index={2}/>
            <MediaCard title='Project 3' index={3}/>
            <MediaCard title='Project 4' index={4}/>
            <Outlet />
        </div>
    )
}

export default Projects