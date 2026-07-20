import Link from 'next/link';


const Navbar = () => {
    return (
        <nav className="flex flex-row justify-around  border-b m-4 p-4 md:text-lg">
            <div>
            <Link href="/">
            My Ecommerce
            </Link>
            </div>
            <div className="space-x-8">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/checkout">Checkout</Link>
                
            </div>
            <div></div>
        </nav>
    );
};

export default Navbar;
