function Badge({ text, color = "blue" }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm bg-${color}-100 text-${color}-700`}
    >
      {text}
    </span>
  );
}

export default Badge;