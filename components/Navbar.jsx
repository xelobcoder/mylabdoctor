import Link from 'next/link';
export default function Navbar() {
  const linksItems = [
    { title: "request test", link: "/request"},
    { title: "waiting list", link: "/waitinglist" },
    { title: "orders", link: "/orders" },
    { title: "sales", link: "/sales" },
    { title: "dashboard", link: "/dashboard" },
    { title: "report complaint", link: "complaint" },
    { title: "logout", link: "/logout" },
  ]
  return (
    <div className="">
      <div className="d-flex justify-content-center">
        <h6 className="text-capitalize text-white mt-2">prime laboratory system</h6>
      </div>
      <ul className="m-0 p-0">
        {linksItems.map((item, index) => (
          <Link className="mx-3 p-2 text-capitalize d-flex " href={item.link} key={index}>
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  )
}

