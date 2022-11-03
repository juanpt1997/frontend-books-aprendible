import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
const BookCreate = () => {
    const router = useRouter();

    // const state = useState()
    // ? const [bookTitle, setBookTitle] = useState('Test libro 1')
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        // ? console.log(bookTitle);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })

        if (res.ok){
            // Success
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }
        
        // Failure
        const data = await res.json()
        setErrors(data.errors)

    }

    // ? Debo retornar un solo elemento, en el caso de no querer encerrarlo en un div podemos utilizar <> de react
    return (
        <>
            <h1>BookCreate</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setBookTitle(e.target.value)} 
                        type="text"
                        value={bookTitle}/>
                <button>Enviar</button>
                { errors.title && (
                    <span style={{color: 'red', display: 'block'}}>{errors.title}</span>
                ) }
            </form>
            <br/>
            <Link href="/libros">Book List</Link>
        </>
    )

    // ? Cuando el input text reciba un cambio queremos llamar a la función setBookTitle para setear el valor de la variable bookTitle y cuando le demos enviar capturemos el valor
    // ? Esto maneja two way data binding
    // ? por lo tanto agregamos un value con el book name para que se actualice también en el otro sentido
}
export default BookCreate