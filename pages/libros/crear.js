import Link from "next/link"
import { useState } from "react"
const BookCreate = () => {

    // const state = useState()
    // ? const [bookName, setBookName] = useState('Test libro 1')
    const [bookName, setBookName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        console.log(bookName);
        
        // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)

    }

    // ? Debo retornar un solo elemento, en el caso de no querer encerrarlo en un div podemos utilizar <> de react
    return (
        <>
            <h1>BookCreate</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setBookName(e.target.value)} 
                        type="text"
                        value={bookName}/>
                <button>Enviar</button>
            </form>
            <br/>
            <Link href="/libros">Book List</Link>
        </>
    )

    // ? Cuando el input text reciba un cambio queremos llamar a la función setBookName para setear el valor de la variable bookName y cuando le demos enviar capturemos el valor
    // ? Esto maneja two way data binding
    // ? por lo tanto agregamos un value con el book name para que se actualice también en el otro sentido
}
export default BookCreate