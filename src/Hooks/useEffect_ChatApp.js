// fake chat app
// 1.web socket
// 2. dựa trên cơ chế subcribe / unsubscribe

import { useState, useEffect  } from "react";

const courses = [
    {
        id: 1,
        name: 'SPA - MPA'
    },
    {
        id: 2,
        name: 'closure'
    },
    {
        id: 3,
        name: 'module'
    }
]

function ChatApp (lessons) {
    const [lesson, setLesson] = useState(1)

    useEffect (()=> {
        const handleLesson = ({detail}) => {
            console.log(detail)
        }
        window.addEventListener(`lesson-${lesson}`,handleLesson)

        console.log(2)
        return () => {
            console.log(3)
            return window.removeEventListener(`lesson-${lesson}`,handleLesson)}
    },[lesson]) 

    return (
        <div>
            <ul>
                {console.log(1)}
                {courses.map(
                    (course) => 
                        <li 
                            key={course.id}
                            style = {{
                                color: course.id === lesson ? 'red' : '#333'
                            }}
                            onClick = {() => setLesson(course.id)}
                        >
                            {course.name}
                        </li>
                )}
            </ul>
        </div>
    )
}

export default ChatApp;