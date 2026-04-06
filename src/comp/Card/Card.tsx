import "./Cards.css";

export const Card: React.FC<{
  title: string;
  description?: string;
  imageUrl?: string;
  footerActions?: React.ReactNode;
}> = ({ title, description, imageUrl, footerActions }) => (
  <div className="card">
    {imageUrl && <div className="card-img" style={{background: `url(${imageUrl}) center/cover`}} />}
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{description}</p>
      {footerActions && <div className="card-actions">{footerActions}</div>}
    </div>
  </div>
);