import { useState } from "react";
import { Button } from "../Buttons/Button";
import './Menus.css';
export const DropdownMenu: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="menu-dropdown">
      <Button title={title} variant="outline" onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="menu-content">
          {items.map(item => (
            <div key={item} className="menu-item" onClick={() => setIsOpen(false)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
