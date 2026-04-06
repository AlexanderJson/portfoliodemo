import './Inputs.css';


export const InputField: React.FC<{
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, type = 'text', placeholder, value, onChange }) => (
  <div className="form-group">
    <label className="label">{label}</label>
    <input 
      className="input" 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);