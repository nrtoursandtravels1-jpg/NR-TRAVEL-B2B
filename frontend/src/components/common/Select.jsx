function Select({ label, options = [], value, onChange }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;