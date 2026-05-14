import { Motorbike } from 'lucide-react';

const Header = () => {
  return (
    <div className="py-4 flex items-center justify-center gap-5 border border-b-border-secondary h-[12vh]">
      <Motorbike size={32} className="text-accent animate-pulse" />
      <p className="text-3xl text-center flex justify-center font-mono">
        Delivery Pager.
      </p>
    </div>
  );
};

export default Header;
