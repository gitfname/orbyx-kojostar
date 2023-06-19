
import WithoutMenu from "./WithoutMenu"
import WithMenu from "./WithMenu"

interface menuItem {
    text: string,
    href: string
}

interface DesktopNavLinkProps {
    text: string,
    href: string,
    items?: Array<menuItem>
}

function DesktopNavLink({ text, href, items=[] }: DesktopNavLinkProps) {

    if(items.length > 0) return <WithMenu text={text} items={items} />
    return <WithoutMenu text={text} href={href} />
}

export default DesktopNavLink