
import {useState, useEffect, useRef, useLayoutEffect} from 'react'

function UseRef() {
    const [count, setCount] = useState(3)
    const timer = useRef()
    const h1Ref = useRef()
    
    // TH: sử dụng use ref và useEffect để lấy được giá trị trước khi set state
    const prevCount = useRef()
    useEffect (() => {
        prevCount.current = count
        console.log('trong func useEffect',count, prevCount.current)
    }, [count])

    // sử dụng useLayoutEffect khi count < 0 => set count lại về 3
    useLayoutEffect (()=> {
        if(count < 0 ) 
            setCount(3)
    }, [count])

    useEffect (()=> {
        console.log('clean ne')
        return () => clearTimeout(timer.current)
    },[])

    const handleStart = () => {
        timer.current = setInterval(() => {
            setCount(prev => prev - 1)
        },1000)
    }

    const handleStop = () => {
        clearTimeout(timer.current)
    }

    console.log('trong func component',count, prevCount.current)
    console.log(h1Ref)

    return (
        <div>
            <h1 ref = {h1Ref}>{count}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick = {handleStop}>Stop</button>
        </div>
    )
}

export default UseRef