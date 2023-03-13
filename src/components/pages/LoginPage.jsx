// Importe les hooks "useState" et le composant "Link" de React Router DOM
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext.jsx";


// Définit le composant "LoginPage"
export default function LoginPage() {
    // Définit les états locaux "email" et "password" avec des valeurs initiales vides
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    // Retourne le formulaire de connexion
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Connexion</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>

                    <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="primary">Se connecter</button>

                    <div className="text-center py-2 text-gray-500">
                        Vous n'avez pas encore de compte ? <Link className="underline text-black" to={'/register'}>S'inscrire maintenant</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}