import Link from "next/link"
import { useState } from "react"
const BookCreate = () => {

    // const state = useState()
    // ? const [bookTitle, setBookTitle] = useState('Test libro 1')
    const [bookTitle, setBookTitle] = useState('')

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
        }else{
            // Failure
        }

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