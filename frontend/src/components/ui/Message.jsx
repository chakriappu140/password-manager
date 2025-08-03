const Message = ({text, type="info"}) => {
    const base = "p-2 rounded text-sm"
    const colors = {
        error: "bg-red-100 text-red-700",
        success: "bg-green-100 text-green-700",
        info: "bg-blue-100 text-blue-700"
    }

    return <div className={`${base} ${colors[type]}`} >{text}</div>
}

export default Message;