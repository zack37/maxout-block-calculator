import React from "react"
import App from "./src/App"

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
