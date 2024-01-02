import UserProvider from "@/app/components/Context/ContextProvider"
import  "./pages.css";

 function MyApp({ Component, pageProps }) {
    return(
        <>
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
        </>
    )
}
export default MyApp;