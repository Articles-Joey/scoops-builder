import { Raleway, EB_Garamond } from "next/font/google";

// import SiteFooter from "@/components/SiteFooter";
// import SiteHeader from "@/components/SiteHeader";

import "bootstrap/dist/css/bootstrap.css";
import "styles/index.scss"

const raleway = Raleway({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-raleway" });
const ebGaramond = EB_Garamond({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-ebgaramond" });

export default async function SiteLayout({ children }) {

    return (
        <html>

            <head>

                <link
                    rel="stylesheet"
                    href={`https://cdn.articles.media/fonts/fontawsome/css/all.min.css`}
                />

            </head>

            <body 
                className={`${raleway.variable} ${ebGaramond.variable}`}
            >

                {/* <SiteHeader /> */}

                <main>
                    {children}
                </main>

                {/* <SiteFooter /> */}

            </body>

        </html>
    )

}