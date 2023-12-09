import Link from 'next/link';
const Navbar = () => {
  const linksItems = [
    { title: 'request test', link: "/request" },
    { title: "waiting list", link: "/waitinglist" },
    { title: 'result', link: "/result" },
    { title: 'sales', link: '/sales' },
    { title: 'dashboard', link: '/dashboard' },
    {title:'report complaint',link: 'complaint'},
    { title: 'logout', link: '/logout' }
  ]
  return (
    <div className='navigation-wrapper'>
      <div className='app-name'>
        prime laboratory system
      </div>
      <ul className='sidebar'>
        {linksItems.map((item, index) => (  
           <Link href={item.link} key={index}>
           {item.title}
       </Link>
        ))}
     </ul>
    </div>
  );
}

export default Navbar;
