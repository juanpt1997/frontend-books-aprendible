import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

// ? Se ejecuta del lado del servidor en cada petición
export async function getServerSideProps({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)

    const data = await res.json()

    return {
        props: {
            book: data
        }
    }
}

const BookEdit = ({ book }) => {
    const router = useRouter();

    const [bookTitle, setBookTitle] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle,
                _method: 'PATCH'
            })
        })

        if (res.ok) {
            // Success
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }

        // Failure
        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false);
    }

    // ? Debo retornar un solo elemento, en el caso de no querer encerrarlo en un div podemos utilizar <> de react
    return (
        <>
            <h1>Book Edit</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setBookTitle(e.target.value)}
                    type="text"
                    data-cy="input-book-title"
                    value={bookTitle}
                    disabled={submitting} />
                <button 
                    data-cy="button-submit-book"
                    disabled={submitting}>
                        {submitting ? 'Enviando...' : 'Enviar'}
                </button>
                {errors.title && (
                    <span style={{ color: 'red', display: 'block' }}>{errors.title}</span>
                )}
            </form>
            <br />
            <Link href="/libros">Book List</Link>
        </>
    )

    // ? Cuando el input text reciba un cambio queremos llamar a la función setBookTitle para setear el valor de la variable bookTitle y cuando le demos enviar capturemos el valor
    // ? Esto maneja two way data binding
    // ? por lo tanto agregamos un value con el book name para que se actualice también en el otro sentido
}
export default BookEdit