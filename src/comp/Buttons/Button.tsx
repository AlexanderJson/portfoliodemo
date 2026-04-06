import './Buttons.css';
export const Button: React.FC<{
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isActive?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}> = ({ title, variant = 'primary', isActive, onClick, icon }) => (
  <button 
    className={`btn btn-${variant} ${isActive ? 'active' : ''}`} 
    onClick={onClick}
  >
    {icon}
    {title}
  </button>
);