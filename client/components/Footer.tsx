export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black">
      <div className="container mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p className="text-white/60">© {new Date().getFullYear()} STUD. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/#problem" className="text-red-400/80 hover:text-red-300 transition-colors">
            Problem
          </a>
          <a href="/#solution" className="text-blue-400/80 hover:text-blue-300 transition-colors">
            Process
          </a>
          <a href="/#features" className="text-green-400/80 hover:text-green-300 transition-colors">
            Features
          </a>
          <a href="/#vision" className="text-violet-400/80 hover:text-violet-300 transition-colors">
            Vision
          </a>
        </div>
      </div>
    </footer>
  );
}
