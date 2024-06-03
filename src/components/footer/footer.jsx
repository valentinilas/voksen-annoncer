
export default function Footer (){
    const year = new Date().getFullYear();
    return (
       <footer className="container mx-auto p-5 mt-10 ">
        <p className="text-center">Copyright &copy; {year} Voksen Annoncer. All rights reserved.</p>
       </footer>
    );
}