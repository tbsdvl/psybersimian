import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    const scrollToWindowTop = (): void => {
        window.scrollTo(0,0);
    }

    const navigateToHome = (e: any): void => {
        if (e.target instanceof Element && e.target.localName === 'h1') {
            scrollToWindowTop();
            navigate("/");
        }
    }

    return (
        <h1 onClick={(e) => navigateToHome(e)} className="libre-barcode-39-text-regular text-blush-red text-5xl text-center fixed w-screen bg-midnight-black z-50 lg:text-7xl hover:cursor-pointer">Psybersimian</h1>
    );
}