import Link from "next/link"

export async function getStaticProps() {
    const res = await fetch('http://books-aprendible.test/api/books')
    // console.log(res);
    const data = await res.json()
    // console.log(data);
    return {
        props: {
            books: data
        }
    }
}

const BookList = ({ books }) => {
    return (
        <div>
            <h1>Libros</h1>
            <ul>
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link href={`/libros/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear">Create Book</Link>
        </div>
    )
}
export default BookList