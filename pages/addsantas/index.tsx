import React, { useState } from "react";
import { Button } from "../../components/Button";
export default function AddSantas() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (title && content) {
            try {
                let response = await fetch('http://localhost:3000/api/addSanta', {
                    method: 'POST',
                    body: JSON.stringify({
                        title, content
                    }),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setTitle('');
                setContent('');
                setError('');
                setMessage('Santa agregado con exito a la db');
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError('All fields are required')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            {
                error ? (
                    <div className="alert-error">
                        {error}
                    </div>
                ) : null
            }
            {
                message ? (
                    <div className="alert-message">
                        {message}
                    </div>
                ) : null
            }
           <div>
                <label htmlFor="first-name" className="lead">
                    Nombre
                </label>
                <input
                    type="text"
                    placeholder="Nombre del Santa"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    className="mt-1 py-2 block w-full px-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />

            </div>
            <div>
                <label htmlFor="comment" className="lead">
                    Contenido
                </label>
                <div className="mt-1">
                    <textarea
                        name="content"
                        placeholder="Contenido"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="block px-2 py-2 w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        cols={20}
                        rows={8}
                    />
                </div>
            </div>
            <div className="form-group">
                <Button type="submit" className="mt-2">Agregar Santa</Button>
            </div>
        </form>

    )
}