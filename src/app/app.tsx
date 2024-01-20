import Logos from "components/atoms/logos";
import Auth from "components/organisms/card/auth";

function App() {
  return (
    <main>
      <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <h3 className="text-2xl sm:text-4xl leading-none font-bold tracking-tight text-purple-200">
          <span className="text-[gold] opacity-75"> React application using</span> @ ASP.NET MVC5
        </h3>
        <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400 mt-5">
          Admin System POC
        </h1>
        
        <div className="absolute top-12 right-12 opacity-10 lg:opacity-50">
          <Logos.Vite className="w-56 h-56" />
        </div>
      </header>
      
      <Auth />
      
      <footer className=" max-w-screen-lg xl:max-w-screen-xl mx-auto text-center sm:text-right text-gray-400 font-bold">
        <a href="https://github.com/jvidalv">
          SUJAY KANOLKAR @ {new Date().getFullYear()}
        </a>
      </footer>
    </main>
  );
}

export default App;
