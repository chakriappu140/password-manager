import { useState } from "react";
import { savePassword } from "../utils/api";

const PasswordForm = ({onSave}) => {
    const [form, setForm] = useState({site: "", username: "", password: ""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        await savePassword(form)
        onSave()
        setForm({site: "", username: "", password: ""})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded">
            <input type="text" placeholder="Site" className="input" value={form.site} onChange={(e) => setForm({...form, site: e.target.value})} />
            <input type="text" placeholder="Username" className="input" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
            <input type="text" placeholder="Password" className="input" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            <button type="submit" className = "btn" >Save</button>
        </form>
    )
}
export default PasswordForm;