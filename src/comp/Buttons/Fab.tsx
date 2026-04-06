import { Icons } from "../Icons/Icons";

export const FAB: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button className="fab" onClick={onClick}>
    <Icons.Plus />
  </button>
);