
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
        </div>
    )
}

export default Layout