
import { ReactNode } from 'react'
import Menu from './Menu'
interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <div>

            <Menu />
            {children}
            <footer>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita at assumenda nam dolorum dignissimos voluptas.
            </footer>
        </div>
    )
}

export default Layout