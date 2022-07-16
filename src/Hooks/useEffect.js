
// 1. Update DOM
// 2. Obsever patten 
// 3. Call API 
// 4. closure
// 5. Listen DOM evevnt
// - scroll
// - resize
// 6. clean up 
// - remove listeners / unSubscriber

//TH
// 1. callback
// - call back  được gọi mỗi khi component được re- render
// - gọi call back sau khi component thêm vào DOm 
// 2. callback, []
// - chỉ goi callback 1 lần sau khi component được mouted
// 3. callback, [deps]
// - call back được gọi mỗi khi deps thay đổi

// call back luôn được gọi mỗi khi component được mounted
// clean up function luôn được gọi trước khi component unmounted
// clean up function luôn được gọi trước khi callback được goi - trừ trường hợp đầu tiên

import {useState, useEffect} from 'react'

import ChatApp from './useEffect_ChatApp.js'

const btns= ['posts', 'comments', 'albums']

export default function UseEffectComponent () {
    const [title, setTitle] = useState('')
    const [users , setUsers] = useState([])
    const [type, setType] = useState(btns[0])
    const [showBtnToTop, setShowBtnToTop] = useState(false)
    const [size, setSize] = useState(window.innerWidth)
    const [avata, setAvata] = useState()
    const [countdown, setCountdown] = useState(180)

    // callAPI
    useEffect (
        () => {
          fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then((response) => response.json())
            .then((response) => setUsers(response))
        },
        [type]
    )

    // listener DOM : scroll, resize - closure
    useEffect (() => {

        const handleToTop = () => {
            setShowBtnToTop(window.scrollY > 200)
        }
        
        window.addEventListener('scroll', handleToTop)

        return () => {
            window.removeEventListener('scroll', handleToTop)
        }

    },[])

    useEffect(()=> {
        const handleResize = () => {
            setSize(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    //previews avata for cleanup function
    useEffect(()=> {
        return () => {
            avata && URL.revokeObjectURL(avata.link)
        }
    }, [avata])

    const handlePreviewAvata = (e) => {
        const file = e.target.files[0]

        file.link = URL.createObjectURL(file)

        setAvata(file)
    }

    // timer function - closure
    // useEffect(() => {
    //    const timerID= setInterval(() => {
    //         setCountdown(prec => {
    //             return prec - 1
    //         })
    //     },1000)

    //     return () => {clearInterval(timerID)}
    // },[])

    return (
        <div>
            <ChatApp/>
            {btns.map((btn, index) => 
                <button 
                    key={index} 
                    style = {type === btn ? {
                        color: '#red',
                        backgroundColor: '#eaaeae'
                    } : {}}
                    onClick={  () => setType(btn)}
                >
                    {btn}
                </button>
            )}
            <input 
                value = {title}
                onChange={
                    e => setTitle(e.target.value)    
                }
            />
            <input
                type= 'file'
                onChange={(event) => handlePreviewAvata(event)}
            >
            </input>
            <h1>Count Dount</h1>
            <h2>{countdown}</h2>
            {avata && <img src={avata.link} alt='' width="50%" />}
            <h1>PageSize</h1>
            <h1>{size}</h1>
            <ul>
                {users.map((user, index) => (
                    <li key = {index}>{user.title || user.id }</li>
                ))}
            </ul>
            {
                showBtnToTop && 
                <button
                    style ={{
                        position: 'fixed',
                        right: 20,
                        bottom: 50
                    }}
                >
                    Go to Top
                </button>
            }
        </div>
    )
}   