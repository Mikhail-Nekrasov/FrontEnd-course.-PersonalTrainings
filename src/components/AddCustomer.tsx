import { useState } from 'react';
import { addCustomer } from '../api';

interface Props {
    onAdded: () => void;
}

export default function AddCustomer({ onAdded }: Props) {
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '' });

    function handleSubmit() {
        addCustomer(customer).then(() => onAdded()).catch(err => alert(err));
    }

    return (
        <div>
            <input placeholder="First name" onChange={e => setCustomer({ ...customer, firstname: e.target.value })} />
            <input placeholder="Last name" onChange={e => setCustomer({ ...customer, lastname: e.target.value })} />
            <input placeholder="Email" onChange={e => setCustomer({ ...customer, email: e.target.value })} />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
}