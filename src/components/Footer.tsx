import Link from "next/link";
import RevealWrapper from "./RevealWrapper";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-node-gray/20 text-node-dark pt-20 pb-10 px-8 md:px-24">
      <RevealWrapper className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
        
        {/* Brand / Left */}
        <div className="flex flex-col gap-6 md:w-1/3">
          <Link href="/" className="font-serif text-4xl font-bold tracking-tighter text-node-purple">
            Node.
          </Link>
          <p className="font-sans text-sm text-node-gray leading-relaxed">
            Coffee • Juices • Healthy Meals<br />
            Your coffee. Your node.
          </p>
        </div>

        {/* Links / Center */}
        <div className="flex flex-col gap-4 md:w-1/3 font-sans text-sm tracking-widest uppercase font-bold text-node-gray">
          <Link href="/menu" className="hover:text-node-purple transition-colors w-fit">
            Menu
          </Link>
          <a 
            href="https://www.instagram.com/thenodecafe/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-node-purple transition-colors w-fit flex items-center gap-2"
          >
            Instagram 
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        </div>

        {/* Location / Right */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-node-purple">
            Visit Us
          </h3>
          <p className="font-sans text-sm text-node-gray leading-relaxed">
            Plot D-9 first floor Block A<br />
            North Nazimabad<br />
            Inside Fitcore Gym
          </p>
          <p className="font-sans text-sm text-node-gray leading-relaxed mt-2">
            Mon - Sun: 8:00 AM - 12:00 AM
          </p>
        </div>
      </RevealWrapper>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-node-gray/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-node-gray/60 font-sans uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} Node Cafe. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
