import type { Customer } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    customers: Customer[];
    onDelete: (url: string) => void;
}

export default function CustomerTable({ customers, onDelete }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {customers.map(c => (
                    <tr key={c._links.self.href}>
                        <td>{c.firstname} {c.lastname}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>
                            <Link to={`/customers/${c.id}`}>Details</Link>
                            <button onClick={() => onDelete(c._links.self.href)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
