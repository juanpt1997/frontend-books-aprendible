import Link from "next/link"
const BookCreate = () => {
    // ? Debo retornar un solo elemento, en el caso de no querer encerrarlo en un div podemos utilizar <> de react
    return (
        <>
            <h1>BookCreate</h1>
            <Link href="/libros">Book List</Link>
        </>
    )
}
export default BookCreate