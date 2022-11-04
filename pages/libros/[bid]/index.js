import Link from "next/link"

// ? Con revalidate vamos a tener que cada 10 segundos entre una petición y otra se ejecute la función para generar los libros desde la base de datos
// ? Si queremos que sea inmediato podemos utilizar getServerSideProps()
export async function getStaticProps({ params }/* context */) {
    // const res = await fetch(`http://books-aprendible.test/api/books/${context.params.bid}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)

    const data = await res.json()

    return {
        props: {
            book: data
        },
        revalidate: 10
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
        // fallback: false
        fallback: 'blocking' // ? De esta manera se generan los paths al momento del build, pero si la página no existe se hace un server side rendering a demanda (Se renderiza del lado del servidor cuando hagamos una petición)
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