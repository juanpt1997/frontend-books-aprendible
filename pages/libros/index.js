import Link from "next/link"

// ? Con revalidate vamos a tener que cada 10 segundos entre una petición y otra se ejecute la función para generar los libros desde la base de datos
// ? Si queremos que sea inmediato podemos utilizar getServerSideProps()
export async function getStaticProps() {
    // const res = await fetch('http://books-aprendible.test/api/books')
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    // console.log(res);
    const data = await res.json()
    // console.log(data);
    return {
        props: {
            books: data
        },
        revalidate: 10
    }
}

const BookList = ({ books }) => {
    async function handleDelete(e, bookId) {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })

        if (res.ok) {
            // Success
            window.location.href = '/libros'
        }
    }
    return (
        <div>
            <h1>Libros</h1>
            <ul data-cy="book-list">
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link 
                            href={`/libros/${book.id}`}
                            data-cy={`link-to-visit-book-${book.id}`}
                        >{book.title}
                        </Link>
                        {' - '}
                        <Link 
                            data-cy={`link-to-edit-book-${book.id}`}
                            href={`/libros/${book.id}/editar`}>Editar
                        </Link>
                        {' - '}
                        <form onSubmit={(e) => handleDelete(e, book.id)} style={{ display: 'inline' }}>
                            <button data-cy={`link-to-delete-book-${book.id}`}>
                                Eliminar
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/libros/crear">Create Book</Link>
        </div>
    )
}
export default BookList