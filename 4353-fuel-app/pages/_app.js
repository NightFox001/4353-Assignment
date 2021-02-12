import { useEffect } from "react"
import "../styles/styles.css"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <div style={{ width: '100%', paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ width: "calc(100% - 40px)", maxWidth: 1020, margin: 'auto' }}>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default MyApp
