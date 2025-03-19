import siteName from "constants/siteName"
import Link from "next/link"

export const metadata = {
    title: `404 | ${siteName}`,
}

export default async function NotFound() {

    return (
        <div className='page page-not-found text-white text-center py-5'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">
                <button className='btn btn-primary btn-custom'>
                    Return Home
                </button>
            </Link>
        </div>
    )

}