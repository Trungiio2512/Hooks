// lưu ý 
// - Component chỉ được re-render sau khi set state
// - Initial state  chỉ sử dụng cho lần đầu
// - set state với call back
// - Initial state với call back =>
 //                      thực hiện call back => 
 //                     nhận cái call back return về làm Innital state mà không thực hiện lại mỗi khi re-render
// -set state là thay thế state bàng giá trị mới
 
import { useState } from 'react'


function UseStateComponent() {
    const [info, setInfo] = useState( () => {
        return {
            name: 'Nguyễn Văn A',
            age: 18,
            address: 'Hai Phòng VN'
        }
    })
    const [count, setCount] = useState(() => {return 10})

    const handleIncrease = (info) => {
        console.log(info)
        setInfo ( (prev) => {
            return {
                ...prev,
                 desc: 'Tôi chưa có người yêu'
            }
            
        })
    }

    return (
        <div style = {{padding : 50}}>
            <h1>{count}</h1>
            <button onClick={() => setCount(prev => {
                return prev + 1})}>Tang</button>
            <h4>{JSON.stringify(info)}</h4>
            <button onClick = { () => handleIncrease(info) }>Increment</button>
        </div>
    )
}

export default UseStateComponent