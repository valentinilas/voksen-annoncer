
export default function Footer (){
    const year = new Date().getFullYear();
    return (
       <footer className="container mx-auto bg-white p-5 mt-10 rounded-lg shadow-sm">
        <p className="text-center">Copyright &copy; {year} Voksen Annoncer. All rights reserved.</p>
       </footer>
    );
}