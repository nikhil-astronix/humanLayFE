interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <div className={`flex items-center gap-2 ${className || ''}`}>
    <div className="w-7 h-7">
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 224L448 352L256 480L64 352L256 224Z" fill="rgb(234, 88, 12)" stroke="white" strokeWidth="16"/>
        <path d="M256 128L448 256L256 384L64 256L256 128Z" fill="rgb(234, 88, 12)" stroke="white" strokeWidth="16"/>
        <path d="M256 32L448 160L256 288L64 160L256 32Z" fill="rgb(234, 88, 12)" stroke="white" strokeWidth="16"/>
      </svg>
    </div>
    <span className="font-bold text-xl text-gray-900">Human</span>
  </div>
);

export default Logo; 