function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        {children}
      </table>
    </div>
  );
}

export default Table;