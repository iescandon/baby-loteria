import Link from "next/link";

export default function Nav() {
  return (
    <>
    <nav className="h-32 md:h-40 flex justify-center py-4">
      <Link className="h-full" href="/">
        <img
          className="h-full drop-shadow-2xl"
          src="/images/logo-icon.png"
          alt="don clemente loteria logo"
        />
      </Link>
    </nav>
    </>
  );
}
