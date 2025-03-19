import siteName from "constants/siteName"
import PageContent from "./PageContent"

export const metadata = {
    title: `${siteName}`,
}

export default async function Page() {

    return (
        <PageContent />
    )

}