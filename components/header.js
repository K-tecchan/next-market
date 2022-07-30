import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div>
        <Link href='/'>
          <a><img src="/header.svg" alt="header-img" /></a>
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link href='/user/register'><a>register</a></Link></li>
          <li><Link href='/user/login'><a>login</a></Link></li>
          <li><Link href='/item/create'><a>create</a></Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header