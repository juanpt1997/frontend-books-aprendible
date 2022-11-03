import Link from "next/link"

export async function getStaticProps({ params }/* context */) {
    // const res = await fetch(`http://books-aprendible.test/api/books/${context.params.bid}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)

    const data = await res.json()

    return {
        props: {
            book: data
        }
    }
}

// ? Debemos exportar esta función visitando todos los libros porque queremos que next js sepa donde encontrar todos los identificadores de los libros para poder generar las páginas estáticas
export async function getStaticPaths() {
    // const res = await fetch('http://books-aprendible.test/api/books')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)

    const data = await res.json()

    return {
        // ? Así se vería
        // paths: [{params:{bid: 1}}, {params:{bid: 2}}, {params:{bid: 3}}]
        paths: data.map(book => {
            return { params: { bid: String(book.id) } }
        }),
        fallback: false
    }
}
const BookDetail = ({ book }) => {
    return (
        <>
            <h1>{book.title}</h1>
            <Link href="/libros">Book List</Link>
        </>
    )
}
export default BookDetail