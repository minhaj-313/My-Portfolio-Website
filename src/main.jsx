import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {DataProvider} from "/src/providers/DataProvider"
import {LanguageProvider} from "/src/providers/LanguageProvider"
import {ThemeProvider} from "/src/providers/ThemeProvider"
import {LayoutProvider} from "/src/providers/LayoutProvider"
import {GlobalStateProvider} from "/src/providers/GlobalStateProvider"
import App from "/src/components/App.jsx"
import Preloader from "/src/components/Preloader.jsx"

const AppProviders = ({ children }) => (
    <DataProvider>
        <LanguageProvider>
            <LayoutProvider>
                <ThemeProvider>
                    <GlobalStateProvider>
                        {children}
                    </GlobalStateProvider>
                </ThemeProvider>
            </LayoutProvider>
        </LanguageProvider>
    </DataProvider>
)

let container = null

document.addEventListener('DOMContentLoaded', function(event) {
    if(container)
        return

    container = document.getElementById('root')
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Preloader>
                <AppProviders>
                    <App/>
                </AppProviders>
            </Preloader>
        </StrictMode>
    )
})
